let isPassword = (value) => {
  if (!value) {
    throw new Error('Required')
  }

  if (value.length >= 6) {
    return value
  }

  throw new Error('Password must be atleast 6 characters long')
}

export default isPassword
