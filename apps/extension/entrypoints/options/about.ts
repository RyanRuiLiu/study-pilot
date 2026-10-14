/*
 * 关于页：这是什么、不做什么、权限清单。
 *
 * 单独占一个标签是因为通知深链与「更多」都需要一个稳定落点，而不是再开一页。
 * 内容只写用户能用来自我核对的事实，不重复 README 的开发说明。
 *
 * 版式全部来自组件与官方令牌：逐条说明用 form.ts 的 prose（一个名目配一段说明），
 * 权限清单是一张 sl-card 里面放表格。这里没有第四种排版。
 */

import '@shoelace-style/shoelace/dist/components/card/card.js';

import { dataTable } from '../../src/ui';
import { prose } from '../../src/ui/form.ts';

const PERMISSIONS: Array<[string, string]> = [
  ['读取 icourse163.org 的登录凭证', '以你已登录的身份读取课程与作业。不保存账号密码，也不代为登录。'],
  ['本地存储', '课程勾选、开关、快照与运行记录。全部存在这台浏览器里。'],
  ['桌面通知', '截止提醒与自动完成提醒，两类都可以单独关。'],
  ['定时唤醒', '周期检查。它只是「多久去看一眼本地数据」，不等于多久发一次请求。'],
  ['改写自己请求的来源头', '平台按来源判别请求，后台不改写会被拒。只匹配平台自己的地址。'],
];

export function mountAbout(): HTMLElement {
  const host = document.createElement('div');
  host.className = 'sp-stack';

  host.append(
    prose([
      {
        term: '它做什么',
        text: '把你账号上没做完的事集中列出来，标明截止与状态；按你逐个打开的开关，替你做掉其中能自动完成的部分。',
      },
      {
        term: '它不做什么',
        text: '不采集数据、没有服务端、不上传任何东西。考试不代提交——它通常只有一次作答机会，这个动作留给你自己。',
      },
      {
        term: '第三方声明',
        text: '与任何学习平台均无关联，也未获得任何平台的授权或认可。',
      },
      {
        term: '版本',
        text: `v${browser.runtime.getManifest().version}。升级时配置会自动迁移，不需要重装后重设。`,
      },
    ]),
    permissionCard(),
  );
  return host;
}

/** 权限清单从代码里的实际申请项写起，与 PRIVACY.md 同源；两处不一致时以清单为准。 */
function permissionCard(): HTMLElement {
  const card = document.createElement('sl-card');
  const title = document.createElement('h3');
  title.slot = 'header';
  title.textContent = '它申请了哪些权限，各自用来做什么';
  card.append(title, dataTable(['权限', '用途'], PERMISSIONS.map(([item, use]) => ({ cells: [item, use] }))));
  return card;
}
