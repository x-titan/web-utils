import { validHTML } from "./internal.js"

//#region Types
/** @typedef {HTMLElement | HTMLDivElement | Element} targetElement */
//#endregion

const _ = (x, y, z) => {
  validHTML(x);
  (Array.isArray(z)
    ? x.classList[y].call(...z)
    : x.classList[y](z));
  return x
}
const validObj = (x) => {
  if ("object" === typeof x && x !== null) {
    return true
  }
  throw new TypeError("Invalid Argument. Required a Object")
}

/**
 * @param {targetElement} target
 * @param {string | string[]} style
 */
export function add(target, style) { return _(target, "add", style) }

/**
 * @param {targetElement} target
 * @param {string | string[]} style
 */
export function remove(target, style) { return _(target, "remove", style) }

/**
 * @param {targetElement} target
 * @param {string} style
 */
export function contains(target, style) {
  return validHTML(target).classList.contains(style)
}

/**
 * @param {targetElement} target
 * @param {string} style
 * @param {boolean} [force]
 */
export function toggle(target, style, force) {
  return validHTML(target).classList.toggle(style, force)
}

/**
 * @param {HTMLElement | HTMLDivElement} target
 * @param {CSSStyleDeclaration} style
 */
export function styler(target, style) {
  validHTML(target)
  validObj(style)
  for (const k in style) {
    if (Object.hasOwnProperty.call(style, k)) {
      target.style[k] = style[k]
    }
  }
  return target
}

/**
 * @param {HTMLElement | HTMLDivElement} target
 * @param {CSSStyleDeclaration} style
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

Object.assign(HTMLElement.prototype, {
  add(style) { return _(this, "add", style) },
  remove(style) { return _(this, "remove", style) },
  contains(style) { return contains(this, style) },
  toggle(style, force) { return toggle(this, style, force) },
  css(style) { styler(this, style) }
})

export { css }