var React = require('react')

const Stylesheet = (asset) => (<link rel='stylesheet' type='text/css' href={asset} />)
const Script = (asset) => (<script type='text/javascript' src={asset} />)

export default ({title, scripts, stylesheets, children}) => (
  <html lang='en'>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-with, initial-scale=1' />
      <title>{title}</title>
      {React.Children.map(stylesheets, Stylesheet)}
      <link rel='stylesheet' href='styles.css' />
    </head>
    <body>
      {children}
      {React.Children.map(scripts, Script)}
    </body>
  </html>
)
