import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export enum LanguageCode {
  en = 'en',
  fr = 'fr'
}

export interface Match {
  createdAt: Scalars['Date'];
  player1?: Maybe<Player>;
  player2?: Maybe<Player>;
  round: Scalars['Int'];
  score1?: Maybe<Scalars['Int']>;
  score2?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['Date'];
  uuid: Scalars['String'];
}

export interface MatchCreateInput {
  player1Uuid: Scalars['String'];
  player2Uuid: Scalars['String'];
  round: Scalars['Int'];
}

export interface MatchDeleteInput {
  uuid: Scalars['String'];
}

export interface MatchFindManyInput {
  order?: InputMaybe<MatchOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MatchSearchFieldsInput>;
}

export interface MatchFindOneInput {
  where?: InputMaybe<MatchSearchFieldsInput>;
}

export interface MatchOrderByInput {
  round?: InputMaybe<OrderByEnum>;
}

export interface MatchSearchFieldsInput {
  player1Uuid?: InputMaybe<Scalars['String']>;
  player2Uuid?: InputMaybe<Scalars['String']>;
  round?: InputMaybe<Scalars['Int']>;
  uuid?: InputMaybe<Scalars['String']>;
}

export interface MatchUpdateInput {
  score1: Scalars['Int'];
  score2: Scalars['Int'];
  uuid: Scalars['String'];
}

export interface MatchUpdateScoreInput {
  score1: Scalars['Int'];
  score2: Scalars['Int'];
  uuid: Scalars['String'];
}

export interface Mutation {
  matchCreateOne: Match;
  matchDeleteOne: Scalars['Boolean'];
  matchDraw: Scalars['Boolean'];
  matchUpdateOne: Match;
  matchUpdateScore: Match;
  mockCreateDefault: Scalars['Boolean'];
  playerCreateOne: Player;
  playerDeleteOne: Scalars['Boolean'];
  playerUpdateOne: Player;
}


export type MutationmatchCreateOneArgs = {
  createInput: MatchCreateInput;
};


export type MutationmatchDeleteOneArgs = {
  deleteInput: MatchDeleteInput;
};


export type MutationmatchUpdateOneArgs = {
  updateInput: MatchUpdateInput;
};


export type MutationmatchUpdateScoreArgs = {
  input: MatchUpdateScoreInput;
};


export type MutationplayerCreateOneArgs = {
  createInput: PlayerCreateInput;
};


export type MutationplayerDeleteOneArgs = {
  deleteInput: PlayerDeleteInput;
};


export type MutationplayerUpdateOneArgs = {
  updateInput: PlayerUpdateInput;
};

export enum OrderByEnum {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface Player {
  against: Scalars['Int'];
  createdAt: Scalars['Date'];
  drawed: Scalars['Int'];
  for: Scalars['Int'];
  lost: Scalars['Int'];
  matches1?: Maybe<Array<Match>>;
  matches2?: Maybe<Array<Match>>;
  name: Scalars['String'];
  played: Scalars['Int'];
  points: Scalars['Int'];
  updatedAt: Scalars['Date'];
  uuid: Scalars['String'];
  won: Scalars['Int'];
}

export interface PlayerCreateInput {
  name: Scalars['String'];
}

export interface PlayerDeleteInput {
  uuid: Scalars['String'];
}

export interface PlayerFindManyInput {
  order?: InputMaybe<PlayerOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PlayerSearchFieldsInput>;
}

export interface PlayerFindOneInput {
  where?: InputMaybe<PlayerSearchFieldsInput>;
}

export interface PlayerOrderByInput {
  name?: InputMaybe<OrderByEnum>;
  order?: InputMaybe<OrderByEnum>;
  points?: InputMaybe<OrderByEnum>;
}

export interface PlayerSearchFieldsInput {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  uuid?: InputMaybe<Scalars['String']>;
}

export interface PlayerUpdateInput {
  against?: InputMaybe<Scalars['Int']>;
  drawed?: InputMaybe<Scalars['Int']>;
  for?: InputMaybe<Scalars['Int']>;
  lost?: InputMaybe<Scalars['Int']>;
  pic?: InputMaybe<Scalars['String']>;
  played?: InputMaybe<Scalars['Int']>;
  points?: InputMaybe<Scalars['Int']>;
  uuid: Scalars['String'];
  won?: InputMaybe<Scalars['Int']>;
}

export interface Query {
  matchFindMany: Array<Maybe<Match>>;
  matchFindOne?: Maybe<Match>;
  playerFindMany: Array<Maybe<Player>>;
  playerFindOne?: Maybe<Player>;
}


export type QuerymatchFindManyArgs = {
  findManyInput: MatchFindManyInput;
};


export type QuerymatchFindOneArgs = {
  findOneInput: MatchFindOneInput;
};


export type QueryplayerFindManyArgs = {
  findManyInput: PlayerFindManyInput;
};


export type QueryplayerFindOneArgs = {
  findOneInput: PlayerFindOneInput;
};



export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;