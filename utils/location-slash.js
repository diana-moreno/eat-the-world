if (!Object.getOwnPropertyDescriptor(Location.prototype, 'slash'))
  Object.defineProperty(Location.prototype, 'slash', {
    set(path) {
      const { protocol, host } = this
      const url = `${protocol}//${host}${path}`
      history.pushState({ path: url }, '', url)
    },

    get() {
      return this.pathname
    }
  })