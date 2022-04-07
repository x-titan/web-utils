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
/**
 * @param {string|Image|HTMLImageElement} source
 * @param {(base64: string) => void} [callback]
 * @return {Promise<string>}
 */
export function getBase64(source, callback, outputformat) {
  if (typeof outputformat !== "string")
    outputformat = "image/png"
  return new Promise((res, rej) => {
    const image = new Image()
    image.crossOrigin = "Anonymous"
    image.onload = () => {
      try {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        canvas.height = image.naturalHeight
        canvas.width = image.naturalWidth
        ctx.drawImage(image, 0, 0)
        res(canvas.toDataURL(outputformat))
      } catch (error) { rej(error) }
    }
    image.onerror = e => rej(e)
    if (typeof source === "string")
      image.src = source
    else if (source instanceof Image)
      image.src = source.src
    else rej(new TypeError("Not supported source param"))
  }).then((base) => {
    if (typeof callback === "function")
      callback(base, source)
    return base
  })
}