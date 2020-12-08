import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
  first?: boolean
  last?: boolean
  before?: boolean
  after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'No custom scalars are used in your Prisma Schema.'

// Prisma model type definitions
interface PrismaModels {
  User: Prisma.User
  Poll: Prisma.Poll
  EventName: Prisma.EventName
  Event: Prisma.Event
  Vote: Prisma.Vote
  Participant: Prisma.Participant
  Feed: Prisma.Feed
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'color' | 'password' | 'online' | 'Poll' | 'Vote' | 'Participant' | 'Feed'
      ordering: 'id' | 'name' | 'color' | 'password' | 'online'
    }
    polls: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'currentStage' | 'active' | 'userId' | 'user' | 'firstStageTime' | 'secondStageTime' | 'votes'
      ordering: 'id' | 'createdAt' | 'currentStage' | 'active' | 'userId' | 'firstStageTime' | 'secondStageTime'
    }
    eventNames: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'events'
      ordering: 'id' | 'name'
    }
    events: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'eventName' | 'approved' | 'startTime' | 'Vote' | 'Participant'
      ordering: 'id' | 'name' | 'approved' | 'startTime'
    }
    votes: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'pollId' | 'poll' | 'userId' | 'user' | 'eventId' | 'event'
      ordering: 'id' | 'createdAt' | 'pollId' | 'userId' | 'eventId'
    }
    participants: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'userId' | 'user' | 'eventId' | 'event'
      ordering: 'id' | 'userId' | 'eventId'
    }
    feeds: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'userId' | 'user' | 'action' | 'time'
      ordering: 'id' | 'userId' | 'action' | 'time'
    }
  },
  User: {
    Poll: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'currentStage' | 'active' | 'userId' | 'user' | 'firstStageTime' | 'secondStageTime' | 'votes'
      ordering: 'id' | 'createdAt' | 'currentStage' | 'active' | 'userId' | 'firstStageTime' | 'secondStageTime'
    }
    Vote: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'pollId' | 'poll' | 'userId' | 'user' | 'eventId' | 'event'
      ordering: 'id' | 'createdAt' | 'pollId' | 'userId' | 'eventId'
    }
    Participant: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'userId' | 'user' | 'eventId' | 'event'
      ordering: 'id' | 'userId' | 'eventId'
    }
    Feed: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'userId' | 'user' | 'action' | 'time'
      ordering: 'id' | 'userId' | 'action' | 'time'
    }
  }
  Poll: {
    votes: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'pollId' | 'poll' | 'userId' | 'user' | 'eventId' | 'event'
      ordering: 'id' | 'createdAt' | 'pollId' | 'userId' | 'eventId'
    }
  }
  EventName: {
    events: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'eventName' | 'approved' | 'startTime' | 'Vote' | 'Participant'
      ordering: 'id' | 'name' | 'approved' | 'startTime'
    }
  }
  Event: {
    Vote: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'pollId' | 'poll' | 'userId' | 'user' | 'eventId' | 'event'
      ordering: 'id' | 'createdAt' | 'pollId' | 'userId' | 'eventId'
    }
    Participant: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'userId' | 'user' | 'eventId' | 'event'
      ordering: 'id' | 'userId' | 'eventId'
    }
  }
  Vote: {

  }
  Participant: {

  }
  Feed: {

  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    user: 'User'
    users: 'User'
    poll: 'Poll'
    polls: 'Poll'
    eventName: 'EventName'
    eventNames: 'EventName'
    event: 'Event'
    events: 'Event'
    vote: 'Vote'
    votes: 'Vote'
    participant: 'Participant'
    participants: 'Participant'
    feed: 'Feed'
    feeds: 'Feed'
  },
  Mutation: {
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'BatchPayload'
    deleteOneUser: 'User'
    deleteManyUser: 'BatchPayload'
    upsertOneUser: 'User'
    createOnePoll: 'Poll'
    updateOnePoll: 'Poll'
    updateManyPoll: 'BatchPayload'
    deleteOnePoll: 'Poll'
    deleteManyPoll: 'BatchPayload'
    upsertOnePoll: 'Poll'
    createOneEventName: 'EventName'
    updateOneEventName: 'EventName'
    updateManyEventName: 'BatchPayload'
    deleteOneEventName: 'EventName'
    deleteManyEventName: 'BatchPayload'
    upsertOneEventName: 'EventName'
    createOneEvent: 'Event'
    updateOneEvent: 'Event'
    updateManyEvent: 'BatchPayload'
    deleteOneEvent: 'Event'
    deleteManyEvent: 'BatchPayload'
    upsertOneEvent: 'Event'
    createOneVote: 'Vote'
    updateOneVote: 'Vote'
    updateManyVote: 'BatchPayload'
    deleteOneVote: 'Vote'
    deleteManyVote: 'BatchPayload'
    upsertOneVote: 'Vote'
    createOneParticipant: 'Participant'
    updateOneParticipant: 'Participant'
    updateManyParticipant: 'BatchPayload'
    deleteOneParticipant: 'Participant'
    deleteManyParticipant: 'BatchPayload'
    upsertOneParticipant: 'Participant'
    createOneFeed: 'Feed'
    updateOneFeed: 'Feed'
    updateManyFeed: 'BatchPayload'
    deleteOneFeed: 'Feed'
    deleteManyFeed: 'BatchPayload'
    upsertOneFeed: 'Feed'
  },
  User: {
    id: 'Int'
    name: 'String'
    color: 'String'
    password: 'String'
    online: 'Boolean'
    Poll: 'Poll'
    Vote: 'Vote'
    Participant: 'Participant'
    Feed: 'Feed'
  }
  Poll: {
    id: 'Int'
    createdAt: 'String'
    currentStage: 'Int'
    active: 'Boolean'
    userId: 'Int'
    user: 'User'
    firstStageTime: 'String'
    secondStageTime: 'String'
    votes: 'Vote'
  }
  EventName: {
    id: 'Int'
    name: 'String'
    events: 'Event'
  }
  Event: {
    id: 'Int'
    name: 'String'
    eventName: 'EventName'
    approved: 'Boolean'
    startTime: 'String'
    Vote: 'Vote'
    Participant: 'Participant'
  }
  Vote: {
    id: 'Int'
    createdAt: 'String'
    pollId: 'Int'
    poll: 'Poll'
    userId: 'Int'
    user: 'User'
    eventId: 'Int'
    event: 'Event'
  }
  Participant: {
    id: 'Int'
    userId: 'Int'
    user: 'User'
    eventId: 'Int'
    event: 'Event'
  }
  Feed: {
    id: 'Int'
    userId: 'Int'
    user: 'User'
    action: 'String'
    time: 'String'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  User: Typegen.NexusPrismaFields<'User'>
  Poll: Typegen.NexusPrismaFields<'Poll'>
  EventName: Typegen.NexusPrismaFields<'EventName'>
  Event: Typegen.NexusPrismaFields<'Event'>
  Vote: Typegen.NexusPrismaFields<'Vote'>
  Participant: Typegen.NexusPrismaFields<'Participant'>
  Feed: Typegen.NexusPrismaFields<'Feed'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  