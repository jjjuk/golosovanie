import React, { useState, useContext, useEffect } from 'react'
import { theme, useStyles } from 'useStyles'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Loading from '@material-ui/core/CircularProgress'

import { PollContext } from 'context'

import CountDown from 'react-moment-countdown'

import Vote from './Vote'

const FirstStage = () => {
  const classes = useStyles(theme)
  const [open, setOpen] = useState(false)
  const [ended, setEnded] = useState(false)
  const { firstStageTime, createdAt, id, iveVoted } = useContext(PollContext)
  const [voted, setVoted] = useState(iveVoted)

  useEffect(() => {
    setVoted(iveVoted)
  }, [iveVoted])

  const handleClick = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleEndCountdoun = () => {
    setEnded(true)
  }
  const format =
    Number(firstStageTime) + Number(createdAt) - Date.now() > 1000 * 60 * 60
      ? 'HH:mm:ss'
      : 'mm:ss'
  const date = new Date(Number(createdAt) + Number(firstStageTime))

  return (
    <div className={classes.starterWrapper}>
      {!ended ? (
        <CountDown
          className={classes.countDown}
          targetFormatMask={format}
          toDate={date}
          onCountdownEnd={handleEndCountdoun}
        />
      ) : (
        <Loading        
          color='secondary'
          className={classes.countDown}
          style={{ width: 100, height: 100 }}
        />
      )}
      <Typography
        className={classes.starterCaption}
        variant='h4'
        color='secondary'
        children={
          !voted ? (
            <b>
              Vote for your event.
              <br /> Time is running out!
            </b>
          ) : (
            <b>Wait for 1st stage complete.</b>
          )
        }
      />

      <Button
        className={classes.starterButton}
        disabled={voted}
        variant='outlined'
        color='primary'
        size='large'
        onClick={handleClick}
        children={!voted ? 'Vote' : `You've voted!`}
      />
      {!voted && (
        <Vote
          open={open}
          setVoted={setVoted}
          onClose={handleClose}
          pollId={id}
        />
      )}
    </div>
  )
}

export default FirstStage
