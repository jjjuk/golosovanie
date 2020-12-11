import { queryType } from '@nexus/schema'

import { AuthenticationError } from 'apollo-server'
import { getUserId } from '../utils'

export const Query = queryType({
  definition(t) {
    t.field('me', {
      type: 'User',
      resolve: async (_, __, ctx) => {
        const id = Number(getUserId(ctx))

        if (!id) throw new AuthenticationError('Not Authorised!')

        return await ctx.prisma.user.findUnique({ where: { id } })
      },
    })

    t.field('currentPoll', {
      type: 'Poll',
      resolve: (_, __, { prisma }) =>
        prisma.poll.findFirst({
          where: { active: true },
        }),
    })
  },
})
