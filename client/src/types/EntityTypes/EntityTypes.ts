import {GraphQLUserFieldType} from "types/EntityTypes/GraphQLUserFieldType";
import {GraphQLCurrencyFieldType} from "types/EntityTypes/GraphQLCurrencyFieldType";
import {GraphQLMentorFieldType} from "types/EntityTypes/GraphQLMentorFieldType";
import {GraphQLProjectFieldType} from "types/EntityTypes/GraphQLProjectFieldType";
import {GraphQLProxyFieldType} from "types/EntityTypes/GraphQLProxyFieldType";
import {GraphQLRequestFieldType} from "types/EntityTypes/GraphQLRequestFieldType";

export enum ProjectStatus {
  OPEN = "open",
  ACTIVE = "active",
  CLOSED = "closed",
}

export enum Level {
  JUNIOR = "junior",
  MIDDLE = "middle",
  SENIOR = "senior"
}
// Any placed with purpose! With strings it doesn't work correctly for some reasons
// When I get Keys of Types and exclude object from these types, I can't use tuplify  union from './GraphqlFields'
export interface UserType  {
  email: String | any,
  _id: String | any,
  name: String | any,
  salary: number
  workDuration: number
  level: Level
  techStack: String | any,
  timeStamp: number
  project: ProjectType
  proxy: ProxyType
}
export type ProjectType = {
  _id: String| any,
  name: String| any,
  country: String| any,
  duration: number,
  timestamp: number,
  techStack: String| any,
  status: ProjectStatus,
  mentor: MentorType
}
export type ProxyType = {
  _id: String| any,
  name: String| any,
  country: String| any,
  timestamp: number,
  bank: String| any,
  currency: CurrencyType
}
export type RequestType = {
  _id: String| any,
  request: String| any,
  response: String| any,
  createdAt: Date| any,
}
export type MentorType = {
  _id: String| any,
  name: String| any,
  level: Level
  workDuration: number
  salary: number,
  country: String| any,
  timestamp: number,
  techStack: String| any,
}
export type CurrencyType = {
  _id: String| any,
  name: String| any,
  code: String| any,
}
//Get a type which have a string, which comprises all  fields of Entity
// Exclude object-keys
type Keys_ObjectExcluded<T> =
  { [K in keyof T]: T[K] extends object ? never : K }[keyof T]
// UserKeys have all non-object keys
export type UserKeys = keyof Pick<UserType, Keys_ObjectExcluded<UserType>>
export type ProjectKeys = keyof Pick<ProjectType, Keys_ObjectExcluded<ProjectType>>
export type MentorKeys = keyof Pick<MentorType, Keys_ObjectExcluded<MentorType>>
export type CurrencyKeys = keyof CurrencyType
export type RequestKeys = keyof RequestType
export type ProxyKeys = keyof Pick<ProxyType, Keys_ObjectExcluded<ProxyType>>

export type GraphqlAnyEntityFieldType = GraphQLUserFieldType |
  GraphQLCurrencyFieldType |
  GraphQLMentorFieldType |
  GraphQLProjectFieldType |
  GraphQLProxyFieldType |
  GraphQLRequestFieldType


