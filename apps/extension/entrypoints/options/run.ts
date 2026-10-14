/*
 * 运行页：它在做什么、做过什么。
 *
 * 每个平台一张卡，而不是汇成一条总进度：各平台的执行互不干扰（各自的会话、
 * 各自的节流器），把它们加成一个百分比会说谎——A 跑完、B 才开始时总进度会倒退。
 * 顶部只给一句聚合：几个平台在跑、本轮共几项。
 *
 * 数据全部来自后台推送（见 run-feed.ts）。这一页自己不读存储、也不轮询，
 * 因此「看到的」与「后台正在做的」之间不可能不一致。
 */

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.js';
import '@shoelace-style/shoelace/dist/components/tag/tag.js';

import type { RunState } from '../../src/background/runtime/run-state';
import { button, countLine, dataTable, statusLine } from '../../src/ui';
import { formatDateTime } from '../../src/ui/format';
import { stopPlatformRun } from '../../src/browser/run-feed.ts';

const ITEM_LABEL = { running: '进行中', done: '完成', skipped: '跳过', failed: '失败' } as const;

type PlatformRun = RunState['platforms'][number];

export interface RunView {
  host: HTMLElement;
  apply: (state: RunState) => void;
}

function seconds(from: number, to: number): string {
  const value = Math.max(0, Math.round((to - from) / 1000));
  return value < 60 ? `${value} 秒` : `${Math.floor(value / 60)} 分 ${value % 60} 秒`;
}

export function mountRun(): RunView {
  const host = document.createElement('div');
  host.className = 'sp-stack';

  function apply(state: RunState): void {
    host.replaceChildren();
    const running = state.platforms.filter((platform) => platform.state !== 'idle');

    host.append(
      statusLine(
        running.length === 0
          ? describeIdle(state)
          : `${running.length} 个平台正在执行 · 本轮共 ${running.reduce((sum, run) => sum + run.total, 0)} 项`,
        { tone: running.length === 0 ? 'idle' : 'busy' },
      ),
    );

    if (running.length === 0) host.append(idleNote());

    for (const platform of state.platforms) {
      if (platform.state === 'idle' && platform.items.length === 0) continue;
      host.append(platformCard(platform));
    }

    host.append(historySection(state));
  }

  /** 空闲时顶一句最近结果。没有历史就说没有，不拿旧数据凑。 */
  function describeIdle(state: RunState): string {
    const last = state.history[0];
    return last === undefined
      ? '还没有执行过。用右上角的「立即执行」可以现在就开始。'
      : `空闲。最近一次结束于 ${formatDateTime(last.finishedAt)} · ${last.platformName}`;
  }

  function idleNote(): HTMLElement {
    return countLine(['每一次执行都会记在这里：什么时候做的、结果如何、失败时平台说了什么']);
  }

  function platformCard(platform: PlatformRun): HTMLElement {
    const card = document.createElement('sl-card');

    const head = document.createElement('div');
    head.slot = 'header';
    head.className = 'sp-line';

    const name = document.createElement('h3');
    name.className = 'sp-fill';
    name.textContent = platform.name;
    const tag = document.createElement('sl-tag');
    tag.size = 'small';
    tag.variant = platform.state === 'running' ? 'primary' : platform.state === 'stopping' ? 'warning' : 'neutral';
    tag.textContent =
      platform.state === 'running' ? '正在执行' : platform.state === 'stopping' ? '正在停止' : '空闲';
    head.append(name, tag);

    if (platform.state !== 'idle' && platform.startedAt !== null) {
      const stop = button({
        label: '停止这一平台',
        outline: true,
        size: 'small',
        title: '当前这一项做完后停下；不会在一项做到一半时掐断，那会留下半提交的状态',
        onClick: () => {
          void stopPlatformRun(platform.id);
        },
      });
      head.append(stop);
    }
    card.append(head);

    /*
     * 进度条上的字来自默认插槽，`label` 那个属性只写进 aria-label。
     * 只设 label 的话，看得见的是空条、读屏听到的是「3 / 10」，两边对不上。
     */
    const progress = document.createElement('sl-progress-bar');
    progress.label = `${platform.name} 进度 ${platform.finished} / ${platform.total}`;
    progress.textContent = `${platform.finished} / ${platform.total}`;
    progress.value = platform.total === 0 ? 0 : Math.round((platform.finished / platform.total) * 100);
    card.append(progress);

    const line = document.createElement('p');
    line.textContent =
      platform.current === null
        ? `已完成 ${platform.finished} / ${platform.total}`
        : `当前：${platform.current} · 已完成 ${platform.finished} / ${platform.total}`;
    // 已用时只在执行中的时候显示：结束之后这一段的耗时在下面那张表里有
    if (platform.startedAt !== null && platform.state !== 'idle') {
      line.textContent += ` · 已用 ${seconds(platform.startedAt, Date.now())}`;
    }
    card.append(line);

    card.append(
      dataTable(
        ['时间', '课程', '项目', '结果', '说明'],
        [...platform.items]
          .reverse()
          .map((item) => ({
            cells: [formatDateTime(item.at), item.course, item.title, ITEM_LABEL[item.status], item.detail],
          })),
      ),
    );
    return card;
  }

  function historySection(state: RunState): HTMLElement {
    const card = document.createElement('sl-card');
    const title = document.createElement('h3');
    title.slot = 'header';
    title.textContent = '最近几次';
    card.append(title);

    if (state.history.length === 0) {
      card.append(countLine(['还没有执行记录']));
      return card;
    }

    card.append(
      dataTable(
        ['结束于', '平台', '完成', '跳过', '失败', '说明'],
        state.history.map((round) => ({
          cells: [
            formatDateTime(round.finishedAt),
            round.platformName,
            String(round.done),
            String(round.skipped),
            String(round.failed),
            `${round.stopped ? '已停止 · ' : ''}${round.note}`,
          ],
        })),
      ),
    );
    return card;
  }

  return { host, apply };
}
