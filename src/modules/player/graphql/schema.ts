export default `#graphql
scalar Date

type Mutation {
  playerCreateOne(createInput: PlayerCreateInput!): Player!
  playerUpdateOne(updateInput: PlayerUpdateInput!): Player!
  playerDeleteOne(deleteInput: PlayerDeleteInput!): Boolean!
}

type Query {
  playerFindOne(findOneInput: PlayerFindOneInput!): Player
  playerFindMany(findManyInput: PlayerFindManyInput!): [Player]!
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
  matches1: [Match!]
  matches2: [Match!]
  createdAt: Date!
  updatedAt: Date!
}

input PlayerCreateInput {
  name: String!
}

input PlayerFindOneInput {
  where: PlayerSearchFieldsInput
}

input PlayerFindManyInput {
  skip: Int
  take: Int
  order: PlayerOrderByInput
  where: PlayerSearchFieldsInput
}

input PlayerOrderByInput {
  order: OrderByEnum
  name: OrderByEnum
  points: OrderByEnum
}

input PlayerSearchFieldsInput {
  uuid: String
  firstName: String
  lastName: String
}

input PlayerUpdateInput {
  uuid: String!
  pic: String
  played: Int
  points: Int
  won: Int
  lost: Int
  drawed: Int
  for: Int
  against: Int
}

input PlayerDeleteInput {
  uuid: String!
}
`