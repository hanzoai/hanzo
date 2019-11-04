let splitName = (v) => {
  if (!v || !v.split) {
    throw new Error('Name is missing.')
  }

  let [firstName, ...lastName] = v.split(' ')
  this.props.data.set('firstName', firstName)
  this.props.data.set('lastName', lastName.join(' '))

  return v
}

export default splitName
