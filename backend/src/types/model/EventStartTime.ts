import { objectType } from '@nexus/schema'

export const EventStartTime = objectType({
  name: 'EventStartTime',
  definition(t) {
    t.model.startTime()
    t.model.events()
  }
})
