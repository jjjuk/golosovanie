import gql from 'graphql-tag'

export const feedFragment = gql`
  fragment Feed on Feed {
    id
    userId
    user {
      name
    }
    action
    time
  }
`
