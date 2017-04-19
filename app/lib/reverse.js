/* @flow */

import esrever from 'esrever'

export default (str: string) => {
  const lines = str.split('\n')
  return lines.map(esrever.reverse).join('\n')
}
