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
  EventStartTime: Prisma.EventStartTime
  Event: Prisma.Event
  Vote: Prisma.Vote
  Participant: Prisma.Participant
  Feed: Prisma.Feed
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'password' | 'events' | 'Poll' | 'Vote' | 'Feed'
      ordering: 'id' | 'name' | 'password'
    }
    polls: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'currentStage' | 'active' | 'userId' | 'user' | 'firstStageTime' | 'secondStageTime' | 'votes' | 'events'
      ordering: 'id' | 'createdAt' | 'currentStage' | 'active' | 'userId' | 'firstStageTime' | 'secondStageTime'
    }
    eventNames: {
      filtering: 'AND' | 'OR' | 'NOT' | 'name' | 'events'
      ordering: 'name'
    }
    eventStartTimes: {
      filtering: 'AND' | 'OR' | 'NOT' | 'startTime' | 'events'
      ordering: 'startTime'
    }
    events: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'eventName' | 'startTime' | 'eventStartTime' | 'pollId' | 'poll' | 'approved' | 'paticipants' | 'votes'
      ordering: 'id' | 'name' | 'startTime' | 'pollId' | 'approved'
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
    events: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'userId' | 'user' | 'eventId' | 'event'
      ordering: 'id' | 'userId' | 'eventId'
    }
    Poll: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'currentStage' | 'active' | 'userId' | 'user' | 'firstStageTime' | 'secondStageTime' | 'votes' | 'events'
      ordering: 'id' | 'createdAt' | 'currentStage' | 'active' | 'userId' | 'firstStageTime' | 'secondStageTime'
    }
    Vote: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'pollId' | 'poll' | 'userId' | 'user' | 'eventId' | 'event'
      ordering: 'id' | 'createdAt' | 'pollId' | 'userId' | 'eventId'
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
    events: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'eventName' | 'startTime' | 'eventStartTime' | 'pollId' | 'poll' | 'approved' | 'paticipants' | 'votes'
      ordering: 'id' | 'name' | 'startTime' | 'pollId' | 'approved'
    }
  }
  EventName: {
    events: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'eventName' | 'startTime' | 'eventStartTime' | 'pollId' | 'poll' | 'approved' | 'paticipants' | 'votes'
      ordering: 'id' | 'name' | 'startTime' | 'pollId' | 'approved'
    }
  }
  EventStartTime: {
    events: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'eventName' | 'startTime' | 'eventStartTime' | 'pollId' | 'poll' | 'approved' | 'paticipants' | 'votes'
      ordering: 'id' | 'name' | 'startTime' | 'pollId' | 'approved'
    }
  }
  Event: {
    paticipants: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'userId' | 'user' | 'eventId' | 'event'
      ordering: 'id' | 'userId' | 'eventId'
    }
    votes: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'createdAt' | 'pollId' | 'poll' | 'userId' | 'user' | 'eventId' | 'event'
      ordering: 'id' | 'createdAt' | 'pollId' | 'userId' | 'eventId'
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
    eventStartTime: 'EventStartTime'
    eventStartTimes: 'EventStartTime'
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
    createOneEventStartTime: 'EventStartTime'
    updateOneEventStartTime: 'EventStartTime'
    updateManyEventStartTime: 'BatchPayload'
    deleteOneEventStartTime: 'EventStartTime'
    deleteManyEventStartTime: 'BatchPayload'
    upsertOneEventStartTime: 'EventStartTime'
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
    password: 'String'
    events: 'Participant'
    Poll: 'Poll'
    Vote: 'Vote'
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
    events: 'Event'
  }
  EventName: {
    name: 'String'
    events: 'Event'
  }
  EventStartTime: {
    startTime: 'String'
    events: 'Event'
  }
  Event: {
    id: 'Int'
    name: 'String'
    eventName: 'EventName'
    startTime: 'String'
    eventStartTime: 'EventStartTime'
    pollId: 'Int'
    poll: 'Poll'
    approved: 'Boolean'
    paticipants: 'Participant'
    votes: 'Vote'
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
  EventStartTime: Typegen.NexusPrismaFields<'EventStartTime'>
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
  