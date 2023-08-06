import { isHTML, validHTML } from "./include.js"

const $ = document.createAttribute.bind(document)

/**
 * @param {string} name
 * @param {string} value
 * @return {Attr}
 */
export function attr(name, value) {
  const _ = $(name || "_")
  _.value = value || ""
  return _
}

/**
 * @param {HTMLElement} element
 * @param {string} attrName
 */
attr.remove = function (element, attrName) {
  validHTML(element)
  if (attrName instanceof Attr) {
    element.removeAttributeNode(attrName)
  } else {
    element.removeAttribute(attrName)
  }
  return element
}

/**
 * @param {HTMLElement} element
 * @param {string} attrName
 * @param {string} attrValue
 */
attr.add = attr.set = function (element, attrName, attrValue) {
  validHTML(element)
  if (attrName instanceof Attr) {
    element.setAttributeNode(attrName)
  } else {
    if (typeof attrName !== "string") {
      throw new TypeError("Second argument is not type a Attr or String")
    }
    if (typeof attrValue !== "string") attrValue = ""
    element.setAttribute(attrName, attrValue)
  }
  return element
}

/**
 * @param {HTMLElement} element
 * @param {string} attrName
 * @param {boolean} [force]
 */
attr.toggle = function (element, attrName, force) {
  return validHTML(element).toggleAttribute(attrName, force || undefined)
}

/**
 * @param {HTMLElement} element
 * @param {string} attrName
 */
attr.get = function (element, attrName) {
  return validHTML(element).getAttribute(attrName)
}

/**
 * @param {HTMLElement} element
 * @param {string} attrName
 */
attr.has = function (element, attrName) {
  return validHTML(element).hasAttribute(attrName)
}