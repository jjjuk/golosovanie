import { objectType } from '@nexus/schema'

export const Feed = objectType({
  name: 'Feed',
  definition(t) {
    t.model.id()
    t.model.time()
    t.model.action()
    t.model.user()
    t.model.userId()
    t.int('feedLength', {
      resolve: (_, __, { prisma }) => prisma.feed.count(),
    })
  },
})
