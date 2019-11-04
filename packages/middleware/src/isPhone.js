import { parsePhoneNumberFromString } from 'libphonenumber-js'

let isPhone = (v) => {
  if (v == '+' || v =='+1') {
    return undefined
  }

  const phoneNumber = parsePhoneNumberFromString(v)
  if (phoneNumber && phoneNumber.isValid()) {
    return v
  }

  throw Error('Invalid phone number.')
}

export default isPhone
