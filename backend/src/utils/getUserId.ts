import { verify } from 'jsonwebtoken'
import { Context } from '../context'

export const appSecret = process.env.APP_SECRET

export const getUserId = ({ req }: Context): string | object | void => {
  const Authorization =
    req.headers?.authorization || req.req?.headers.authorization
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, appSecret)
    return !!verifiedToken && verifiedToken
  }
}
