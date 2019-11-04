let isStateRequiredForCountry = (getStates, getCountry) => {
  return (value) => {
    let states = getStates()
    let country = getCountry()

    if (
      (states[country] && Object.keys(states[country]).length === 0) ||
      (value != null && value !== '')
    ) {
      return value
    }

    throw new Error('Required')
  }
}

export default isStateRequiredForCountry
