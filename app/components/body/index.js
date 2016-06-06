var React = require('react')

const Stylesheet = (asset) => (<link rel='stylesheet' type='text/css' href={asset} />)
const Script = (asset) => (<script type='text/javascript' src={asset} />)

export default ({title, scripts, stylesheets, children}) => (
  <html lang='en'>
    <head>
      <meta charSet='utf-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-with, initial-scale=1' />
      <title>{title}</title>
      {React.Children.map(stylesheets, Stylesheet)}
    </head>
    <body>
      {children}
      {React.Children.map(scripts, Script)}
    </body>
  </html>
)
