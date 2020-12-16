import gql from 'graphql-tag'
import { feedFragment } from './fragments'

export const ME = gql`
  query {
    me {
      id
      name
    }
  }
`

export const FEED = gql`
  query feed($first: Int) {
    feed(first: $first, orderBy: { time: desc }) {
      ...Feed
    }
    feedLength
  }
  ${feedFragment}
`

export const POLL = gql`
  query currentPoll($id: Int!) {
    currentPoll {
      id
      userId
      user {
        id
        name
      }
      active
      createdAt
      firstStageTime
      secondStageTime
      currentStage
      votesCount
      iveVoted(id: $id)
      winnerEvent {
        id
        iParticipate(id: $id)
        name
        votesCount
        startTime
      }
      votesByEventNameAndTime {
        name
        votes
        times {
          time
          votes
        }
      }
    }
  }
`

export const EVENT_NAMES = gql`
  query eventNames($name: String) {
    eventNames(
      where: {
        OR: [{ name: { contains: $name } }, { name: { startsWith: $name } }]
      }
    ) {
      name
    }
  }
`
