import React from 'react'
import { Link } from 'react-router'

export default () => (
  <main>
    <header>
      <h1>Home page</h1>
    </header>
    <p>Hello world!</p>
    <footer>
      <Link to='/about'>about</Link>
    </footer>
  </main>
)
