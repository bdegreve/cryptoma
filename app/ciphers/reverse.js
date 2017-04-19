/* @flow */

import reverse from 'lib/reverse'

const _reverse = (str: string) => str.split('\n').map(reverse).join('\n')

export default {
  name: 'Reverse',

  encrypt: _reverse,
  decrypt: _reverse
}
