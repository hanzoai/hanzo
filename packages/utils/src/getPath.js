export default function getPath(obj, path) {
  let pathTokens = path.split('.')
  let key = pathTokens.pop()

  for (let pathToken of pathTokens) {
    obj = obj[pathToken]

    if (obj === undefined) {
      return undefined
    }
  }

  return obj[key]
}
