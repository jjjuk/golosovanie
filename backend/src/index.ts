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
    let currentPoll = await prisma.poll.findFirst({
      where: {
        active: true,
      },
    })

    let {
      id = null,
      createdAt = null,
      firstStageTime = null,
      secondStageTime = null,
      currentStage = null,
    } = !!currentPoll && currentPoll

    let logTime = cyan(new Date().toLocaleTimeString())

    if (
      !!currentPoll &&
      Number(createdAt) + Number(firstStageTime) + Number(secondStageTime) <
        Date.now()
    ) {
      let poll = await prisma.poll.update({
        where: { id },
        data: { active: false },
      })

      // const votesByEventNameAndTime = await getPollVotes(id, prisma)


      pubsub.publish('CURRENT_POLL', poll/* { ...poll, votesByEventNameAndTime } */)
      console.log(logTime, green(`Poll with id ${id} now closed`))
    } else if (
      !!currentPoll &&
      currentStage !== 2 &&
      Number(createdAt) + Number(firstStageTime) < Date.now()
    ) {
      let poll = await prisma.poll.update({
        where: { id },
        data: { currentStage: 2 },
      })

      pubsub.publish('CURRENT_POLL', poll)
      console.log(logTime, green(`Poll with id ${id} now in stage 2`))
    } /* else console.log(logTime, chalk.gray(`No poll actions`)) */

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
