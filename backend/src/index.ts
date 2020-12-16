import '../generated/nexus'
import '../generated/typegen-nexus-plugin-prisma'

import { ApolloServer, PubSub } from 'apollo-server'
import { EventEmitter } from 'events'
import { makeSchema } from '@nexus/schema'
import { nexusPrisma } from 'nexus-plugin-prisma'
import { PrismaClient } from '@prisma/client'
import { applyMiddleware } from 'graphql-middleware'
import { permissions } from './middleware/shield'
import { feed } from './middleware/feed'

import {
  magentaBright as pink,
  cyanBright as cyan,
  greenBright as green,
} from 'chalk'

import * as types from './types'
import { getPollVotes } from './utils'

const eventEmitter = new EventEmitter()
eventEmitter.setMaxListeners(256)

const pubsub = new PubSub({ eventEmitter })
const prisma = new PrismaClient()

feed(prisma, pubsub)

//little messy alternative to cron-job
;(async () => {
  while (true) {
    const currentPoll = await prisma.poll.findFirst({
      where: {
        active: true,
      },
    })

    const {
      id = null,
      createdAt = null,
      firstStageTime = null,
      secondStageTime = null,
      currentStage = null,
    } = !!currentPoll && currentPoll

    const logTime = cyan(new Date().toLocaleTimeString())

    if (
      !!currentPoll &&
      Number(createdAt) + Number(firstStageTime) + Number(secondStageTime) <
        Date.now()
    ) {
      let poll = await prisma.poll.update({
        where: { id },
        data: { active: false },
      })

      pubsub.publish('CURRENT_POLL', poll)
      console.log(logTime, green(`Poll with id ${id} now closed`))
    } else if (
      !!currentPoll &&
      currentStage !== 2 &&
      Number(createdAt) + Number(firstStageTime) < Date.now()
    ) {
      const votesByEventNameAndTime = await getPollVotes(id, prisma)

      const winnerEventName =
        votesByEventNameAndTime.length !== 0 &&
        votesByEventNameAndTime.reduce((prev, current) => {
          return prev.votes > current.votes ? prev : current
        })
      const winnerStartTime =
        winnerEventName &&
        winnerEventName.times.length !== 0 &&
        winnerEventName.times.reduce((prev, current) => {
          return prev.votes > current.votes ? prev : current
        })
      const winnerEvent =
        !!winnerStartTime &&
        (await prisma.event.findUnique({
          where: {
            unique_event: {
              pollId: id,
              name: winnerEventName.name,
              startTime: winnerStartTime.time,
            },
          },
          select: {
            id: true,
            votes: {
              select: {
                userId: true,
              },
            },
          },
        }))

      let poll = !!winnerEvent
        ? await prisma.poll.update({
            where: { id },
            data: {
              currentStage: 2,
              winnerEvent: { connect: { id: winnerEvent.id } },
            },
          })
        : await prisma.poll.update({
            where: { id },
            data: {
              currentStage: 2,
            },
          })

      !!winnerEvent &&
        (await Promise.all(
          winnerEvent.votes.map(({ userId }) =>
            prisma.participant.create({
              data: {
                user: { connect: { id: userId } },
                event: { connect: { id: winnerEvent.id } },
              },
            })
          )
        ))

      pubsub.publish('CURRENT_POLL', { ...poll, votesByEventNameAndTime })
      console.log(logTime, green(`Poll with id ${id} now in stage 2`))
    }

    await new Promise((resolve) => setTimeout(resolve, 10 * 1000))
  }
})()
//dont judge me, it's a test task

const rawSchema = makeSchema({
  types,
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
      shouldGenerateArtifacts: true,
      outputs: {
        typegen: __dirname + '/../generated/typegen-nexus-plugin-prisma.ts',
      },
    }),
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/../generated/nexus.ts',
  },
  typegenAutoConfig: {
    sources: [
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
    contextType: 'Context.Context',
  },
})

const schema = applyMiddleware(rawSchema, permissions)

const server = new ApolloServer({
  schema,
  context: (req) => ({
    req,
    pubsub,
    prisma,
  }),
})

const port = 4000
server.listen(port, () => {
  console.log(pink('✨ Server running at'), cyan(`http://localhost:${port} ✨`))
})
