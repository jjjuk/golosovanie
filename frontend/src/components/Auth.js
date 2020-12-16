import React, { useState, useContext } from 'react'
import { AuthContext } from 'context'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import Helper from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'

import { useMutation } from 'urql'
import { LOGIN, SIGNUP } from 'api'

import useMediaQuery from '@material-ui/core/useMediaQuery'

import { theme, useStyles } from 'useStyles'

const login = 'LOGIN'
const signup = 'SIGNUP'

const Form = ({ type }) => {
  const classes = useStyles(theme)
  const { refetch, setUserId } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [userError, setUserError] = useState('')
  const [passError, setPassError] = useState(false)

  const [, auth] = useMutation(
    type === login ? LOGIN : type === signup && SIGNUP
  )

  const handleSubmit = () => {
    auth({ name, password }).then(({ data: { signup, login }, error }) => {
      if (!error) {
        console.log(signup?.token || login?.token)
        window.localStorage.setItem('token', signup?.token || login?.token)
        refetch()
        setUserId(signup?.user.id || login?.user.id)
      } else {
        error.message === `[GraphQL] Wrong login` && setUserError('Wrong login')
        error.message === `[GraphQL] User exists` &&
          setUserError('User already exists')
        error.message === `[GraphQL] Wrong password` && setPassError(true)
      }
    })
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
    setUserError('')
  }
  const handlePassChange = (e) => {
    setPassword(e.target.value)
    setPassError(false)
  }

  const passwordHelperChildren =
    type === signup
      ? 'Minimum 6 characters'
      : passError
      ? 'Wrong password'
      : ' '

  return (
    <FormGroup>
      <FormControl className={classes.authFormBox}>
        <InputLabel error={!!userError} color='secondary' children='Login' />
        <Input
          error={!!userError}
          value={name}
          color='secondary'
          onChange={handleNameChange}
          type='text'
        />
        <Helper style={{ textAlign: 'right' }} error children={userError} />
      </FormControl>
      <FormControl className={classes.authFormBox}>
        <InputLabel error={passError} color='secondary' children='Password' />
        <Input
          error={passError}
          color='secondary'
          value={password}
          onChange={handlePassChange}
          type='password'
        />
        <Helper
          style={{ textAlign: 'right' }}
          error={passError}
          children={passwordHelperChildren}
        />
      </FormControl>
      <FormControl className={classes.authFormBoxButton}>
        <Button
          disabled={!name || !(password.length >= 6)}
          variant='outlined'
          color='secondary'
          children={type}
          onClick={handleSubmit}
        />
      </FormControl>
    </FormGroup>
  )
}

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  )
}

const Auth = () => {
  const [value, setValue] = useState(0)

  const mobile = useMediaQuery('(max-width:600px)')

  const handleChange = (_, newValue) => {
    setValue(newValue)
  }

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      style={{ backgroundColor: theme.palette.secondary.light }}
      open
      fullScreen={mobile}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant='fullWidth'
        indicatorColor='secondary'
        textColor='secondary'
      >
        <Tab color='secondary' label='Login' />
        <Tab color='secondary' label='Signup' />
      </Tabs>
      <DialogContent>
        <TabPanel value={value} index={0}>
          <Form type={login} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Form type={signup} />
        </TabPanel>
      </DialogContent>
    </Dialog>
  )
}

export default Auth
