import { objectType } from '@nexus/schema'

export const Participant = objectType({
  name: 'Participant',
  definition(t) {
    t.model.id()
    t.model.user()
    t.model.userId()    
    t.model.event()
    t.model.eventId()
  }
})
