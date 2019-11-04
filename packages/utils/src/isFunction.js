import toString from './toString'

const isFunction = (value) => {
  var str;
  str = toString(value);
  return str === '[object Function]' || str === '[object GeneratorFunction]' || str === '[object AsyncFunction]'
}

export default isFunction
