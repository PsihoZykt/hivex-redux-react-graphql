import {GraphQLUserFieldType} from "types/EntityTypes/GraphQLUserFieldType";
import {GraphQLCurrencyFieldType} from "types/EntityTypes/GraphQLCurrencyFieldType";
import {GraphQLMentorFieldType} from "types/EntityTypes/GraphQLMentorFieldType";
import {GraphQLProjectFieldType} from "types/EntityTypes/GraphQLProjectFieldType";
import {GraphQLProxyFieldType} from "types/EntityTypes/GraphQLProxyFieldType";
import {GraphQLRequestFieldType} from "types/EntityTypes/GraphQLRequestFieldType";

enum ProjectStatus {
  OPEN = "open",
  ACTIVE = "active",
  CLOSED = "closed",
}

enum Level {
  JUNIOR = "junior",
  MIDDLE = "middle",
  SENIOR = "senior"
}

export type UserType = {
  _id: String,
  name: String,
  salary: number,
  workDuration: number,
  level: Level,
  techStack: String,
  timeStamp: number,
  project: ProjectType
  proxy: ProxyType
}
export type ProjectType = {
  _id: String,
  name: String,
  country: String,
  duration: number,
  timestamp: number,
  techStack: String,
  status: ProjectStatus,
  mentor: MentorType
}
export type ProxyType = {
  _id: String,
  name: String,
  country: String,
  timestamp: number,
  bank: String,
  currency: CurrencyType
}
export type RequestType = {
  _id: String,
  request: String,
  response: String,
  createdAt: Date
}
export type MentorType = {
  _id: String,
  name: String,
  level: Level,
  workDuration: number,
  salary: number,
  country: String,
  timestamp: number,
  techStack: String
}
export type CurrencyType = {
  _id: String,
  name: String,
  code: String
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


