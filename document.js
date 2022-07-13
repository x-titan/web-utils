import { validHTML } from "./internal.js"

//#region Types
/** @typedef {HTMLElement | HTMLDivElement | Element} targetElement */
//#endregion

const $d = document

/**
 * @param {string} source
 * @param {targetElement} primary
 */
export function search(source, primary = $d) {
  return validHTML(primary).querySelector(source)
}

/**
 * @param {string} source
 * @param {targetElement} primary
 */
search.id = (source, primary = $d) => (
  validHTML(primary).getElementById(source)
)

/**
 * @param {string} source
 * @param {targetElement} primary
 */
search.all = (source, primary = $d) => (
  validHTML(primary).querySelectorAll(source)
)

/**
 * @param {'div'|'span'|'canvas'|'p'|'a'|string} tagName
 * @param {ElementCreationOptions} options
 */
search.new = search.newElement = (tagName, options) => (
  $d.createElement(tagName, options)
)

/** @param {targetElement} target */
export function scrollTo(target) {
  validHTML(target).scrollIntoView({ behavior: 'smooth' })
  return target
}

/**
 * @param {string|Image|HTMLImageElement} source
 * @param {(base64: string) => void} [callback]
 * @return {Promise<string>}
 */
export function getBase64(source, callback, outputFormat) {
  if (typeof outputFormat !== 'string') {
    outputFormat = 'image/png'
  }
  return new Promise((res, rej) => {
    const image = new Image()

    image.crossOrigin = 'Anonymous'
    image.onerror = e => rej(e)
    image.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        canvas.height = image.naturalHeight
        canvas.width = image.naturalWidth
        ctx.drawImage(image, 0, 0)
        res(canvas.toDataURL(outputFormat))
      } catch (error) { rej(error) }
    }

    if (typeof source === 'string') {
      image.src = source
    } else if (source instanceof Image) {
      image.src = source.src
    } else {
      rej(new TypeError('Not supported source param'))
    }
  }).then((base) => {
    if (typeof callback === 'function') {
      callback(base, source)
    }
    return base
  })
}