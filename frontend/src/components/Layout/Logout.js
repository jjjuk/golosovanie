import React, { useContext } from 'react'
import { AuthContext } from 'context'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import { theme, useStyles } from 'useStyles'

const Logout = ({ open, setOpen }) => {
  const classes = useStyles(theme)

  const { refetch, setUserId } = useContext(AuthContext)

  const logout = () => {
    localStorage.removeItem('token')
    refetch()
    setUserId(null)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle children='Do you really want to quit?' />
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
            children='logout'
            onClick={logout}
          />
        </div>
      </DialogActions>
    </Dialog>
  )
}

export default Logout
