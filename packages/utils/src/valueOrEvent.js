const valueOrEvent = (e) => {
  if (e && e.target) {
    return e.target.value
  }

  return e
}

export default valueOrEvent
