import { Component } from 'react'
import {
  createClient,
  Provider,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  errorExchange,
  subscriptionExchange,
} from 'urql'
import { authExchange } from '@urql/exchange-auth'
import { makeOperation } from '@urql/core'

import { SubscriptionClient } from 'subscriptions-transport-ws'

const subscriptionClient = new SubscriptionClient(
  process.env.REACT_APP_WS_URL,
  {
    reconnect: true,
  }
)

const getAuth = async ({ authState }) => {
  if (!authState) {
    const token = localStorage.getItem('token')
    if (token) {
      return { token }
    }
    localStorage.removeItem('token')
    return null
  }
  return null
}

const addAuthToOperation = ({ authState, operation }) => {
  if (!authState || !authState.token) {
    return operation
  }
  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {}
  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: authState.token,
      },
    },
  })
}

const didAuthError = ({ error }) => {
  return error.message === '[GraphQL] Not Authorised!'
}

const willAuthError = ({ authState }) => {
  if (!authState || !authState.token) return true
  return false
}

function WithUrql(App) {
  const client = createClient({
    url: process.env.REACT_APP_SERVER_URL,
    exchanges: [
      dedupExchange,
      cacheExchange,
      subscriptionExchange({
        forwardSubscription(operation) {
          return subscriptionClient.request(operation)
        },
      }),
      errorExchange({
        onError: (error) => {
          const isAuthError = error.message === '[GraphQL] Not Authorised!'
          if (isAuthError) {
            localStorage.removeItem('token')
          }
        },
      }),
      authExchange({
        getAuth,
        addAuthToOperation,
        didAuthError,
        willAuthError,
      }),
      fetchExchange,
    ],
  })
  return class extends Component {
    render() {
      return (
        <Provider value={client}>
          <App />
        </Provider>
      )
    }
  }
}

export default WithUrql
