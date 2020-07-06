import React from 'react'
import ReactDOM from 'react-dom'

import { ThemeProvider } from './app/theme/ThemeContext'
import App from './app/App.jsx'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  rootElement
)
