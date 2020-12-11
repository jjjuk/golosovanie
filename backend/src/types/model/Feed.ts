import { objectType } from '@nexus/schema'

export const Feed = objectType({
  name: 'Feed',
  definition(t) {
    t.model.id()
    t.model.time()
    t.model.action()
    t.model.user()
    t.model.userId()
  },
})
