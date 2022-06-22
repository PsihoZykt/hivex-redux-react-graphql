export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
