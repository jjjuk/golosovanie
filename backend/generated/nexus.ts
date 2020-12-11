/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import * as Context from "./../src/context"



declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  EventWhereUniqueInput: { // input type
    id?: number | null; // Int
    unique_event?: NexusGenInputs['Unique_eventCompoundUniqueInput'] | null; // Unique_eventCompoundUniqueInput
  }
  Unique_eventCompoundUniqueInput: { // input type
    name: string; // String!
    pollId: number; // Int!
    startTime: string; // String!
  }
  Unique_voteCompoundUniqueInput: { // input type
    pollId: number; // Int!
    userId: number; // Int!
  }
  VoteWhereUniqueInput: { // input type
    id?: number | null; // Int
    unique_vote?: NexusGenInputs['Unique_voteCompoundUniqueInput'] | null; // Unique_voteCompoundUniqueInput
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    token?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  Event: { // root type
    approved: boolean; // Boolean!
    id: number; // Int!
    name: string; // String!
    pollId: number; // Int!
    startTime: string; // String!
  }
  EventName: { // root type
    name: string; // String!
  }
  EventStartTime: { // root type
    startTime: string; // String!
  }
  Feed: { // root type
    action?: string | null; // String
    id: number; // Int!
    time?: string | null; // String
    userId?: number | null; // Int
  }
  Mutation: {};
  Participant: { // root type
    eventId: number; // Int!
    id: number; // Int!
    userId: number; // Int!
  }
  Poll: { // root type
    active: boolean; // Boolean!
    createdAt: string; // String!
    currentStage: number; // Int!
    firstStageTime: string; // String!
    id: number; // Int!
    secondStageTime: string; // String!
    userId: number; // Int!
  }
  Query: {};
  Subscription: {};
  User: { // root type
    id: number; // Int!
    name: string; // String!
    password: string; // String!
  }
  Vote: { // root type
    createdAt: string; // String!
    eventId: number; // Int!
    id: number; // Int!
    pollId: number; // Int!
    userId: number; // Int!
  }
  VotesByEventNameAndTime: { // root type
    name?: string | null; // String
    times?: Array<NexusGenRootTypes['VotesByTime'] | null> | null; // [VotesByTime]
    votes?: number | null; // Int
  }
  VotesByTime: { // root type
    time?: string | null; // String
    votes?: number | null; // Int
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    token: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  Event: { // field return type
    approved: boolean; // Boolean!
    id: number; // Int!
    name: string; // String!
    poll: NexusGenRootTypes['Poll']; // Poll!
    pollId: number; // Int!
    startTime: string; // String!
    votes: NexusGenRootTypes['Vote'][]; // [Vote!]!
    votesCount: number | null; // Int
  }
  EventName: { // field return type
    events: NexusGenRootTypes['Event'][]; // [Event!]!
    name: string; // String!
  }
  EventStartTime: { // field return type
    events: NexusGenRootTypes['Event'][]; // [Event!]!
    startTime: string; // String!
  }
  Feed: { // field return type
    action: string | null; // String
    id: number; // Int!
    time: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
    userId: number | null; // Int
  }
  Mutation: { // field return type
    cancelPoll: NexusGenRootTypes['Poll'] | null; // Poll
    createPoll: NexusGenRootTypes['Poll'] | null; // Poll
    createVote: NexusGenRootTypes['Vote'] | null; // Vote
    login: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
    signup: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
  }
  Participant: { // field return type
    event: NexusGenRootTypes['Event']; // Event!
    eventId: number; // Int!
    id: number; // Int!
    user: NexusGenRootTypes['User']; // User!
    userId: number; // Int!
  }
  Poll: { // field return type
    active: boolean; // Boolean!
    createdAt: string; // String!
    currentStage: number; // Int!
    events: NexusGenRootTypes['Event'][]; // [Event!]!
    firstStageTime: string; // String!
    id: number; // Int!
    secondStageTime: string; // String!
    user: NexusGenRootTypes['User']; // User!
    userId: number; // Int!
    votes: NexusGenRootTypes['Vote'][]; // [Vote!]!
    votesByEventNameAndTime: Array<NexusGenRootTypes['VotesByEventNameAndTime'] | null> | null; // [VotesByEventNameAndTime]
  }
  Query: { // field return type
    me: NexusGenRootTypes['User'] | null; // User
  }
  Subscription: { // field return type
    currentPoll: NexusGenRootTypes['Poll'] | null; // Poll
    feed: NexusGenRootTypes['Feed'] | null; // Feed
    newVotes: number | null; // Int
  }
  User: { // field return type
    id: number; // Int!
    name: string; // String!
    password: string; // String!
  }
  Vote: { // field return type
    createdAt: string; // String!
    event: NexusGenRootTypes['Event']; // Event!
    eventId: number; // Int!
    id: number; // Int!
    poll: NexusGenRootTypes['Poll']; // Poll!
    pollId: number; // Int!
    user: NexusGenRootTypes['User']; // User!
    userId: number; // Int!
  }
  VotesByEventNameAndTime: { // field return type
    name: string | null; // String
    times: Array<NexusGenRootTypes['VotesByTime'] | null> | null; // [VotesByTime]
    votes: number | null; // Int
  }
  VotesByTime: { // field return type
    time: string | null; // String
    votes: number | null; // Int
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    token: 'String'
    user: 'User'
  }
  Event: { // field return type name
    approved: 'Boolean'
    id: 'Int'
    name: 'String'
    poll: 'Poll'
    pollId: 'Int'
    startTime: 'String'
    votes: 'Vote'
    votesCount: 'Int'
  }
  EventName: { // field return type name
    events: 'Event'
    name: 'String'
  }
  EventStartTime: { // field return type name
    events: 'Event'
    startTime: 'String'
  }
  Feed: { // field return type name
    action: 'String'
    id: 'Int'
    time: 'String'
    user: 'User'
    userId: 'Int'
  }
  Mutation: { // field return type name
    cancelPoll: 'Poll'
    createPoll: 'Poll'
    createVote: 'Vote'
    login: 'AuthPayload'
    signup: 'AuthPayload'
  }
  Participant: { // field return type name
    event: 'Event'
    eventId: 'Int'
    id: 'Int'
    user: 'User'
    userId: 'Int'
  }
  Poll: { // field return type name
    active: 'Boolean'
    createdAt: 'String'
    currentStage: 'Int'
    events: 'Event'
    firstStageTime: 'String'
    id: 'Int'
    secondStageTime: 'String'
    user: 'User'
    userId: 'Int'
    votes: 'Vote'
    votesByEventNameAndTime: 'VotesByEventNameAndTime'
  }
  Query: { // field return type name
    me: 'User'
  }
  Subscription: { // field return type name
    currentPoll: 'Poll'
    feed: 'Feed'
    newVotes: 'Int'
  }
  User: { // field return type name
    id: 'Int'
    name: 'String'
    password: 'String'
  }
  Vote: { // field return type name
    createdAt: 'String'
    event: 'Event'
    eventId: 'Int'
    id: 'Int'
    poll: 'Poll'
    pollId: 'Int'
    user: 'User'
    userId: 'Int'
  }
  VotesByEventNameAndTime: { // field return type name
    name: 'String'
    times: 'VotesByTime'
    votes: 'Int'
  }
  VotesByTime: { // field return type name
    time: 'String'
    votes: 'Int'
  }
}

export interface NexusGenArgTypes {
  Event: {
    votes: { // args
      after?: NexusGenInputs['VoteWhereUniqueInput'] | null; // VoteWhereUniqueInput
      before?: NexusGenInputs['VoteWhereUniqueInput'] | null; // VoteWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  EventName: {
    events: { // args
      after?: NexusGenInputs['EventWhereUniqueInput'] | null; // EventWhereUniqueInput
      before?: NexusGenInputs['EventWhereUniqueInput'] | null; // EventWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  EventStartTime: {
    events: { // args
      after?: NexusGenInputs['EventWhereUniqueInput'] | null; // EventWhereUniqueInput
      before?: NexusGenInputs['EventWhereUniqueInput'] | null; // EventWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Mutation: {
    createPoll: { // args
      firstStageTime: string; // String!
      secondStageTime: string; // String!
    }
    createVote: { // args
      name: string; // String!
      pollId: number; // Int!
      startTime: string; // String!
    }
    login: { // args
      name: string; // String!
      password: string; // String!
    }
    signup: { // args
      name: string; // String!
      password: string; // String!
    }
  }
  Poll: {
    events: { // args
      after?: NexusGenInputs['EventWhereUniqueInput'] | null; // EventWhereUniqueInput
      before?: NexusGenInputs['EventWhereUniqueInput'] | null; // EventWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
    votes: { // args
      after?: NexusGenInputs['VoteWhereUniqueInput'] | null; // VoteWhereUniqueInput
      before?: NexusGenInputs['VoteWhereUniqueInput'] | null; // VoteWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Subscription: {
    newVotes: { // args
      pollId: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
}