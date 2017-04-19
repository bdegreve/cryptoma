/* @flow */

import shuffle from 'lib/shuffle'

export default {
  name: 'Typoglycemia',

  encrypt: (plaintext: string) =>
    plaintext.replace(/(\w+)/gu, (_, word) => {
      if (word.length < 4) {
        return word
      }
      const first = word.substr(0, 1)
      const last = word.substr(-1)
      const mid = word.substr(1, word.length - 2)
      const shuffled = shuffle(mid).join('')
      return `${first}${shuffled}${last}`
    })
}
