import esrever from 'esrever'

export default (str) => {
  const lines = str.split('\n')
  return lines.map(esrever.reverse).join('\n')
}
