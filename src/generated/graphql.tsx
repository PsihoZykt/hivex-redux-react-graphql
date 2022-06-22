import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Contact = {
  __typename?: 'Contact';
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type ContactInput = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type Friend = {
  __typename?: 'Friend';
  age?: Maybe<Scalars['Int']>;
  contacts?: Maybe<Array<Maybe<Contact>>>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['ID']>;
  language?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type FriendInput = {
  age?: InputMaybe<Scalars['Int']>;
  contacts?: InputMaybe<Array<InputMaybe<ContactInput>>>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  language?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export type Mutation = {
  __typename?: 'Mutation';
  addFriend?: Maybe<Friend>;
  addSeries?: Maybe<Series>;
};


export type MutationAddFriendArgs = {
  friend?: InputMaybe<FriendInput>;
};


export type MutationAddSeriesArgs = {
  series?: InputMaybe<SeriesInput>;
};

export type Query = {
  __typename?: 'Query';
  findAFriend?: Maybe<Friend>;
  findASeries?: Maybe<Series>;
  getFriends?: Maybe<Array<Maybe<Friend>>>;
  getSeries?: Maybe<Array<Maybe<Series>>>;
};


export type QueryFindAFriendArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryFindASeriesArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export enum Rating {
  One = 'ONE',
  Three = 'THREE',
  Two = 'TWO'
}

export type Series = {
  __typename?: 'Series';
  id?: Maybe<Scalars['ID']>;
  rating?: Maybe<Rating>;
  seriesName?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
};

export type SeriesInput = {
  rating?: InputMaybe<Rating>;
  seriesName?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};

export type FriendQueryVariables = Exact<{ [key: string]: never; }>;


export type FriendQuery = { __typename?: 'Query', getFriends?: Array<{ __typename?: 'Friend', lastName?: string | null } | null> | null };


export const FriendDocument = gql`
    query Friend {
  getFriends {
    lastName
  }
}
    `;

/**
 * __useFriendQuery__
 *
 * To run a query within a React component, call `useFriendQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendQuery({
 *   variables: {
 *   },
 * });
 */
export function useFriendQuery(baseOptions?: Apollo.QueryHookOptions<FriendQuery, FriendQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FriendQuery, FriendQueryVariables>(FriendDocument, options);
      }
export function useFriendLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendQuery, FriendQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FriendQuery, FriendQueryVariables>(FriendDocument, options);
        }
export type FriendQueryHookResult = ReturnType<typeof useFriendQuery>;
export type FriendLazyQueryHookResult = ReturnType<typeof useFriendLazyQuery>;
export type FriendQueryResult = Apollo.QueryResult<FriendQuery, FriendQueryVariables>;