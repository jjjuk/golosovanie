import { objectType } from '@nexus/schema'

export const Vote = objectType({
  name: 'Vote',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.userId()    
    t.model.user()
    t.model.eventId()
    t.model.event()
    t.model.pollId()
    t.model.poll()
  }
})
