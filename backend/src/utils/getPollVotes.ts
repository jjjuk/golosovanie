import { PrismaClient } from '@prisma/client'

interface VotesByEventNameAndTime {
  name: string
  votes: number
  times: {
    time: string
    votes: number
  }[]
}

export const getPollVotes = async (
  pollId: number,
  prisma: PrismaClient
): Promise<VotesByEventNameAndTime[]> => {
  const votes = await prisma.vote.findMany({
    where: {
      pollId,
    },
    select: {
      event: {
        select: {
          name: true,
          startTime: true,
        },
      },
    },
  })

  //I think that it will be easier and more performant 
  //to count and sort all data with code
  //instead of creating a huge SQL query

  //It will easily handle thousands of votes I think

  //For larger data we may create Promises that spawn new
  //node process for each "times" calculation (line 63-66)
  //and resolve them with Promise.all()

  // quick implementation:
  // https://www.npmjs.com/package/spawn-please
  // https://www.npmjs.com/package/child-process-promise

  //for the test app spawning child processes 
  //will only make it work slower

  const voteEventNamesAndTimes = votes.map(
    ({ event: { name, startTime } }) => ({
      name,
      startTime,
    })
  )

  const voteEventNames = voteEventNamesAndTimes
    .map(({ name }) => name)
    .filter((v, i, a) => a.indexOf(v) === i)

  return voteEventNames.map((name) => {
    const timesByName = voteEventNamesAndTimes
      .filter(({ name: n }) => n === name)
      .map(({ startTime }) => startTime)
    const votes = timesByName.length
    const startTimes = timesByName.filter((v, i, a) => a.indexOf(v) === i)
    const times = startTimes.map((time) => {
      const votes = timesByName.filter((t) => t === time).length
      return { time, votes }
    })
    return { name, votes, times }
  })
}
