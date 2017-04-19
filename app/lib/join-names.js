/* @flow */

type Arg = string | Array<Arg>

export default function joinNames (...args: Array<Arg>) {
  return args
    .map(x => Array.isArray(x) ? joinNames(...x) : x)
    .filter(x => !!x)
    .join(' ')
}
