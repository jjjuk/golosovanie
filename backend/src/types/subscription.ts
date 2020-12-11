import { intArg, nonNull, subscriptionType } from '@nexus/schema'

export const Subscription = subscriptionType({
  definition(t) {
    t.field('currentPoll', {
      type: 'Poll',
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('CURRENT_POLL'),
      resolve: (pollPromise: any) => pollPromise,
    })

    t.field('feed', {
      type: 'Feed',
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('FEED'),
      resolve: (feedPromise: any) => feedPromise,
    })

    t.field('newVotes', {
      type: 'Int',
      args: {
        pollId: nonNull(intArg())
      },
      subscribe: (_, { pollId }, { pubsub }) => pubsub.asyncIterator(`NEW_VOTE_POLLID=${pollId}`),
      resolve: (votePromise: any) => votePromise
    })    
  },
})
