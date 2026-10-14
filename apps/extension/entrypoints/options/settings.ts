/*
 * 设置页：并列的分区。
 *
 * 每个分区就是官方的一个 sl-details（可收起的块），标题取自分区自己身上
 * （sectionTitle），不另写一份清单——手写的话，改了标题而忘了改导航，两边就会对不上。
 *
 * 先前这里在「概览/运行/设置/关于」之下又套了一层 sl-tab-group：同一页两排标签，
 * 视觉上分不清层级，也偏离了组件的本意。分区比标签更贴切——它们可以并列、可收起，
 * 用户也能一眼看到有哪几块。
 */

import '@shoelace-style/shoelace/dist/components/details/details.js';

import { getSettings, resetSettings } from '../../src/settings';
import { setCurrent, setRender, setToast } from '../../src/settings/page-state.ts';
import { moocSettings } from '../../src/platforms/mooc/settings.ts';
import { button } from '../../src/ui';
import type { SettingsSection } from '../../src/platforms/types.ts';
import { aiSection } from './sections/ai.ts';
import { scheduleSection } from './sections/schedule.ts';

export interface SettingsView {
  host: HTMLElement;
  render: () => void;
}

/** 分区顺序的规则：各平台自己的分区在前，外壳的通用分区在后。 */
function sections(): SettingsSection[] {
  return [...moocSettings.render(), scheduleSection(), aiSection()];
}

export function mountSettings(toast: (text: string) => void): SettingsView {
  const host = document.createElement('div');

  const reset = button({
    label: '恢复默认设置',
    outline: true,
    size: 'medium',
    title: '所有开关回到默认，课程列表与勾选一并清空',
    onClick: () => {
      if (!window.confirm('确定恢复默认设置？所有开关回到默认，课程列表与勾选一并清空。')) return;
      void resetSettings().then((next) => {
        setCurrent(next);
        render();
        toast('已恢复默认设置');
      });
    },
  });
  const version = document.createElement('p');
  version.textContent = `v${browser.runtime.getManifest().version}`;

  function render(): void {
    host.replaceChildren();

    for (const section of sections()) {
      const details = document.createElement('sl-details');
      details.id = section.id;
      details.setAttribute('summary', section.title);
      // 默认展开：设置项是来读的，不是要用户先去点开才知道里面有什么
      details.setAttribute('open', '');

      const body = document.createElement('div');
      body.className = 'sp-stack';

      /* 分区说明不属于任何控件，因此作为正文第一段；没有就不写空段落。 */
      if (section.description !== '') {
        const lede = document.createElement('p');
        lede.textContent = section.description;
        body.append(lede);
      }

      body.append(...section.controls);
      details.append(body);
      host.append(details);
    }

    host.append(reset, version);
  }

  setToast(toast);
  setRender(render);

  return { host, render };
}

/** 读配置并在读完后重画。设置页一打开要显示的是存储里的真实值。 */
export async function loadSettingsInto(render: () => void): Promise<void> {
  setCurrent(await getSettings());
  render();
}
