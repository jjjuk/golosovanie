import { intArg, nonNull, objectType } from '@nexus/schema'
import { getPollVotes, getUserId } from '../../utils'

export const Poll = objectType({
  name: 'Poll',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.active()
    t.model.userId()
    t.model.user()
    t.model.firstStageTime()
    t.model.secondStageTime()
    t.model.votes()
    t.model.events()
    t.model.winnerEventId()
    t.model.winnerEvent()
    t.model.currentStage()
    t.list.field('votesByEventNameAndTime', {
      type: 'VotesByEventNameAndTime',
      resolve: ({ id, currentStage, active }, _, { prisma }) =>
        active && currentStage === 2 && getPollVotes(id, prisma),
    })
    t.int('votesCount', {
      resolve: ({ id: pollId }, _, { prisma }) =>
        prisma.vote.count({
          where: { pollId },
        }),
    })
    t.boolean('iveVoted', {
      args: {
        id: nonNull(intArg())
      },
      resolve: async ({ id: pollId  }, { id: userId }, ctx) => {
        const iveVoted = await ctx.prisma.vote.findFirst({
          where: {
            pollId,
            userId,
          }
        })
        return !!iveVoted
      }
    })
  },
})

export const VotesByEventNameAndTime = objectType({
  name: 'VotesByEventNameAndTime',
  definition(t) {
    t.string('name')
    t.int('votes')
    t.list.field('times', { type: 'VotesByTime' })
  },
})

export const VotesByTime = objectType({
  name: 'VotesByTime',
  definition(t) {
    t.string('time')
    t.int('votes')
  },
})
