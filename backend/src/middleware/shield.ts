import { rule, shield } from 'graphql-shield'
import { getUserId } from '../utils'

const isAuthenticated = rule({ cache: 'contextual' })((_, __, ctx) => {
  return !!getUserId(ctx)
})

export const permissions = shield(
  {
   
  },
  {
    allowExternalErrors: true,    
  }
)
