import { PrismaClient } from '@prisma/client'
import { PubSub } from 'graphql-subscriptions/dist/pubsub'

export const feed = (prisma: PrismaClient, pubsub: PubSub) => {
  prisma.$use(async (params, next) => {
    const { model, action, args } = params

    model === 'Poll' &&
      action === 'create' &&
      pubsub.publish(
        'FEED',
        await prisma.feed.create({
          data: {
            action: 'New Poll is now started!',
            time: Date.now().toString(),
            user: { connect: { id: args?.data?.user?.connect?.id } },
          },
        })
      )

    model === 'Poll' &&
      action === 'update' &&
      args?.data?.active === false &&
      pubsub.publish(
        'FEED',
        await prisma.feed.create({
          data: {
            action: `Poll have been completed! `,
            time: Date.now().toString(),
          },
        })
      )

    model === 'Poll' &&
      action === 'update' &&
      args?.data?.currentStage === 3 &&
      pubsub.publish(
        'FEED',
        await prisma.feed.create({
          data: {
            action: `Poll have been cancelled!`,
            time: Date.now().toString(),
          },
        })
      )

    model === 'Poll' &&
      action === 'update' &&
      args?.data?.currentStage === 2 &&
      pubsub.publish(
        'FEED',
        await prisma.feed.create({
          data: {
            action: `Poll now in second stage!`,
            time: Date.now().toString(),
          },
        })
      )

    model === 'Vote' &&
      action === 'create' &&
      pubsub.publish(
        'FEED',
        await prisma.feed.create({
          data: {
            user: { connect: { id: args.data.user.connect.id } },
            action: 'Voted!',
          },
        })
      )
    return await next(params)
  })
}
