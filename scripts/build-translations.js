const manageTranslations = require('react-intl-translations-manager').default

manageTranslations({
  messagesDirectory: 'build/messages',
  translationsDirectory: 'app/locales/',
  languages: ['nl'] // any language you need
})
