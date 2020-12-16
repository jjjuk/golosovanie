import React, { useState, Fragment } from 'react'

import { useClient } from 'urql'
import { CANCEL_POLL } from 'api'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'

import CancelIcon from '@material-ui/icons/HighlightOffOutlined'

import { theme, useStyles } from 'useStyles'

const CancelPoll = () => {
  const classes = useStyles(theme)
  const client = useClient()
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
  }
  const close = () => {
    client
      .mutation(CANCEL_POLL)
      .toPromise()
      .then(() => setOpen(false))
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle children='Do you really want to close the poll?' />
        <DialogActions>
          <div className={classes.dialogBtnWrapper}>
            <Button
              style={{ marginLeft: theme.spacing(0.5) }}
              variant='outlined'
              children='cancel'
              onClick={handleClose}
            />
            <Button
              style={{ marginLeft: theme.spacing(0.5) }}
              variant='contained'
              color='primary'
              children='close'
              onClick={close}
            />
          </div>
        </DialogActions>
      </Dialog>
      <Fab
        variant='extended'
        className={classes.fab}
        children={
          <Fragment>
            <CancelIcon className={classes.fabIcon} /> <p>close poll</p>
          </Fragment>
        }
        color='secondary'
        onClick={handleClick}
      />
    </>
  )
}

export default CancelPoll
