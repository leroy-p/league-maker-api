import { GqlModuleOptions } from '@nestjs/graphql'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
import { ApolloDriver } from '@nestjs/apollo'
import express from 'express'

import { env } from '../env'

import { typeSources } from './type-definitions'

type TOptions = Record<string, any> | GqlModuleOptions

export const GraphQLOptions: TOptions = {
  cors: false,
  driver: ApolloDriver,
  typeDefs: typeSources,
  installSubscriptionHandlers: true,
  uploads: {
    maxFileSize: 200_000_000, // 200 MB
  },
  playground: {
    settings: {
      'request.credentials': 'same-origin',
    },
  },
  formatError: (err: GraphQLError): GraphQLFormattedError => {
    console.error(JSON.parse(JSON.stringify(err)))

    return err
  },
}
