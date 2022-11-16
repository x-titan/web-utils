const d = document

export function isHTML(value) {
  return (value instanceof HTMLElement || value === d)
}

/**
 * @param {HTMLElement} value
 * @return {value}
 */
export function validHTML(value) {
  if (isHTML(value)) {
    return value
  }
  throw new TypeError("Bad argument. Required a HTMLElement")
}

if (typeof HTMLElement.prototype.getElementsById !== "function") {
  Object.defineProperty(HTMLElement.prototype, "getElementById", {
    /** 
     * @param {string} id
     * @return {HTMLElement}
     */
    value: function (id) {
      if (!isHTML(this)) {
        throw new TypeError("`this` is not HTMLElement")
      }

      if ("string" !== typeof id || id === "") {
        throw new Error("Bad argument. Unexpected `id`. Required a string")
      }

      return this.querySelector("#" + id)
    }
  })
}
