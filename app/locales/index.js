/* @flow */

import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import nl from 'react-intl/locale-data/nl'

addLocaleData([...en, ...nl])

export const messages = {
  en: undefined, // default messages
  nl: require('./nl.json')
}

export function parseLocale (language: string) {
  if (messages[language]) {
    return language
  }
  language = language.split('-', 1)[0]
  if (messages[language]) {
    return language
  }
  return 'en'
}
