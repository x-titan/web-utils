//#region Types
/** @typedef {HTMLElement | HTMLDivElement | Element} targetElement */
//#endregion

const _ = (x, y, z) => { if (Array.isArray(z)) x.classList[y](...z); else x.classList[y](z) },
  checker = (x, y) => x instanceof HTMLElement && "object" === typeof y && y !== null;
/**
 * @param {targetElement} target
 * @param {string | string[]} css
 */
export function add(target, css) { _(target, "add", css) }
/**
 * @param {targetElement} target
 * @param {string | string[]} css
 */
export function remove(target, css) { _(target, "remove", css) }
/**
 * @param {targetElement} target
 * @param {string} css
 */
export function contains(target, css) { return target.classList.contains(css) }
/**
 * @param {targetElement} target
 * @param {string} css
 * @param {boolean} [force]
 */
export function toggle(target, css, force) { return target.classList.toggle(css, force) }
/**
 * @param {HTMLElement | HTMLDivElement} target
 * @param {CSSStyleDeclaration} css
 */
export function styler(target, style) {
  if (checker(target, style)) for (const k in style)
    if (Object.hasOwnProperty.call(style, k)) target.style[k] = style[k]
  return target
}
/**
 * @param {HTMLElement | HTMLDivElement} target
 * @param {CSSStyleDeclaration} css
 */
styler.set = (target, style) => {
  if (checker(target, style)) for (const k in style)
    if (Object.hasOwnProperty.call(style, k)) target.style.setProperty(k, style[k])
}
const css = Object.freeze({
  add(target, css) { _(target, "add", css) },
  remove(target, css) { _(target, "remove", css) },
  contains(target, css) { return target.classList.contains(css) },
  toggle(target, css, force) { return target.classList.toggle(css, force) }
})
export { css }