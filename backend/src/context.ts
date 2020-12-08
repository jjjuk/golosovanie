import { PrismaClient } from '@prisma/client'
import { PubSub } from 'graphql-subscriptions/dist/pubsub'

export interface Context {
  req: any
  prisma: PrismaClient
  pubsub: PubSub
}