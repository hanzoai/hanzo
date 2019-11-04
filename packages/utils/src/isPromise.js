const isPromise = (maybePromise) => {
  return maybePromise.then && maybePromise.catch
}

export default isPromise
