import 'date-fns'
import React, { useState } from 'react'

import { useMutation } from 'urql'
import { VOTE } from 'api'

import Dialog from '@material-ui/core/Dialog'
import Actions from '@material-ui/core/DialogActions'
import Content from '@material-ui/core/DialogContent'
import Title from '@material-ui/core/DialogTitle'

import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Utils from '@date-io/date-fns'
import {
  KeyboardTimePicker as TimePicker,
  MuiPickersUtilsProvider as PickerProvider,
} from '@material-ui/pickers'
import TimeIcon from '@material-ui/icons/AccessTimeOutlined'

import useMediaQuery from '@material-ui/core/useMediaQuery'

import { theme, useStyles } from 'useStyles'

import Autocomplete from './Autocomplete'

const CreatePoll = ({ setVoted, open, onClose, pollId }) => {
  const classes = useStyles(theme)
  const mobile = useMediaQuery('(max-width:600px)')

  const [name, setName] = useState('')
  const [startTime, setStartTime] = useState(new Date(Date.now() + 3600000))

  const [, createPoll] = useMutation(VOTE)  

  /**
   * @param {Date} time Time.
   */
  const handleTime = (time) => {
    console.log(time.valueOf().toString())
    setStartTime(time)
  }

  const invalidTime = startTime.valueOf() < Date.now()
  const handleSubmit = () => {
    createPoll({
      pollId,
      name,
      startTime: startTime.setSeconds(0,0).valueOf().toString(),
    }).then(() => {
      onClose()
      setName('')
      console.log(startTime.setSeconds(0,0).valueOf().toString())
      setStartTime(new Date(Date.now() + 3600000))
      setVoted(true)
    })
  }

  return (
    <Dialog fullScreen={mobile} maxWidth='sm' open={open} onClose={onClose}>
      <Title children={<Typography variant='h4'>Vote</Typography>} />
      <Content className={classes.contentCretePoll}>
        <div>
          <Typography variant='h6'>Event</Typography>
          <Typography>
            Create a new event or choose one from past surveys
          </Typography>
          <FormControl className={classes.formCretePoll}>            
          <Autocomplete trigger={open} value={name} setValue={setName} />
          </FormControl>
        </div>
        <div className={classes.dailogSgmnt}>
          <Typography variant='h6'>Start time</Typography>
          <Typography>
            Choose start time of your event from current hour to midnight!
          </Typography>
          <FormControl className={classes.formCretePoll}>
            <PickerProvider utils={Utils}>
              <TimePicker
                error={invalidTime}
                ampm={false}
                minutesStep={15}
                color='secondary'
                label='Start time'
                value={startTime}
                onChange={handleTime}
                keyboardIcon={<TimeIcon />}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </PickerProvider>
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
          disabled={!name || invalidTime}
          onClick={handleSubmit}
          variant='contained'
          color='secondary'
          children='vote!'
        />
      </Actions>
    </Dialog>
  )
}

export default CreatePoll
