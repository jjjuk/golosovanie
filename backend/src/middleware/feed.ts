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
            action: 'Created a new Poll!',
            time: Date.now().toString(),
            user: { connect: { id: args?.data?.user?.connect?.id } },
          },
        })
      )

    model === 'Poll' &&
      action === 'update' &&
      args?.data?.active === false &&
      args?.data?.currentStage !== 3 &&
      pubsub.publish(
        'FEED',
        await prisma.feed.create({
          data: {
            action: `Poll has been completed! `,
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
            action: `Poll has been cancelled!`,
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

    if (model === 'Poll' && action === 'update' && !!args?.data?.winnerEvent) {
      let { name } = await prisma.event.findUnique({
        where: {
          id: args.data.winnerEvent.connect.id,
        },
      })

      pubsub.publish(
        'FEED',
        await prisma.feed.create({
          data: {
            action: `Event "${name}" wins the Poll!`,
            time: Date.now().toString(),
          },
        })
      )
    }

    model === 'Vote' &&
      action === 'create' &&
      pubsub.publish(
        'FEED',
        await prisma.feed.create({
          data: {
            user: { connect: { id: args.data.user.connect.id } },
            action: 'Voted!',
            time: Date.now().toString(),
          },
        })
      )

    if (model === 'Participant' && action === 'create') {
      const event = await prisma.event.findUnique({
        where: { id: args.data.event.connect.id },
      })

      pubsub.publish(
        'FEED',
        await prisma.feed.create({
          data: {
            user: { connect: { id: args.data.user.connect.id } },
            action: `Participate in event "${event.name}"!`,
            time: Date.now().toString(),
          },
        })
      )
    }

    return await next(params)
  })
}
