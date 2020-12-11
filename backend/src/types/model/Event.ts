import { objectType } from '@nexus/schema'

export const Event = objectType({
  name: 'Event',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.approved()
    t.model.startTime()
    t.model.votes()
    t.model.pollId()
    t.model.poll()
    t.int('votesCount', {
      resolve: ({ id: eventId }, _, { prisma }) =>
        prisma.vote.count({ where: { eventId } }),
    })
  },
})
