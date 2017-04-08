export function interlace (input, {blockSize}) {
  let result = []
  while (input.length > 0) {
    if (input.length < 2 * blockSize || !blockSize) {
      if (input.length % 2 !== 0) {
        input = `${input}X`
      }
      blockSize = input.length / 2
    }
    const block1 = input.substr(0, blockSize)
    const block2 = input.substr(blockSize, blockSize)
    input = input.substr(2 * blockSize)
    console.assert(block1.length === block2.length)
    for (let k = 0; k < blockSize; ++k) {
      result.push(block1[k], block2[k])
    }
  }
  return result
}

export function deinterlace (input, {blockSize}) {
  input = [...input]
  if (input.length % 2 !== 0) {
    input.push('X')
  }

  let result = []
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
