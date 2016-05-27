// components/Root.jsx
var React = require('react')

export default React.createClass({
  render: function () {
    return (
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-with, initial-scale=1' />
          <title>{this.props.title}</title>
        </head>
        <body>
          {this.props.children}
        </body>
      </html>
    )
  }
})
