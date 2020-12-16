import gql from 'graphql-tag'

export const FEED_SUB = gql`
  subscription {
    feed {
      id
      userId
      user {
        name
      }
      action
      time
      feedLength
    }
  }
`

export const POLL_SUB = gql`
  subscription currentPoll($id: Int!) {
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
        paticipants {
          user {
            name
          }
        }
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
