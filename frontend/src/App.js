import React from 'react'

import withUrql from './withUrql'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { theme } from 'useStyles'

import Redirect from 'components/Redirect'
import Layout from 'components/Layout'


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Redirect>
        <Layout />
      </Redirect>
    </ThemeProvider>
  )
}

export default withUrql(App)
