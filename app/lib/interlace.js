/* @flow */

type Options = {
  blockSize: number
}

export function interlace (input: string, { blockSize }: Options) {
  const result = []
  if (input.length % 2 !== 0) {
    input = `${input}X`
  }
  let start = 0
  while (start < input.length) {
    const remaining = input.length - start
    if (remaining < 2 * blockSize || !blockSize) {
      blockSize = remaining / 2
    }
    const block1 = input.slice(start, start + blockSize)
    const block2 = input.slice(start + blockSize, start + 2 * blockSize)
    console.assert(block1.length === block2.length)
    for (let k = 0; k < blockSize; ++k) {
      result.push(block1[k], block2[k])
    }
    start += 2 * blockSize
  }
  return result
}

export function deinterlace (
  input: string | Array<string>,
  { blockSize }: Options
) {
  input = [...input]
  if (input.length % 2 !== 0) {
    input.push('X')
  }

  const result = []
  let block1 = []
  let block2 = []
  for (let k = 0; k < input.length; k += 2) {
    block1.push(input[k])
    block2.push(input[k + 1])
    if (blockSize && block1.length === blockSize) {
      result.push(...block1, ...block2)
      block1 = []
      block2 = []
    }
  }
  result.push(...block1, ...block2)

  return result
}
