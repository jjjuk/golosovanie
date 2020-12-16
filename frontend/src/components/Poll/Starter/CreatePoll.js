import React, { useState } from 'react'

import { useMutation } from 'urql'
import { CREATE_POLL } from 'api'

import Dialog from '@material-ui/core/Dialog'
import Actions from '@material-ui/core/DialogActions'
import Content from '@material-ui/core/DialogContent'
import Title from '@material-ui/core/DialogTitle'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'

import useMediaQuery from '@material-ui/core/useMediaQuery'

import { theme, useStyles } from 'useStyles'

const CreatePoll = ({ open, onClose }) => {
  const classes = useStyles(theme)
  const mobile = useMediaQuery('(max-width:600px)')

  const [firstStageTime, setFirstStageTime] = useState('')
  const [secondStageTime, setSecondStageTime] = useState('')

  const [, createPoll] = useMutation(CREATE_POLL)

  const handleFirstTime = (e) => {
    setFirstStageTime(e.target.value)
  }
  const handleSecondTime = (e) => {
    setSecondStageTime(e.target.value)
  }
  const handleSubmit = () => {
    createPoll({
      firstStageTime: String(firstStageTime),
      secondStageTime: String(secondStageTime),
    }).then(() => {
      onClose()
      setFirstStageTime('')
      setSecondStageTime('')
    })
  }

  return (
    <Dialog fullScreen={mobile} maxWidth='sm' open={open} onClose={onClose}>
      <Title children={<Typography variant='h4'>Start new poll</Typography>} />
      <Content className={classes.contentCretePoll}>
        <div>
          <Typography variant='h6'>First Stage</Typography>
          <Typography>
            Users vote for the event they whant to participate
          </Typography>
          <FormControl className={classes.formCretePoll}>
            <InputLabel color='secondary' children='First stage time' />
            <Select
              value={firstStageTime}
              onChange={handleFirstTime}
              color='secondary'
            >
              <MenuItem value={1000 * 10}>10 secs (debug)</MenuItem>
              <MenuItem value={1000 * 60 * 5}>5 minutes</MenuItem>
              <MenuItem value={1000 * 60 * 15}>15 minutes</MenuItem>
              <MenuItem value={1000 * 60 * 30}>30 minutes</MenuItem>
              <MenuItem value={1000 * 60 * 60}>1 hour</MenuItem>
              <MenuItem value={1000 * 60 * 60 * 2}>2 hours</MenuItem>
              <MenuItem value={1000 * 60 * 60 * 4}>4 hours</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.dailogSgmnt}>
          <Typography variant='h6'>Second Stage</Typography>
          <Typography>
            Everyone decides if they will participate in the event that won the
            Poll!
          </Typography>
          <FormControl className={classes.formCretePoll}>
            <InputLabel color='secondary' children='Second stage time' />
            <Select
              value={secondStageTime}
              onChange={handleSecondTime}
              color='secondary'
            >
              <MenuItem value={1000 * 10}>10 secs (debug)</MenuItem>
              <MenuItem value={1000 * 60 * 5}>5 minutes</MenuItem>
              <MenuItem value={1000 * 60 * 15}>15 minutes</MenuItem>
              <MenuItem value={1000 * 60 * 30}>30 minutes</MenuItem>
              <MenuItem value={1000 * 60 * 60}>1 hour</MenuItem>
              <MenuItem value={1000 * 60 * 60 * 2}>2 hours</MenuItem>
              <MenuItem value={1000 * 60 * 60 * 4}>4 hours</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Content>
      <Actions>
        <Button
          style={{ width: '50%' }}
          onClick={onClose}
          variant='outlined'
          color='secondary'
          children='cancel'
        />
        <Button
          style={{ width: '50%' }}
          disabled={!firstStageTime || !secondStageTime}
          onClick={handleSubmit}
          variant='contained'
          color='secondary'
          children='poll!'
        />
      </Actions>
    </Dialog>
  )
}

export default CreatePoll
