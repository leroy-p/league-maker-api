export default `#graphql
scalar Date

type Mutation {
  matchCreateOne(createInput: MatchCreateInput!): Match!
  matchUpdateOne(updateInput: MatchUpdateInput!): Match!
  matchDeleteOne(deleteInput: MatchDeleteInput!): Boolean!
  matchDraw: Boolean!
  matchUpdateScore(input: MatchUpdateScoreInput!): Match!
}

type Query {
  matchFindOne(findOneInput: MatchFindOneInput!): Match
  matchFindMany(findManyInput: MatchFindManyInput!): [Match]!
}

type Match {
  uuid: String!
  round: Int!
  player1: Player
  player2: Player
  score1: Int
  score2: Int
  createdAt: Date!
  updatedAt: Date!
}

input MatchCreateInput {
  round: Int!
  player1Uuid: String!
  player2Uuid: String!
}

input MatchFindOneInput {
  where: MatchSearchFieldsInput
}

input MatchFindManyInput {
  skip: Int
  take: Int
  order: MatchOrderByInput
  where: MatchSearchFieldsInput
}

input MatchOrderByInput {
  round: OrderByEnum
}

input MatchSearchFieldsInput {
  uuid: String
  round: Int
  player1Uuid: String
  player2Uuid: String
}

input MatchUpdateInput {
  uuid: String!
  score1: Int!
  score2: Int!
}

input MatchDeleteInput {
  uuid: String!
}

input MatchUpdateScoreInput {
  uuid: String!
  score1: Int!
  score2: Int!
}
`