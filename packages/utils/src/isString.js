const isString = (maybeString) => {
  return typeof maybeString === 'string' || maybeString instanceof String
}

export default isString
