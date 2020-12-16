import { mutationType, stringArg, nonNull, intArg } from '@nexus/schema'
import { sign } from 'jsonwebtoken'
import { appSecret, getUserId, pretty } from '../utils'
import { UserInputError } from 'apollo-server'

export const Mutation = mutationType({
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, { name, password }, { prisma }) => {
        const existUser = await prisma.user.findFirst({
          where: {
            name,
          },
        })

        if (!!existUser?.name) throw new UserInputError('User exists')

        const user = await prisma.user.create({
          data: {
            name,
            password,
          },
        })

        return {
          user,
          token: sign(user.id.toString(), appSecret),
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        name: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, { name, password }, { prisma }) => {
        const existUser = await prisma.user.findFirst({
          where: {
            name: { equals: String(name) },
          },
        })

        if (!existUser?.name) throw new UserInputError('Wrong login')

        const user = await prisma.user.findFirst({
          where: {
            name,
            password,
          },
        })

        if (!user) throw new UserInputError('Wrong password')

        return {
          user,
          token: sign(user.id.toString(), appSecret),
        }
      },
    })

    t.field('createPoll', {
      type: 'Poll',
      args: {
        firstStageTime: nonNull(stringArg()),
        secondStageTime: nonNull(stringArg()),
      },
      resolve: async (_, { firstStageTime, secondStageTime }, ctx) => {
        const { prisma, pubsub } = ctx
        const pollAlreadyActive = await prisma.poll.findFirst({
          where: { active: true },
          select: { active: true },
        })

        if (!!pollAlreadyActive)
          throw new UserInputError('There is already active poll, try later')

        const userId = Number(getUserId(ctx))

        const poll = await prisma.poll.create({
          data: {
            user: { connect: { id: userId } },
            createdAt: String(Date.now()),
            firstStageTime,
            secondStageTime,
          },
        })

        pubsub.publish('CURRENT_POLL', poll)

        return poll
      },
    })

    t.field('createVote', {
      type: 'Vote',
      args: {
        pollId: nonNull(intArg()),
        name: nonNull(stringArg()),
        startTime: nonNull(stringArg()),
      },
      resolve: async (_, { pollId, name, startTime }, ctx) => {
        const { prisma, pubsub } = ctx

        const isActive = await prisma.poll.findFirst({
          where: {
            id: pollId,
            active: true,
          },
          select: {
            active: true,
            currentStage: true,
          },
        })

        console.log(pretty(isActive))

        if (
          isActive === null ||
          !isActive.active ||
          isActive?.currentStage === 2
        )
          throw new UserInputError('Poll is no longer active')

        const userId = Number(getUserId(ctx))

        const iveVoted = await ctx.prisma.vote.findFirst({
          where: {
            pollId,
            userId,
          },
        })

        if (!!iveVoted) throw new UserInputError(`You've already voted!`)

        await prisma.eventStartTime.upsert({
          where: { startTime },
          create: { startTime },
          update: {},
        })
        await prisma.eventName.upsert({
          where: { name },
          create: { name },
          update: {},
        })

        const vote = await prisma.vote.create({
          data: {
            createdAt: String(Date.now()),
            poll: { connect: { id: pollId } },
            user: { connect: { id: userId } },
            event: {
              connectOrCreate: {
                where: {
                  unique_event: {
                    name,
                    startTime,
                    pollId,
                  },
                },
                create: {
                  eventName: { connect: { name } },
                  eventStartTime: { connect: { startTime } },
                  poll: { connect: { id: pollId } },
                },
              },
            },
          },
        })

        const voteCount = await prisma.vote.count({
          where: {
            pollId,
          },
        })

        pubsub.publish(`NEW_VOTE_POLLID=${pollId}`, voteCount)
        return vote
      },
    })

    t.field('cancelPoll', {
      type: 'Poll',
      resolve: async (_, __, ctx) => {
        const { prisma, pubsub } = ctx
        const userId = Number(getUserId(ctx))
        const { id } = await prisma.poll.findFirst({
          where: {
            userId,
            active: true,
          },
          select: { id: true },
        })

        if (!id) throw new Error(`You don't have active polls`)

        pubsub.publish(
          'CURRENT_POLL',
          await prisma.poll.update({
            where: { id },
            data: {
              currentStage: 3,
              active: false,
            },
          })
        )

        return await prisma.poll.delete({
          where: { id },
        })
      },
    })

    t.field('participate', {
      type: 'Participant',
      args: {
        eventId: nonNull(intArg()),
      },
      resolve: async (_, { eventId }, ctx) => {
        const { pubsub, prisma } = ctx
        const userId = Number(getUserId(ctx))

        const participant = await prisma.participant.create({
          data: {
            user: { connect: { id: userId } },
            event: { connect: { id: eventId } },
          },
        })

        // pubsub.publish(`PARTICIPANTS:${eventId}`, participant)

        return participant
      },
    })
  },
})
