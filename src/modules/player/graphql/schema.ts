export default `#graphql
scalar Date

type Query {
  playerFindOne(input: PlayerFindOneInput!): Player
  playerGetLeaderboard: [Player!]!
}

type Player {
  uuid: String!
  name: String!
  points: Int!
  played: Int!
  won: Int!
  lost: Int!
  drawed: Int!
  for: Int!
  against: Int!
  diff: Int
  rank: Int
  streak: [MatchResult!]
  matches: [Match!]
}

input PlayerFindOneInput {
  where: PlayerSearchFieldsInput
}

input PlayerSearchFieldsInput {
  uuid: String
}

enum MatchResult {
  WON
  LOST
  DRAWED
}
`