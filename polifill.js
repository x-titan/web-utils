Object.defineProperty(HTMLElement.prototype, "getElementById", {
  value: function (id) {
    if (this === null || this === undefined || this === globalThis) throw new Error("Bad call function")
    if ("string" !== typeof id || id === "") throw new Error("Bad id")
    return this.querySelector("#" + id)
  },
  writable: false,
  configurable: false
})