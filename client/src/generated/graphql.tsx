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
};

export type Contact = {
  __typename?: 'Contact';
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type Currency = {
  __typename?: 'Currency';
  code?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type CurrencyInput = {
  code?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export enum Level {
  Junior = 'junior',
  Middle = 'middle',
  Senior = 'senior'
}

export type Mentor = {
  __typename?: 'Mentor';
  country?: Maybe<Scalars['String']>;
  level?: Maybe<Level>;
  name?: Maybe<Scalars['String']>;
  salary?: Maybe<Scalars['Int']>;
  techStack?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Int']>;
  workDuration?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCurrency?: Maybe<Currency>;
  addUser?: Maybe<User>;
};


export type MutationAddCurrencyArgs = {
  currencies?: InputMaybe<CurrencyInput>;
};


export type MutationAddUserArgs = {
  users?: InputMaybe<UserInput>;
};

export type Project = {
  __typename?: 'Project';
  country?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  mentor?: Maybe<Mentor>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<ProjectStatus>;
  techStack?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Int']>;
  worker?: Maybe<User>;
};

export type ProjectInput = {
  country?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  mentor?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<ProjectStatus>;
  techStack?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Int']>;
  worker?: InputMaybe<Scalars['String']>;
};

export enum ProjectStatus {
  Active = 'active',
  Closed = 'closed',
  Open = 'open'
}

export type Proxy = {
  __typename?: 'Proxy';
  bank?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  currency?: Maybe<Currency>;
  name?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  getCurrencies?: Maybe<Array<Maybe<Currency>>>;
  getMentors?: Maybe<Array<Maybe<Mentor>>>;
  getProject?: Maybe<Array<Maybe<Project>>>;
  getProxies?: Maybe<Array<Maybe<Proxy>>>;
  getUsers?: Maybe<Array<Maybe<User>>>;
};

export enum Role {
  Mentor = 'mentor',
  Worker = 'worker'
}

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  project?: Maybe<Project>;
  proxy?: Maybe<Proxy>;
  role?: Maybe<Role>;
  salary?: Maybe<Scalars['Int']>;
  techStack?: Maybe<Scalars['String']>;
  timeStamp?: Maybe<Scalars['Int']>;
  workDuration?: Maybe<Scalars['Int']>;
};

export type UserInput = {
  level?: InputMaybe<Level>;
  name?: InputMaybe<Scalars['String']>;
  project?: InputMaybe<ProjectInput>;
  proxy?: InputMaybe<Scalars['String']>;
  salary?: InputMaybe<Scalars['Int']>;
  techStack?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Int']>;
  workDuration?: InputMaybe<Scalars['Int']>;
};

export type ExampleQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ExampleQueryQuery = { __typename?: 'Query', getProject?: Array<{ __typename?: 'Project', name?: string | null, worker?: { __typename?: 'User', name?: string | null, role?: Role | null, project?: { __typename?: 'Project', mentor?: { __typename?: 'Mentor', techStack?: string | null } | null } | null } | null } | null> | null };

export type CurrencyMutationVariables = Exact<{
  currencies?: InputMaybe<CurrencyInput>;
}>;


export type CurrencyMutation = { __typename?: 'Mutation', addCurrency?: { __typename?: 'Currency', name?: string | null, code?: string | null } | null };


export const ExampleQueryDocument = gql`
    query ExampleQuery {
  getProject {
    name
    worker {
      name
      role
      project {
        mentor {
          techStack
        }
      }
    }
  }
}
    `;

/**
 * __useExampleQueryQuery__
 *
 * To run a query within a React component, call `useExampleQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useExampleQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExampleQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useExampleQueryQuery(baseOptions?: Apollo.QueryHookOptions<ExampleQueryQuery, ExampleQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExampleQueryQuery, ExampleQueryQueryVariables>(ExampleQueryDocument, options);
      }
export function useExampleQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExampleQueryQuery, ExampleQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExampleQueryQuery, ExampleQueryQueryVariables>(ExampleQueryDocument, options);
        }
export type ExampleQueryQueryHookResult = ReturnType<typeof useExampleQueryQuery>;
export type ExampleQueryLazyQueryHookResult = ReturnType<typeof useExampleQueryLazyQuery>;
export type ExampleQueryQueryResult = Apollo.QueryResult<ExampleQueryQuery, ExampleQueryQueryVariables>;
export const CurrencyDocument = gql`
    mutation Currency($currencies: CurrencyInput) {
  addCurrency(currencies: $currencies) {
    name
    code
  }
}
    `;
export type CurrencyMutationFn = Apollo.MutationFunction<CurrencyMutation, CurrencyMutationVariables>;

/**
 * __useCurrencyMutation__
 *
 * To run a mutation, you first call `useCurrencyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCurrencyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [currencyMutation, { data, loading, error }] = useCurrencyMutation({
 *   variables: {
 *      currencies: // value for 'currencies'
 *   },
 * });
 */
export function useCurrencyMutation(baseOptions?: Apollo.MutationHookOptions<CurrencyMutation, CurrencyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CurrencyMutation, CurrencyMutationVariables>(CurrencyDocument, options);
      }
export type CurrencyMutationHookResult = ReturnType<typeof useCurrencyMutation>;
export type CurrencyMutationResult = Apollo.MutationResult<CurrencyMutation>;
export type CurrencyMutationOptions = Apollo.BaseMutationOptions<CurrencyMutation, CurrencyMutationVariables>;