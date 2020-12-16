import React, { useRef, useState } from 'react'
import { ReactComponent as Logo } from 'assets/logo_transparent.svg'
import { theme, useStyles } from 'useStyles'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Progress from '@material-ui/core/CircularProgress'

import Reward from 'react-rewards'

import CreatePoll from './CreatePoll'

const Starter = () => {
  const classes = useStyles(theme)
  const [starting, setStarting] = useState(false)
  const [open, setOpen] = useState(false)

  const ref = useRef()

  const handleClick = () => {
    setStarting(true)
    ref.current.rewardMe()
    setTimeout(() => {
      setStarting(false)
      setOpen(true)
    }, 1500)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.starterWrapper}>
      <Logo className={classes.starterIcon} />
      <Typography
        className={classes.starterCaption}
        variant='h4'
        color='secondary'
        children={<b>New Poll is waiting for you!</b>}
      />
      <Reward ref={ref} type='memphis'>
        <Button          
          disabled={starting}
          className={classes.starterButton}
          variant='outlined'
          color='primary'
          size='large'
          onClick={handleClick}
        >
          {!starting ? 'Start' : <Progress size={25} />}
        </Button>
      </Reward>
      <CreatePoll open={open} onClose={handleClose} />
    </div>
  )
}

export default Starter
