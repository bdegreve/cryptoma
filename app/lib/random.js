/* @flow */
/* global Generator */

const crypto =
  typeof window !== 'undefined'
    ? window.crypto || window.msCrypto || undefined
    : undefined

const N = 4294967296 // 2 ** 32

export const hasCrypto = !!crypto

// generates random numbers in range [0, 1), 1 not included.
export function * randomFloats (): Generator<number, void, void> {
  if (crypto) {
    let xs = new Uint32Array(16)
    let k = xs.length
    while (true) {
      if (k === xs.length) {
        crypto.getRandomValues(xs)
        k = 0
      }
      yield xs[k++] / N
    }
  } else {
    while (true) {
      yield Math.random()
    }
  }
}

// generates random integers in range [0, n), n not included
export function * randomIntegers (n: number): Generator<number, void, void> {
  if (crypto) {
    const Nprime = Math.floor(N / n) * n
    let xs = new Uint32Array(16)
    let k = xs.length
    while (true) {
      if (k === xs.length) {
        crypto.getRandomValues(xs)
        k = 0
      }
      const x = xs[k++]
      if (x >= Nprime) {
        continue
      }
      yield x % n
    }
  } else {
    while (true) {
      yield Math.floor(n * Math.random())
    }
  }
}
