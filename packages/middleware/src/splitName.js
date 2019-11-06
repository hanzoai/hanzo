const splitName = (v, oldV, src) => {
  if (!v || !v.split) {
    throw new Error('Name is missing.')
  }

  let [firstName, ...lastName] = v.split(' ')
  src.firstName = firstName
  src.lastName = lastName

  return v
}

export default splitName
