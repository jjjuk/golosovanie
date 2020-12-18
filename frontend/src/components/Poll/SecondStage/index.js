import React, { useRef, useState, useContext, useEffect, useMemo } from 'react'
import { PollContext } from 'context'

import { useClient } from 'urql'
import { PARTICIPATE } from 'api'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Progress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import PersonIcon from '@material-ui/icons/PersonOutline'

import CountDown from 'react-moment-countdown'
import Reward from 'react-rewards'
import moment from 'moment'

import Stats from './Stats'
import WhoVoted from './WhoVoted'

import { theme, useStyles } from 'useStyles'

const SecondStage = () => {
  const classes = useStyles(theme)
  const client = useClient()
  const [starting, setStarting] = useState(false)
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const [iveVoted, setIveVoted] = useState(false)

  const ref = useRef()

  const {
    firstStageTime,
    secondStageTime,
    createdAt,
    votesByEventNameAndTime,
    winnerEvent,
  } = useContext(PollContext)

  useEffect(() => {
    data.length === 0 &&
      votesByEventNameAndTime.length !== 0 &&
      setData([...votesByEventNameAndTime])
    winnerEvent && setIveVoted(winnerEvent.iParticipate)
  }, [votesByEventNameAndTime, data, winnerEvent])

  const innerData = useMemo(() => data.map(({ times }) => times).flat(), [data])

  const handleClick = () => {
    setStarting(true)
    ref.current.rewardMe()
    client.mutation(PARTICIPATE, { eventId: winnerEvent.id }).toPromise().then()

    setTimeout(() => {
      setStarting(false)
      setIveVoted(true)
    }, 1500)
  }
  const handlePersonClick = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const users = winnerEvent.votes.map(({ user }) => user)
  const format =
    Number(firstStageTime) +
      Number(secondStageTime) +
      Number(createdAt) -
      Date.now() >
    1000 * 60 * 60
      ? 'HH:mm:ss'
      : 'mm:ss'
  const date = new Date(
    Number(createdAt) + Number(secondStageTime) + Number(firstStageTime)
  )

  const buttonCaption = !starting ? (
    !iveVoted ? (
      'participate'
    ) : (
      `i'm a participant!`
    )
  ) : (
    <Progress size={25} />
  )

  const startTimeText =
    !!winnerEvent && moment(Number(winnerEvent.startTime)).format('HH:mm')

  return (
    <div className={classes.starterWrapper}>
      <CountDown
        className={classes.countDown}
        targetFormatMask={format}
        toDate={date}
      />
      {votesByEventNameAndTime?.length !== 0 && (
        <Stats data={data} innerData={innerData} />
      )}
      <Typography
        className={classes.starterCaption}
        variant='h4'
        color='secondary'
        align='center'
        children={
          !!winnerEvent ? (
            <b>
              Event "{winnerEvent.name}" wins with {winnerEvent.votesCount}
              votes!
              <br /> Start time {startTimeText}
              <IconButton onClick={handlePersonClick} color='primary'>
                <PersonIcon />
              </IconButton>
            </b>
          ) : (
            <b>Oh no... No votes(</b>
          )
        }
      />

      {votesByEventNameAndTime?.length !== 0 && (
        <Reward ref={ref} type='memphis'>
          <Button
            disabled={starting || iveVoted}
            className={classes.starterButton}
            variant='outlined'
            color='primary'
            size='large'
            onClick={handleClick}
            children={buttonCaption}
          />
        </Reward>
      )}
      {!!winnerEvent && (
        <WhoVoted
          open={open}
          onClose={handleClose}
          users={users}
          time={startTimeText}
        />
      )}
    </div>
  )
}

export default SecondStage
