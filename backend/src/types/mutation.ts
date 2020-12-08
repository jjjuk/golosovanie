import { mutationType, stringArg, nonNull, intArg } from '@nexus/schema'
import { sign } from 'jsonwebtoken'
import { appSecret, getUserId } from '../utils'
import { UserInputError, AuthenticationError } from 'apollo-server'

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
          },
        })

        if (!isActive) new UserInputError('Poll is no longer active')

        const userId = Number(getUserId(ctx))

        const vote = await prisma.vote.create({
          data: {
            createdAt: String(Date.now()),
            poll: { connect: { id: pollId } },
            user: { connect: { id: userId } },
            event: {
              create: {
                eventName: {
                  connectOrCreate: {
                    where: { name },
                    create: { name },
                  },
                },
                startTime,
              },
            },
          },
        })

        pubsub.publish(`NEW_VOTE_POLLID=${pollId}`, vote)
        return vote
      },
    })
  },
})
