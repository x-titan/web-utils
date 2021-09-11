Object.defineProperty(HTMLElement.prototype, "getElementById", {
  /** @param {string} id */
  value(id) {
    if (this instanceof HTMLElement) {
      if ("string" !== typeof id || id === "") throw new Error("Bad id")
      return this.querySelector("#" + id)
    } else throw new Error("Bad call function")
  }
})