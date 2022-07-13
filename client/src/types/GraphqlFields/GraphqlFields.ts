// oh boy don't do this https://stackoverflow.com/questions/55127004/how-to-transform-union-type-to-tuple-type
// Convert Type to tuple
import {GraphQLUserFieldType} from "types/EntityTypes/GraphQLUserFieldType";
import {GraphQLCurrencyFieldType} from "types/EntityTypes/GraphQLCurrencyFieldType";
import {GraphQLProjectFieldType} from "types/EntityTypes/GraphQLProjectFieldType";
import {GraphQLProxyFieldType} from "types/EntityTypes/GraphQLProxyFieldType";
import {GraphQLMentorFieldType} from "types/EntityTypes/GraphQLMentorFieldType";
import {GraphQLRequestFieldType} from "types/EntityTypes/GraphQLRequestFieldType";

type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
type LastOf<T> =
  UnionToIntersection<T extends any ? () => T : never> extends () => (infer R) ? R : never
type Push<T extends any[], V> = [...T, V];
type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> =
  true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>

// Convert Entity field types to Tuple, so we can use these tuples in fields-validation with autocomplete from ts
type GraphQLUseFieldTypeTuple = TuplifyUnion<GraphQLUserFieldType>;
type GraphQLCurrencyFieldTypeTuple = TuplifyUnion<GraphQLCurrencyFieldType>
type GraphQLProjectsFieldTypeTuple = TuplifyUnion<GraphQLProjectFieldType>
type GraphQLProxiesFieldTypeTuple = TuplifyUnion<GraphQLProxyFieldType>
type GraphQLMentorsFieldTypeTuple = TuplifyUnion<GraphQLMentorFieldType>
type GraphQLRequestsFieldTypeTuple = TuplifyUnion<GraphQLRequestFieldType>

// There is a bug, at least in my web storm, when arrays below are correct, but still
// underlined as errors, it's ok, check link on the top, close\open file usually helps
// Doesn't work correct, if entity types contain strings
export const currencyFields: GraphQLCurrencyFieldTypeTuple = ["_id", "name", "code"]
export const userFields: GraphQLUseFieldTypeTuple = ["email", "_id", "name", "salary", "workDuration", "level", "techStack", "timeStamp", "project{_id}",
  "project{name}", "project{techStack}", "project{country}", "project{duration}",
  "project{timestamp}", "project{status}", "project{mentor{_id}}", "project{mentor{name}}",
  "project{mentor{salary}}", "project{mentor{workDuration}}", "project{mentor{level}}",
  "project{mentor{techStack}}", "project{mentor{country}}", "project{mentor{timestamp}}"]
export const projectFields: GraphQLProjectsFieldTypeTuple = ["_id", "name", "techStack", "country", "duration", "timestamp",
  "status", "mentor{_id}", "mentor{name}", "mentor{salary}", "mentor{workDuration}", "mentor{level}", "mentor{techStack}", "mentor{country}", "mentor{timestamp}"]
export const proxyFields: GraphQLProxiesFieldTypeTuple = ["_id", "name", "country", "timestamp", "bank", "currency{_id}", "currency{name}", "currency{code}"]
export const mentorFields: GraphQLMentorsFieldTypeTuple = ["_id", "name", "salary", "workDuration", "level", "techStack", "country", "timestamp"]
export const requestFields: GraphQLRequestsFieldTypeTuple = ["_id", "request", "response", "createdAt"]
