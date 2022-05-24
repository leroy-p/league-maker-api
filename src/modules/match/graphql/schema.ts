export default `#graphql
scalar Date

type Mutation {
  matchUpdateScore(input: MatchUpdateScoreInput!): Boolean!
}

type Query {
  matchGetCalendar: [[Match!]!]!
}

type Match {
  uuid: String!
  round: Int!
  player1: Player
  player2: Player
  score1: Int
  score2: Int
  updatedAt: Date!
}

input MatchUpdateScoreInput {
  uuid: String!
  score1: Int!
  score2: Int!
}
`