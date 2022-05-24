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
  player1?: Maybe<Player>;
  player2?: Maybe<Player>;
  round: Scalars['Int'];
  score1?: Maybe<Scalars['Int']>;
  score2?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['Date'];
  uuid: Scalars['String'];
}

export enum MatchResult {
  DRAWED = 'DRAWED',
  LOST = 'LOST',
  WON = 'WON'
}

export interface MatchUpdateScoreInput {
  score1: Scalars['Int'];
  score2: Scalars['Int'];
  uuid: Scalars['String'];
}

export interface Mutation {
  matchUpdateScore: Scalars['Boolean'];
  mockCreateDefault: Scalars['Boolean'];
}


export type MutationmatchUpdateScoreArgs = {
  input: MatchUpdateScoreInput;
};

export enum OrderByEnum {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface Player {
  against: Scalars['Int'];
  diff?: Maybe<Scalars['Int']>;
  drawed: Scalars['Int'];
  for: Scalars['Int'];
  lost: Scalars['Int'];
  matches?: Maybe<Array<Match>>;
  name: Scalars['String'];
  played: Scalars['Int'];
  points: Scalars['Int'];
  rank?: Maybe<Scalars['Int']>;
  streak?: Maybe<Array<MatchResult>>;
  uuid: Scalars['String'];
  won: Scalars['Int'];
}

export interface PlayerFindOneInput {
  where?: InputMaybe<PlayerSearchFieldsInput>;
}

export interface PlayerSearchFieldsInput {
  uuid?: InputMaybe<Scalars['String']>;
}

export interface Query {
  matchGetCalendar: Array<Array<Match>>;
  playerFindOne?: Maybe<Player>;
  playerGetLeaderboard: Array<Player>;
}


export type QueryplayerFindOneArgs = {
  input: PlayerFindOneInput;
};

export type FMatchFragment = { uuid: string, round: number, score1?: number | null | undefined, score2?: number | null | undefined, player1?: { uuid: string, name: string, rank?: number | null | undefined } | null | undefined, player2?: { uuid: string, name: string, rank?: number | null | undefined } | null | undefined };

export type MatchGetCalendarQueryVariables = Exact<{ [key: string]: never; }>;


export type MatchGetCalendarQuery = { matchGetCalendar: Array<Array<{ uuid: string, round: number, score1?: number | null | undefined, score2?: number | null | undefined, player1?: { uuid: string, name: string, rank?: number | null | undefined } | null | undefined, player2?: { uuid: string, name: string, rank?: number | null | undefined } | null | undefined }>> };

export type MatchUpdateScoreMutationVariables = Exact<{
  input: MatchUpdateScoreInput;
}>;


export type MatchUpdateScoreMutation = { matchUpdateScore: boolean };

export type MockCreateDefaultMutationVariables = Exact<{ [key: string]: never; }>;


export type MockCreateDefaultMutation = { mockCreateDefault: boolean };

export type FPlayerFragment = { uuid: string, name: string, points: number, rank?: number | null | undefined, played: number, won: number, lost: number, drawed: number, for: number, against: number, diff?: number | null | undefined, streak?: Array<MatchResult> | null | undefined, matches?: Array<{ uuid: string, round: number, score1?: number | null | undefined, score2?: number | null | undefined, player1?: { uuid: string, name: string, rank?: number | null | undefined } | null | undefined, player2?: { uuid: string, name: string, rank?: number | null | undefined } | null | undefined }> | null | undefined };

export type FPlayerForLeaderboardFragment = { uuid: string, name: string, points: number, rank?: number | null | undefined, played: number, won: number, lost: number, drawed: number, for: number, against: number, diff?: number | null | undefined, streak?: Array<MatchResult> | null | undefined };

export type PlayerFindOneQueryVariables = Exact<{
  input: PlayerFindOneInput;
}>;


export type PlayerFindOneQuery = { playerFindOne?: { uuid: string, name: string, points: number, rank?: number | null | undefined, played: number, won: number, lost: number, drawed: number, for: number, against: number, diff?: number | null | undefined, streak?: Array<MatchResult> | null | undefined, matches?: Array<{ uuid: string, round: number, score1?: number | null | undefined, score2?: number | null | undefined, player1?: { uuid: string, name: string, rank?: number | null | undefined } | null | undefined, player2?: { uuid: string, name: string, rank?: number | null | undefined } | null | undefined }> | null | undefined } | null | undefined };

export type PlayerGetLeaderboardQueryVariables = Exact<{ [key: string]: never; }>;


export type PlayerGetLeaderboardQuery = { playerGetLeaderboard: Array<{ uuid: string, name: string, points: number, rank?: number | null | undefined, played: number, won: number, lost: number, drawed: number, for: number, against: number, diff?: number | null | undefined, streak?: Array<MatchResult> | null | undefined }> };

export const FMatchFragmentDoc = gql`
    fragment FMatch on Match {
  uuid
  round
  player1 {
    uuid
    name
    rank
  }
  player2 {
    uuid
    name
    rank
  }
  score1
  score2
}
    `;
export const FPlayerFragmentDoc = gql`
    fragment FPlayer on Player {
  uuid
  name
  points
  rank
  played
  won
  lost
  drawed
  for
  against
  diff
  streak
  matches {
    uuid
    round
    player1 {
      uuid
      name
      rank
    }
    player2 {
      uuid
      name
      rank
    }
    score1
    score2
  }
}
    `;
export const FPlayerForLeaderboardFragmentDoc = gql`
    fragment FPlayerForLeaderboard on Player {
  uuid
  name
  points
  rank
  played
  won
  lost
  drawed
  for
  against
  diff
  streak
}
    `;
export const MatchGetCalendarDocument = gql`
    query MatchGetCalendar {
  matchGetCalendar {
    ...FMatch
  }
}
    ${FMatchFragmentDoc}`;
export const MatchUpdateScoreDocument = gql`
    mutation MatchUpdateScore($input: MatchUpdateScoreInput!) {
  matchUpdateScore(input: $input)
}
    `;
export const MockCreateDefaultDocument = gql`
    mutation MockCreateDefault {
  mockCreateDefault
}
    `;
export const PlayerFindOneDocument = gql`
    query PlayerFindOne($input: PlayerFindOneInput!) {
  playerFindOne(input: $input) {
    ...FPlayer
  }
}
    ${FPlayerFragmentDoc}`;
export const PlayerGetLeaderboardDocument = gql`
    query PlayerGetLeaderboard {
  playerGetLeaderboard {
    ...FPlayerForLeaderboard
  }
}
    ${FPlayerForLeaderboardFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    MatchGetCalendar(variables?: MatchGetCalendarQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MatchGetCalendarQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MatchGetCalendarQuery>(MatchGetCalendarDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'MatchGetCalendar');
    },
    MatchUpdateScore(variables: MatchUpdateScoreMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MatchUpdateScoreMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<MatchUpdateScoreMutation>(MatchUpdateScoreDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'MatchUpdateScore');
    },
    MockCreateDefault(variables?: MockCreateDefaultMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MockCreateDefaultMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<MockCreateDefaultMutation>(MockCreateDefaultDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'MockCreateDefault');
    },
    PlayerFindOne(variables: PlayerFindOneQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PlayerFindOneQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PlayerFindOneQuery>(PlayerFindOneDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PlayerFindOne');
    },
    PlayerGetLeaderboard(variables?: PlayerGetLeaderboardQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PlayerGetLeaderboardQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PlayerGetLeaderboardQuery>(PlayerGetLeaderboardDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PlayerGetLeaderboard');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;