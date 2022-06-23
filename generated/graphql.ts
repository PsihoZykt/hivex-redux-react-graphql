import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
import { ObjectId } from 'mongodb';
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
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
