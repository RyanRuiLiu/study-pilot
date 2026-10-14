/*
 * 看板页入口（外壳）。
 *
 * 外壳只做三件事：列出有哪几个平台、给每个平台一个分区容器与标题、
 * 把它报回来的"上次读取"写在标题旁。**不认识任何平台字段**——筛选、清单、
 * 明细、按钮都在各自的平台分区里（见 src/platforms/mooc/views.ts）。
 *
 * 打开本页不向平台发请求；唯一会发请求的是分区里那个「读取最新明细」按钮。
 */

import '../../src/ui/tokens.css';
import '../../src/ui/theme.css';
import '../../src/ui/components.css';
import './style.css';

import { formatDateTime } from '../../src/features/format';
import { moocViews } from '../../src/platforms/mooc/views.ts';
import type { PlatformViews } from '../../src/platforms/types.ts';
import { button } from '../../src/ui';
import { required } from '../../src/ui/dom';

const platformsEl = required<HTMLElement>('#platforms');

/*
 * 有哪几个平台：**装配层的事实**，写在这里。
 *
 * 平台之间互不依赖，因此这一行新增一个平台不需要改调度，也不需要改别的平台——
 * 只要它实现了 PlatformViews。
 */
const views: PlatformViews[] = [moocViews];

/** 画一个平台的分区。每次重画都重新问平台要一次它自己的数据。 */
async function paint(view: PlatformViews, body: HTMLElement, fetched: HTMLElement): Promise<void> {
  body.replaceChildren();
  try {
    const at = await view.render(body);
    fetched.textContent = at > 0 ? `上次读取：${formatDateTime(at)}` : '还没有读取过数据';
  } catch (error) {
    fetched.textContent = `读取失败：${error instanceof Error ? error.message : String(error)}`;
  }
}

for (const view of views) {
  const section = document.createElement('section');
  section.className = 'sp-platform';
  section.dataset.platform = view.id;

  const name = document.createElement('h2');
  name.className = 'sp-platform-name';
  name.textContent = view.name;

  const fetched = document.createElement('span');
  fetched.className = 'fetched';

  const head = document.createElement('div');
  head.className = 'sp-platform-head';
  head.append(
    name,
    button({
      label: '重读快照',
      outline: true,
      size: 'small',
      title: '只读本地快照，不向平台发请求',
      onClick: () => {
        void paint(view, body, fetched);
      },
    }),
    fetched,
  );

  const body = document.createElement('div');
  body.className = 'sp-platform-body';

  section.append(head, body);
  platformsEl.append(section);
  void paint(view, body, fetched);
}
