import { PrismaClient } from '@prisma/client'
import { PubSub } from 'graphql-subscriptions/dist/pubsub'

export const feed = (prisma: PrismaClient, pubsub: PubSub) => {
  prisma.$use(async (params, next) => {
    await next(params)
    const { model, action, args } = params

    model === 'Poll' &&
      action === 'create' &&
      pubsub.publish(
        'FEED',
        await prisma.feed.create({
          data: {
            action: 'New Poll is now started!',
            time: Date.now().toString(),
          },
        })
      )

    model === 'Poll' &&
      action === 'update' &&
      !args?.data?.active &&
      pubsub.publish(
        'FEED',
        await prisma.feed.create({
          data: {
            action: `Poll have been completed! `,
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
  })
}
