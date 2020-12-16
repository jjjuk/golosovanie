import React, { Fragment, memo } from 'react'

import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

import { theme } from 'useStyles'

import moment from 'moment'

const FeedItems = ({ items }) => {
  const { palette, spacing } = theme

  const date = (time) => {
    const today = moment().format('DDMMYY') === moment(time).format('DDMMYY')
    return moment(Number(time)).format(today ? 'hh:mm' : 'DD MMMM hh:mm')
  }

  return items.map((item, i, a) => (
    <Fragment key={`feed-item${i}`}>
      <ListItem>
        <ListItemText
          primary={
            <div style={{ display: 'flex' }}>
              {item.user?.name && (
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
                    @{item.user?.name}
                  </Typography>
                </div>
              )}
              <Typography>{item.action}</Typography>
              <Typography
                style={{ flexGrow: 1 }}
                align='right'
                color='textSecondary'
              >{`${date(Number(item.time))}`}</Typography>
            </div>
          }
        />
      </ListItem>
      {i !== a.length - 1 && <Divider component='li' />}
    </Fragment>
  ))
}

export default memo(FeedItems)
