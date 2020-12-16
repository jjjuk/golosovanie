import gql from 'graphql-tag'

export const LOGIN = gql`
  mutation login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
      user {
        id
      }
    }
  }
`

export const SIGNUP = gql`
  mutation signup($name: String!, $password: String!) {
    signup(name: $name, password: $password) {
      token
      user {
        id
      }
    }
  }
`

export const CREATE_POLL = gql`
  mutation createPoll($firstStageTime: String!, $secondStageTime: String!) {
    createPoll(
      firstStageTime: $firstStageTime
      secondStageTime: $secondStageTime
    ) {
      id
    }
  }
`

export const VOTE = gql`
  mutation createVote($pollId: Int!, $name: String!, $startTime: String!) {
    createVote(pollId: $pollId, name: $name, startTime: $startTime) {
      id
    }
  }
`

export const CANCEL_POLL = gql`
  mutation {
    cancelPoll {
      id
    }
  }
`

export const PARTICIPATE = gql`
  mutation participate($eventId: Int!) {
    participate(eventId: $eventId) {
      id
    }
  }
`
