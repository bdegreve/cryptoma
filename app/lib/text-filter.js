export default (text, alphabet) => text
  .toUpperCase()
  .replace(/[^A-Z]/g, '')
