/* @flow */

export default (array: Array<any>) => {
  const copy = [...array]
  const res = []
  while (copy.length) {
    console.log(copy, res)
    const i = Math.floor(Math.random() * copy.length)
    res.push(copy[i])
    copy.splice(i, 1)
  }
  return res
}
