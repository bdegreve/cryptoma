export default function joinNames (...args) {
  return args
    .map(x => Array.isArray(x) ? joinNames(...x) : x)
    .filter(x => !!x)
    .join(' ')
}
