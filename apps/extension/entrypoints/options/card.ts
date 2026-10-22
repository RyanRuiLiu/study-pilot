/*
 * 卡片的显隐（唯一实现）。
 *
 * 规则：**空卡是缺陷**。一张只有标题、下面什么都没有的卡，读者无法区分
 * 「这里本来就没东西」与「没读到 / 没做」——那正是本项目要消灭的静默失败。
 * 要么卡里有内容（含一行如实说明），要么整张卡不出现。
 *
 * 唯一例外是「同一个事实只说一次」：未登录 / 登录失效的指引只在「账号与课程」
 * 卡里出现，其余卡片此时整张收起，而不是各写一句。
 */

/** 让容器所在的卡（最近的 `section.panel`）显示或收起。容器不在卡里时什么都不做。 */
export function setCardVisible(container: HTMLElement | null, visible: boolean): void {
  const card = container?.closest('section.panel');
  if (card === null || card === undefined) return;
  card.toggleAttribute('hidden', !visible);
}
