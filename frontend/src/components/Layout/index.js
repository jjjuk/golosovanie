import React, { useState /* , useContext */ } from 'react'

import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

import Tabs from './AppBarTabs'
import Logout from './Logout'
import Feed from 'components/Feed'

import SwipeableViews from 'react-swipeable-views'

import Poll from 'components/Poll'

import { ReactComponent as Logo } from 'assets/favicon.svg'

import { theme, useStyles } from 'useStyles'

const Layout = () => {
  const classes = useStyles(theme)
  const [value, setValue] = useState(0)
  const [open, setOpen] = useState(false)

  const handleChange = (_, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  const handleClick = () => {
    setOpen(true)
  }

  return (
    <Container className={classes.container}>
      <Paper className={classes.mainPaper}>
        <AppBar position='relative' className={classes.appBar}>
          <Tabs value={value} onChange={handleChange} />
          <div style={{ display: 'flex' }}>
            <Logo className={classes.appBarLogo} />
            <Typography
              className={classes.appBarTitle}
              variant='h4'
              children='Poll!'
            />
          </div>
          <Button
            variant='outlined'
            color='inherit'
            onClick={handleClick}
            children='logout'
            className={classes.logoutBtn}
          />
        </AppBar>
        <SwipeableViews
          enableMouseEvents
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <div index={0} dir={theme.direction}>        
              <Poll />           
          </div>
          <div index={1} dir={theme.direction}>
            <Feed />
          </div>
        </SwipeableViews>
        <Logout open={open} setOpen={setOpen} />
      </Paper>
    </Container>
  )
}

export default Layout
