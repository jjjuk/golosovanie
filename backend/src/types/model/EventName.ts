import { objectType } from '@nexus/schema'

export const EventName = objectType({
  name: 'EventName',
  definition(t) {
    t.model.name()
    t.model.events()
  }
})
