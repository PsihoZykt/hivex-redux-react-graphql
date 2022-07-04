import {MentorKeys, ProjectKeys} from "types/EntityTypes/EntityTypes";
type WithMentorChange<T> = { [P in T & string as `mentor{${P}}`]: P };
type GraphQLMentorKeys = WithMentorChange<MentorKeys>
type MentorDottedFieldType = keyof GraphQLMentorKeys

export type GraphQLProjectFieldType = ProjectKeys | MentorDottedFieldType
