//#region Types
/** @typedef {HTMLElement | HTMLDivElement | Element} targetElements */
//#endregion

const classList = (x, y, z) => { if (Array.isArray(z)) x.classList[y](...z); else x.classList[y](z) },
  checker = (x, y) => x instanceof HTMLElement && "object" === typeof y && y !== null;
/**
 * @param {targetElements} target
 * @param {string | string[]} css
 */
export function add(target, css) { classList(target, "add", css) }
/**
 * @param {targetElements} target
 * @param {string | string[]} css
 */
export function remove(target, css) { classList(target, "remove", css) }
/**
 * @param {targetElements} target
 * @param {string} css
 */
export function contains(target, css) { return target.classList.contains(css) }
/**
 * @param {targetElements} target
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