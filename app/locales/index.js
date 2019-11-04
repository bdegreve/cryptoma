/* @flow */

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
