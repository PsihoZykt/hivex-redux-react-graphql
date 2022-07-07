import {CommandNames, CommandType} from "components/ConsolePage/Footer/Commands/CommandTypes";
import {
  getAddEntityMutation,
  getDeleteEntityMutation,
  getQuery,
  getUpdateEntityMutation
} from "helpers/graphql/graphqlHelper";
import {GraphQLUserFieldType} from "types/EntityTypes/GraphQLUserFieldType";
import {GraphQLCurrencyFieldType} from "types/EntityTypes/GraphQLCurrencyFieldType";
import {GraphQLProjectFieldType} from "types/EntityTypes/GraphQLProjectFieldType";
import {GraphQLProxyFieldType} from "types/EntityTypes/GraphQLProxyFieldType";
import {GraphQLMentorFieldType} from "types/EntityTypes/GraphQLMentorFieldType";
import {GraphQLRequestFieldType} from "types/EntityTypes/GraphQLRequestFieldType";

export const validateRequest = (request: String) => {
  let response = ""
  const requestParts = request.split(' ')
  let prefix = requestParts[0] as "hivex";
  let commandName = requestParts[1] as unknown as CommandNames
  let valuesKey = requestParts[2] as "-values"
  let command: CommandType = {
    prefix, commandName, valuesKey,
  }
  let error = ""
  if (command.prefix !== "hivex") {
    error += "Command should start with hivex \n"
  }
  let requestCommandName = Object.values(CommandNames).find(e => {
    return command.commandName === e
  })
  if (!requestCommandName) {
    error += "Command is not supported \n"
  }
  if (command.valuesKey !== "-values") {
    error += "Write -values after command name \n"
  }
  let query: any
  if (command.commandName?.includes("add")) {
    query = getAddEntityMutation(request)
  } else if (command.commandName?.includes("update")) {
    query = getUpdateEntityMutation(request)
  } else if (command.commandName?.includes("delete")) {
    query = getDeleteEntityMutation(request)
  } else if (command.commandName?.includes(("get"))) {
     query = getQuery(request)
  }
  if (!query?.fields) {
    error += "Write some fields after -values \n"
  }
// oh boy don't do this https://stackoverflow.com/questions/55127004/how-to-transform-union-type-to-tuple-type
  // Convert Type to tuple
  type UnionToIntersection<U> =
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
  type LastOf<T> =
    UnionToIntersection<T extends any ? () => T : never> extends () => (infer R) ? R : never
  type Push<T extends any[], V> = [...T, V];
  type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> =
    true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>
  type GraphQLUseFieldTypeTuple = TuplifyUnion<GraphQLUserFieldType>; // ["a", "b", "c"]
  let userFields: GraphQLUseFieldTypeTuple = ["_id", "name", "salary", "workDuration", "level", "techStack", "timeStamp", "project{_id}",
    "project{name}", "project{techStack}", "project{country}", "project{duration}",
    "project{timestamp}", "project{status}", "project{mentor{_id}}", "project{mentor{name}}",
    "project{mentor{salary}}", "project{mentor{workDuration}}", "project{mentor{level}}", "project{mentor{techStack}}", "project{mentor{country}}", "project{mentor{timestamp}}"]
  type GraphQLCurrencyFieldTypeTuple = TuplifyUnion<GraphQLCurrencyFieldType>
  let currencyFields: GraphQLCurrencyFieldTypeTuple = ["_id", "name", "code"]
  type GraphQLProjectsFieldTypeTuple = TuplifyUnion<GraphQLProjectFieldType>
  let projectFields: GraphQLProjectsFieldTypeTuple = ["_id", "name", "techStack", "country", "duration", "timestamp",
    "status", "mentor{_id}", "mentor{name}", "mentor{salary}", "mentor{workDuration}", "mentor{level}", "mentor{techStack}", "mentor{country}", "mentor{timestamp}"]
  type GraphQLProxiesFieldTypeTuple = TuplifyUnion<GraphQLProxyFieldType>
  let proxyFields: GraphQLProxiesFieldTypeTuple = ["_id", "name", "country", "timestamp", "bank", "currency{_id}", "currency{name}", "currency{code}"]

  type GraphQLMentorsFieldTypeTuple = TuplifyUnion<GraphQLMentorFieldType>
  let mentorFields: GraphQLMentorsFieldTypeTuple = ["_id", "name", "salary", "workDuration", "level", "techStack", "country", "timestamp"]
  type GraphQLRequestsFieldTypeTuple = TuplifyUnion<GraphQLRequestFieldType>
  let requestFields: GraphQLRequestsFieldTypeTuple = ["_id", "request", "response", "createdAt"]
  // TODO Короче доделать проверку, посмотреть нужно ли эни в юзерс типах, пофиксить футер где ругается на наллы

  let commandNames = Object.values(CommandNames)
  commandNames.forEach(e => {
    if (command.commandName === e) {
      if (command.commandName.includes("user") || command.commandName.includes("users")) {
        query?.fields.forEach((field:any) => {
          if (!userFields.includes(field as GraphQLUserFieldType)) error += `User entity doesn't support ${field} field`
        })

      } else if (command.commandName.includes("currency") || command.commandName.includes("currencies")) {
        query?.fields.forEach((field:any) => {
          if (!currencyFields.includes(field as GraphQLCurrencyFieldType)) error += `Currency entity doesn't support ${field} field`
        })

      } else if (command.commandName.includes("mentor")) {
        query?.fields.forEach((field:any)=> {
          if (!mentorFields.includes(field as GraphQLMentorFieldType)) error += `Mentor entity doesn't support ${field} field`
        })
      } else if (command.commandName.includes("project")) {
        query?.fields.forEach((field:any) => {
          if (!projectFields.includes(field as GraphQLProjectFieldType)) error += `Project entity doesn't support ${field} field`
        })

      } else if (command.commandName.includes("proxy") || command.commandName.includes("proxies")) {
        query?.fields.forEach((field:any) => {
          if (!proxyFields.includes(field as GraphQLProxyFieldType)) error += `Proxy entity doesn't support ${field} field`
        })
      } else if (command.commandName.includes("request")) {
        query?.fields.forEach((field:any) => {
          if (!requestFields.includes(field as GraphQLRequestFieldType)) error += `Request entity doesn't support ${field} field`
        })
      }


    }
  })
  return error


}