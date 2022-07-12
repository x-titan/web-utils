import { validHTML } from "./internal.js"

//#region Types
/** @typedef {HTMLElement | HTMLDivElement | Element} targetElement */
//#endregion

const _ = (x, y, z) => {
  validHTML(x);
  (Array.isArray(z)
    ? x.classList[y].call(...z)
    : x.classList[y](z));
}
const validObj = (x) => {
  if ("object" === typeof x && x !== null) {
    return true
  }
  throw new TypeError("Invalid Argument. Required a Object")
}

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
export function contains(target, css) {
  validHTML(target)
  return target.classList.contains(css)
}

/**
 * @param {targetElement} target
 * @param {string} css
 * @param {boolean} [force]
 */
export function toggle(target, css, force) {
  validHTML(target)
  return target.classList.toggle(css, force)
}

/**
 * @param {HTMLElement | HTMLDivElement} target
 * @param {CSSStyleDeclaration} css
 */
export function styler(target, style) {
  if (!checker(target, style)) {
    throw new TypeError("Invalid arguments.")
  }
  for (const k in style) {
    if (Object.hasOwnProperty.call(style, k)) {
      target.style[k] = style[k]
    }
  }
  return target
}

/**
 * @param {HTMLElement | HTMLDivElement} target
 * @param {CSSStyleDeclaration} css
 */
styler.set = (target, style) => {
  validHTML(target)
  validObj(style)
  const ts = target.style
  for (const k in style) {
    if (Object.hasOwnProperty.call(style, k)) {
      ts.setProperty(k, style[k])
    }
  }
  return target
}

const css = Object.freeze({
  add,
  remove,
  contains,
  toggle,
})

export { css }