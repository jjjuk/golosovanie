import { objectType } from '@nexus/schema'
import { getPollVotes } from '../../utils'

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
    t.model.currentStage()
    t.list.field('votesByEventNameAndTime', {
      type: 'VotesByEventNameAndTime',
      resolve: ({ id }, _, { prisma }) => getPollVotes(id, prisma),
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
