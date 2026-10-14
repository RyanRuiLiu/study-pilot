/*
 * 设置页：二级标签 + 表单。
 *
 * 布局照 chrome://settings 与 VS Code Settings 那一类：一级在顶（本文件的宿主），
 * 二级在左或上一排，一次只显示一类。原来是「一条长页 + 左侧锚点导航」，
 * 要滚、要跟随高亮、还要在异步内容把文档撑高时反复重新定位（那套 ResizeObserver
 * 与滚动监听已经整块删掉）——分成标签之后这些都不需要了。
 *
 * 标签从分区自己身上读标题（sectionTitle），不另写一份清单：
 * 手写的话，改了分区标题而忘了改导航，两边就会对不上。
 */

import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js';
import '@shoelace-style/shoelace/dist/components/tab/tab.js';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';

import { getSettings, resetSettings } from '../../src/settings';
import { setCurrent, setRender, setToast } from '../../src/settings/page-state.ts';
import { moocSettings } from '../../src/platforms/mooc/settings.ts';
import { button } from '../../src/ui';
import { inlineSection, sectionTitle } from '../../src/ui/form.ts';
import { aiSection } from './sections/ai.ts';
import { scheduleSection } from './sections/schedule.ts';

export interface SettingsView {
  host: HTMLElement;
  render: () => void;
}

/** 分区顺序的规则：各平台自己的分区在前，外壳的通用分区在后。 */
function sections(): HTMLElement[] {
  return [...moocSettings.render(), scheduleSection(), aiSection()];
}

export function mountSettings(toast: (text: string) => void): SettingsView {
  const host = document.createElement('div');
  host.className = 'sp-settings';

  const group = document.createElement('sl-tab-group');
  host.append(group);

  const foot = document.createElement('div');
  foot.className = 'sp-settings-foot';
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
  const version = document.createElement('span');
  version.className = 'sp-version';
  version.textContent = `v${browser.runtime.getManifest().version}`;
  foot.append(reset, version);
  host.append(foot);

  function render(): void {
    group.replaceChildren();
    sections().forEach((section, index) => {
      const tab = document.createElement('sl-tab');
      tab.setAttribute('slot', 'nav');
      tab.panel = section.id;
      tab.textContent = sectionTitle(section);
      if (index === 0) tab.active = true;

      const panel = document.createElement('sl-tab-panel');
      panel.name = section.id;
      panel.append(inlineSection(section));

      group.append(tab, panel);
    });
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
