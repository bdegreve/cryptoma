export default (input, size = 5) => {
  let groups = []
  if (Array.isArray(input)) {
    input = input.join('')
  }
  for (let k = 0; k < input.length; k += size) {
    groups.push(input.substr(k, size))
  }
  return groups
}
