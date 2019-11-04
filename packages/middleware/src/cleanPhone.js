const cleanPhone = (value) => {
  if (value === '+' || value === '+1') {
    return undefined
  }

  return value
}

export default cleanPhone
