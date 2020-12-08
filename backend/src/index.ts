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

import chalk from 'chalk'

import * as types from './types'

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
      select: {
        id: true,
        createdAt: true,
        firstStageTime: true,
        secondStageTime: true,
      },
    })

    let {
      id = null,
      createdAt = null,
      firstStageTime = null,
      secondStageTime = null,
    } = !!currentPoll && currentPoll

    let logTime = chalk.cyan(new Date().toLocaleTimeString())

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
      console.log(logTime, chalk.green(`Poll with id ${id} now closed`))
    } else console.log(logTime, chalk.gray(`No polls closed`))

    await new Promise((resolve) => setTimeout(resolve, 60000))
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

server.listen(4000)
