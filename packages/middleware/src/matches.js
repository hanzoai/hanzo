let matches = (valOrFn, type = 'fields') => {
  return (value) => {
    if (value == valOrFn) {
      return value
    }

    if (typeof valOrFn == 'function' && value == valOrFn()) {
      return value
    }

    throw new Error('Your ' + type + ' do not match.')
  }
}

export default matches
