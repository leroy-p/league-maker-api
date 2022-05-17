import { mergeTypeDefs } from '@graphql-tools/merge'

import Player from '../modules/player/graphql/schema'
import OrderByEmum from '../common/types/schema'

export const typeSources = [OrderByEmum, Player]

export const typeDefs = mergeTypeDefs(typeSources)
