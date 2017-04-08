export default (input, size = 5) => {
  if (Array.isArray(input)) {
    input = input.join('')
  }
  size = parseInt(size)
  let groups = []
  for (let k = 0; k < input.length; k += size) {
    groups.push(input.substr(k, size))
  }
  return groups
}
