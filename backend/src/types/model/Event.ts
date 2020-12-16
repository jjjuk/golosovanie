import { intArg, nonNull, objectType } from '@nexus/schema'

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
    t.model.paticipants()
    t.int('votesCount', {
      resolve: ({ id: eventId }, _, { prisma }) =>
        prisma.vote.count({ where: { eventId } }),
    })
    t.boolean('iParticipate', {
      args: {
        id: nonNull(intArg())
      },
      resolve: async ({ id: eventId }, { id: userId }, { prisma }) => {
        const participant = await prisma.participant.findUnique({
          where: {
            unique_participant: {
              userId,
              eventId,
            }
          }
        })
        return !!participant
      }
    })
  },
})
