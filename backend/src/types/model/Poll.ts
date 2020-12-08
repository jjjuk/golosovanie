import { objectType } from '@nexus/schema'

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
    
  }
})
