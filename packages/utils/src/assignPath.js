export default function(object) {
  return (path, v) => {
    let pathTokens = path.split('.')
    let key = pathTokens.pop()

    let obj = object

    for (let pathToken of pathTokens) {
      let newObj = obj[pathToken]

      if (newObj === undefined) {
        obj[pathToken] = {}
      }

      obj = obj[pathToken]
    }

    obj[key] = v
  }
}
