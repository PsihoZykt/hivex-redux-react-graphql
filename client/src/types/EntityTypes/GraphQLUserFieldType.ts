// Get a type, where all keys have a "project." prefix, we need this type because
// GraphQL fields looks like "project.name"
import {MentorKeys, ProjectKeys, UserKeys} from "types/EntityTypes/EntityTypes";

type WithProjectChange<T> = { [P in T & string as `project{${P}}`]: P };
// type WithMentorChange<T> = { [P in keyof T & string as `project{mentor{${P}}}`]: T[P] };
type WithMentorChange<T> = { [P in T & string as `project{mentor{${P}}}`]: P };

type GraphQLProjectKeys = WithProjectChange<ProjectKeys>
export type GraphQLMentorKeys = WithMentorChange<MentorKeys>


type ProjectDottedFieldType = keyof GraphQLProjectKeys
type MentorDottedFieldType = keyof GraphQLMentorKeys
export type GraphQLUserFieldType =
  UserKeys |
  ProjectDottedFieldType |
  MentorDottedFieldType


