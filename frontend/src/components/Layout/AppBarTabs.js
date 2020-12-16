import React from 'react'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import PollIcon from '@material-ui/icons/AssignmentTurnedInOutlined'
import FeedIcon from '@material-ui/icons/ListAltOutlined'

import { theme, useStyles } from 'useStyles'

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

const AppBarTabs = ({ value, onChange }) => {
  const classes = useStyles(theme)

  return (
    <div className={classes.tabs}>
      <Tabs
        centerd
        value={value}
        onChange={onChange}
        textColor='inherit'
        TabIndicatorProps={{
          style: { height: 3, borderRadius: '3px' },
        }}
      >
        <Tab
          wrapped
          className={classes.tab}
          label={
            <div className={classes.tabBtnLabel}>
              <PollIcon />
              {'Poll'}
            </div>
          }
          {...a11yProps(0)}
        />
        <Tab
          wrapped
          className={classes.tab}
          label={
            <div className={classes.tabBtnLabel}>
              <FeedIcon />
              {'Feed'}
            </div>
          }
          {...a11yProps(1)}
        />
      </Tabs>
    </div>
  )
}

export default AppBarTabs
