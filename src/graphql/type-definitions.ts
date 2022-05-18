import { mergeTypeDefs } from '@graphql-tools/merge'

import OrderByEmum from '../common/types/schema'
import Player from '../modules/player/graphql/schema'
import Match from '../modules/match/graphql/schema'

export const typeSources = [OrderByEmum, Player, Match]

export const typeDefs = mergeTypeDefs(typeSources)
