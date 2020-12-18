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
        votes {
          user {
            name
          }
        }
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

export const NEW_VOTES = gql`
  subscription newVotes($pollId: Int!) {
    newVotes(pollId: $pollId)
  }
`
