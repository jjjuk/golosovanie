import React, { useContext, Fragment } from 'react'
import { PollContext, AuthContext } from 'context'

import Starter from './Starter'
import FirstStage from './FirstStage'
import SecondStage from './SecondStage'
import CancelPoll from './CancelPoll'

const Poll = () => {
  const { userId } = useContext(AuthContext)
  const poll = useContext(PollContext)

  if (poll === 'loading') return null
  if (!poll || !poll.active) return <Starter />
  else if (poll.currentStage === 1)
    return (
      <Fragment>
        <FirstStage />
        {userId === poll?.userId && <CancelPoll />}
      </Fragment>
    )
  else if (poll.currentStage === 2)
    return (
      <Fragment>
        <SecondStage />
        {userId === poll?.userId && <CancelPoll />}
      </Fragment>
    )
}

export default Poll
