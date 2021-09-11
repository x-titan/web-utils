//#region Types
/** @typedef {HTMLElement | HTMLDivElement | Element} targetElement */
//#endregion

const $d = document
/**
 * @param {string} source
 * @param {targetElement} primary
 */
export function search(source, primary = $d) { return primary.querySelector(source) }
/**
 * @param {string} source
 */
search.id = source => $d.getElementById(source)
/**
 * @param {string} source
 * @param {targetElement} primary
 */
search.all = (source, primary = $d) => primary.querySelectorAll(source)
search.newElement = $d.createElement; (fn => search.newElement = fn.bind($d))($d.createElement);
/** @param {targetElement} target */
export function scrollTo(target) { target.scrollIntoView({ behavior: "smooth" }) }