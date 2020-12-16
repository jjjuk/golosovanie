import React, { useEffect, useState, Fragment } from 'react'

import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'

import InfiniteScroll from 'react-infinite-scroll-component'

import FeedItems from './FeedItems'

import { useClient, useSubscription } from 'urql'
import { FEED, FEED_SUB } from 'api'

import { theme, useStyles } from 'useStyles'

const Feed = () => {
  const classes = useStyles(theme)
  const client = useClient()
  const [feed, setFeed] = useState([])
  const [feedLength, setFeedLength] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    client
      .query(FEED, { first: 18 * page })
      .toPromise()
      .then(({ data }) => {
        setFeed([...data.feed])
        setFeedLength(data.feedLength)
      })
  }, [page, client])

  useSubscription(
    {
      query: FEED_SUB,
    },
    (_, { feed: newFeed }) => {
      setFeed([newFeed, ...feed])
      setFeedLength(newFeed.feedLength)
    }
  )

  const handleScroll = () => {
    setPage(page + 1)
  }

  const hasMore = feed.length !== feedLength

  const loader = feed.length >= 18 && <LinearProgress variant='query' />

  const endMessage = (
    <Fragment key={`feed-end-message`}>
      <Divider />
      <Typography
        component='div'
        style={{ paddingTop: theme.spacing(1) }}
        variant='body1'
        color='textSecondary'
        align='center'
      >
        <b>Yay! You have seen it all</b>
      </Typography>
    </Fragment>
  )

  return (
    <List id='feed-scroll' className={classes.feed}>
      <InfiniteScroll
        scrollableTarget='feed-scroll'
        dataLength={feed.length}
        next={handleScroll}
        hasMore={hasMore}
        scrollThreshold={1}
        loader={loader}
        endMessage={endMessage}
      >
        <FeedItems items={feed} />
      </InfiniteScroll>
    </List>
  )
}

export default Feed
