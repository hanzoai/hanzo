const valueOrError = (e) => {
  return (e && e.message) ? e.message : e
}

export default valueOrError

