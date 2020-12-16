import React, { useEffect, useState, useCallback } from 'react'
import { PollContext, AuthContext } from 'context'

import { useClient, useSubscription } from 'urql'
import { ME, POLL, POLL_SUB } from 'api'

import { ReactComponent as Logo } from 'assets/logo.svg'
import Progress from '@material-ui/core/CircularProgress'
import { theme, useStyles } from 'useStyles'

import Auth from './Auth'

const SplashScreen = () => {
  const classes = useStyles(theme)
  return (
    <div className={classes.splashScreenBg}>
      <Progress className={classes.splashScreenProgress} color='secondary' />
      <Logo className={classes.splashScreenLogo} />
    </div>
  )
}

const Redirect = ({ children }) => {
  const client = useClient()
  const [userId, setUserId] = useState()
  const [poll, setPoll] = useState('loading')
  const [loading, setLoading] = useState(true)
  const [trigger, setTrigger] = useState(false)

  const token = window?.localStorage.getItem('token')

  const refetch = () => {
    setTimeout(() => setTrigger(!trigger), 250)
    console.log('refetch')
  }

  const getPoll = useCallback(
    (id) =>
      client
        .query(POLL, { id })
        .toPromise()
        .then(({ data }) => {
          setPoll(data.currentPoll)
        }),
    [client]
  )

  useEffect(() => {
    !userId &&
      client
        .query(ME)
        .toPromise()
        .then(({ data }) => {
          if (data?.me?.id) {
            setUserId(data.me.id)
            getPoll(data.me.id)
          }
          setLoading(false)
        })
    userId && getPoll(userId)
  }, [trigger, client, userId, getPoll])

  useSubscription(
    {
      query: POLL_SUB,
      variables: { id: userId },
    },
    (_, { currentPoll }) => {
      console.log(currentPoll)
      setPoll(currentPoll)
    }
  )

  return (
    <AuthContext.Provider value={{ refetch, userId, setUserId }}>
      <PollContext.Provider value={poll}>
        {!window || loading ? <SplashScreen /> : !!token ? children : <Auth />}
      </PollContext.Provider>
    </AuthContext.Provider>
  )
}

export default Redirect
