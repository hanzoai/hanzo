let emailRe = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

let isEmail = (value) => {
  if (!value) {
    return value
  }

  if (emailRe.test(value)) {
    return value.toLowerCase()
  }

  throw new Error('Enter a valid email')
}

export default isEmail
