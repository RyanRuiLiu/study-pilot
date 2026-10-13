/*
 * 一次性探针：linkedom 里能否加载 Shoelace 组件。
 * 用完即删，不进仓库。
 */
import { parseHTML } from 'linkedom';

const { window, document, customElements, HTMLElement, CSSStyleSheet, Element } = parseHTML(
  '<!doctype html><html><body></body></html>',
);

Object.assign(globalThis, {
  window,
  document,
  customElements,
  HTMLElement,
  CSSStyleSheet,
  Element,
  Node: window.Node,
  Document: window.Document,
  DocumentFragment: window.DocumentFragment,
  ShadowRoot: window.ShadowRoot,
  Event: window.Event,
  EventTarget: window.EventTarget,
  MutationObserver: window.MutationObserver,
});

try {
  await import('@shoelace-style/shoelace/dist/components/button/button.js');
  await import('@shoelace-style/shoelace/dist/components/badge/badge.js');
  console.log('import ok, customElements has sl-button:', customElements.get('sl-button') !== undefined);

  const btn = document.createElement('sl-button');
  btn.textContent = '立即执行';
  document.body.append(btn);
  console.log('tag:', btn.tagName, 'text:', btn.textContent);
  console.log('upgraded:', btn.constructor.name, 'shadowRoot:', Boolean(btn.shadowRoot));
  console.log('attrs:', btn.getAttributeNames().join(','));
} catch (error) {
  console.log('FAILED:', error && error.stack ? error.stack.split('\n').slice(0, 6).join('\n') : error);
}
