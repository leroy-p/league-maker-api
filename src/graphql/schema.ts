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

export interface Mutation {
  playerCreateOne: Player;
  playerDeleteOne: Scalars['Boolean'];
  playerUpdateOne: Player;
}


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
  name: Scalars['String'];
  uuid: Scalars['String'];
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
}

export interface PlayerSearchFieldsInput {
  name?: InputMaybe<Scalars['String']>;
  uuid?: InputMaybe<Scalars['String']>;
}

export interface PlayerUpdateInput {
  name?: InputMaybe<Scalars['String']>;
  uuid: Scalars['String'];
}

export interface Query {
  playerFindMany: Array<Maybe<Player>>;
  playerFindOne?: Maybe<Player>;
}


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