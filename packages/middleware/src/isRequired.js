let isRequired = (value) => {
  if (value != null && value !== '') {
    return value
  }

  throw new Error('Required')
}

export default isRequired
