/*
 * 待办区的公共件（弹窗内两个平台共用）。
 *
 * 形态是外壳的：空态 / 失败 / 需登录 / 分组——与平台的数据形态无关，组头文字
 * 也由调用方给（慕课给课程名，智慧树给板块名，设计文档 §2.1）。
 * 两平台各写一份曾让「修一处漏一处」成为必然，因此差别收成三样，由调用方给：
 * 容器元素、登录去处的文案与地址、一行怎么渲染（buildRow，数据形态不同）。
 */

/** 一行怎么渲染由调用方给（见各平台自己的 buildRow）。 */
export type TodoRowBuilder<T> = (entry: T) => HTMLElement;

export interface TodoArea<T> {
  note(className: string, text: string): HTMLElement;
  /** 覆盖待办区的内容（统一走这里，不遗漏加载态——见实现处的说明）。 */
  write(children: Node[]): void;
  /** 待办区呈现失败状态。 */
  error(message: string): void;
  /** 待办区呈现「需要登录」。 */
  loginPrompt(): void;
  /** 按组归拢的一组：组头 + N 项 + 逐行（组头文字由调用方给）。 */
  buildGroup(title: string, entries: T[], buildRow: TodoRowBuilder<T>): HTMLElement;
}

export function createTodoArea<T>(options: {
  /** 容器元素（元素清单在 elements.ts；元素缺席时为空，各动作静默跳过） */
  element: () => HTMLElement | null;
  /** 「需要登录」那一条的措辞与去处（每个平台自己的说法与域名） */
  loginText: string;
  loginHref: string;
}): TodoArea<T> {
  function note(className: string, text: string): HTMLElement {
    const element = document.createElement('p');
    element.className = className;
    element.textContent = text;
    return element;
  }

  /**
   * 覆盖待办区的内容。
   *
   * 统一走这里，是为了不遗漏加载态：待办区在数据到达前先显示一句
   * 「正在获取最新数据」。若某个分支直接 replaceChildren，那句提示
   * 会一直留在页面上，与真正的内容并存。
   */
  function write(children: Node[]): void {
    options.element()?.classList.remove('is-loading');
    options.element()?.replaceChildren(...children);
  }

  return {
    note,
    write,

    error(message) {
      write([note('todo-error', `读取失败：${message}`)]);
    },

    /**
     * 「需要登录」的呈现。
     *
     * 与失败状态在样式与措辞上都分开：失败是一句解释，这里是给一个去处。
     * 会话 cookie 是会话级的，关浏览器几天再打开就会过期，
     * 用户遇到的多半是这种情况——他并没有做错什么，只是需要重新登录一次。
     *
     * 去处是**句内链接**，不另起一行做成按钮——与设置页那四处（`loginNote`）
     * 同一形状，也是界面上「一句说明 ＋ 一个去处」的既有形状（见 index.html
     * 的 AI 那条说明）。两平台两页面四处，形状只有这一种。
     */
    loginPrompt() {
      const box = document.createElement('div');
      box.className = 'todo-login';

      const text = note('todo-login-text', options.loginText);
      const link = document.createElement('a');
      link.href = options.loginHref;
      link.target = '_blank';
      link.rel = 'noreferrer';
      link.textContent = '前往登录';
      text.append(link);

      box.append(text);
      write([box]);
    },

    buildGroup(title, entries, buildRow) {
      const group = document.createElement('section');
      group.className = 'todo-group';

      const head = document.createElement('p');
      head.className = 'todo-course';

      const name = document.createElement('span');
      name.textContent = title;

      const count = document.createElement('span');
      count.className = 'todo-count';
      count.textContent = `${entries.length} 项`;

      head.append(name, count);
      group.append(head);
      for (const entry of entries) group.append(buildRow(entry));
      return group;
    },
  };
}
