/* @flow */

export default (input: string | Array<string>, size: number = 5) => {
  if (Array.isArray(input)) {
    input = input.join('')
  }
  size = parseInt(size)
  const groups = []
  for (let k = 0; k < input.length; k += size) {
    groups.push(input.substr(k, size))
  }
  return groups
}
