import { isHTML, validHTML } from "./include.js"

const $ = document.createAttribute.bind(document)

export function attr(name, value) {
  const _ = $(name)
  _.value = value
  return _
}

attr.remove = function (element, attrName) {
  validHTML(element)
  if (attrName instanceof Attr) {
    element.removeAttributeNode(attrName)
  } else {
    element.removeAttribute(attrName, attrValue)
  }
  return element
}

attr.set = function (element, attrName, attrValue) {
  validHTML(element)
  if (attrName instanceof Attr) {
    element.setAttributeNode(attrName)
  } else {
    element.setAttribute(attrName, attrValue)
  }
  return element
}

attr.toggle = function (element, attrName, force) {
  return validHTML(element).toggleAttribute(attrName, force)
}

attr.get = function (element, attrName) {
  return validHTML(element).getAttribute(attrName)
}

attr.has = function (element, attrName) {
  return validHTML(element).hasAttribute(attrName)
}