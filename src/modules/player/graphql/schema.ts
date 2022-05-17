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
  name: OrderByEnum
}

input PlayerSearchFieldsInput {
  uuid: String
  name: String
}

input PlayerUpdateInput {
  uuid: String!
  name: String
}

input PlayerDeleteInput {
  uuid: String!
}
`