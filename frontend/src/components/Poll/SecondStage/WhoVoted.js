import React, { Fragment } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Actions from '@material-ui/core/DialogActions'
import Content from '@material-ui/core/DialogContent'
import Title from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import Item from '@material-ui/core/ListItem'
import ItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

import useMediaQuery from '@material-ui/core/useMediaQuery'

import { theme, useStyles } from 'useStyles'

const WhoVoted = ({ open, onClose, users = [], time }) => {
  const classes = useStyles(theme)
  const { palette, spacing } = theme
  const mobile = useMediaQuery('(max-width:600px)')

  return (
    <Dialog fullScreen={mobile} maxWidth='sm' open={open} onClose={onClose}>
      <Title children={`People who voted for ${time}`} />
      <Content className={classes.contentCretePoll}>
        <List className={classes.whoVotedList}>
          {users.map(({ name }, i, a) => (
            <Fragment key={`voters-item${i}`}>
              <Item>
                <ItemText
                  primary={
                    <div style={{ display: 'flex' }}>
                      <div
                        style={{
                          border: '#cd7197 1px solid',
                          borderRadius: '4px',
                          paddingLeft: '7px',
                          marginRight: '7px',
                        }}
                      >
                        <Typography
                          style={{
                            color: palette.secondary.dark,
                            marginRight: spacing(1),
                          }}
                        >
                          @{name}
                        </Typography>
                      </div>
                    </div>
                  }
                />
              </Item>
              {i !== a.length - 1 && <Divider component='li' />}
            </Fragment>
          ))}
        </List>
      </Content>
      <Actions>
        <Button
          // style={{ width: '50%' }}
          onClick={onClose}
          variant='outlined'
          color='secondary'
          children='close'
        />
      </Actions>
    </Dialog>
  )
}

export default WhoVoted
