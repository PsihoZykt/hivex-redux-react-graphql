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
import {CommandNames, CommandType} from "types/CommandTypes";
import {
  currencyFields,
  mentorFields,
  projectFields,
  proxyFields,
  requestFields,
  userFields
} from "types/GraphqlFields/GraphqlFields";

export const validateRequest = (request: String) => {
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
  } else if(command.commandName?.includes("sign")){
    //TODO: sign-in/up validation
    return;
  }
  if (!query?.fields) {
    error += "Write some fields after -values \n"
  }

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