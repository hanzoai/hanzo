const toPromise = (fn) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      requestAnimationFrame(() => {
        try {
          resolve(fn.apply(null, args))
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}

export default toPromise
