import {CommandNames, CommandType, Fields} from "types/CommandTypes";
import {
  getAddEntityMutation,
  getDeleteEntityMutation,
  getQuery,
  getUpdateEntityMutation,
  getValues
} from "helpers/graphql/graphqlHelper";
import {GraphQLUserFieldType} from "types/EntityTypes/GraphQLUserFieldType";
import {GraphQLCurrencyFieldType} from "types/EntityTypes/GraphQLCurrencyFieldType";
import {GraphQLMentorFieldType} from "types/EntityTypes/GraphQLMentorFieldType";
import {GraphQLProjectFieldType} from "types/EntityTypes/GraphQLProjectFieldType";
import {GraphQLProxyFieldType} from "types/EntityTypes/GraphQLProxyFieldType";
import {GraphQLRequestFieldType} from "types/EntityTypes/GraphQLRequestFieldType";
import {GraphqlAnyEntityFieldType} from "types/EntityTypes/EntityTypes";

export const runRequestGraphql = async (request: String, graphql: any, setQueryFieldsArr: React.Dispatch<React.SetStateAction<GraphqlAnyEntityFieldType[]>>) => {
  const requestParts = request.split(' ')
  let prefix = requestParts[0] as "hivex";
  let commandName = requestParts[1] as unknown as CommandNames
  let valuesKey = requestParts[2] as "-values"
  let command: CommandType = {
    prefix, commandName, valuesKey,
  }
  if (command.prefix === "hivex") {
    switch (command.commandName) {
      case CommandNames.GET_FIELDS: {
        const fields = getValues(request)
        if (fields?.includes(Fields.PROJECTS)) {
          await graphql.getProjectFields.exec()
        }
        else if (fields?.includes(Fields.USERS)) {
          await graphql.getUserFields.exec()
        }
        else if (fields?.includes(Fields.CURRENCIES)) {
          await graphql.getCurrencyFields.exec()
        }
        else if (fields?.includes(Fields.PROXIES)) {
          await graphql.getProxyFields.exec()
        }
        else if (fields?.includes(Fields.REQUESTS)) {
          await graphql.getRequestFields.exec()
        }
       else if (fields?.includes(Fields.MENTORS)) {
          await graphql.getMentorFields.exec()
        }
        break;
      }
      case CommandNames.GET_USERS: {
        const query = getQuery<GraphQLUserFieldType>(request)
        setQueryFieldsArr(query!.fields)
        await graphql.getUsers.exec({variables: {input: query?.filter}})
        break;
      }
      case CommandNames.GET_CURRENCIES: {
        const query = getQuery<GraphQLCurrencyFieldType>(request)
        setQueryFieldsArr(query!.fields)
        await graphql.getCurrencies.exec({variables: {input: query?.filter}})
        break;
      }
      case CommandNames.GET_MENTORS: {
        const query = getQuery<GraphQLMentorFieldType>(request)
        setQueryFieldsArr(query!.fields)
        await graphql.getMentors.exec({variables: {input: query?.filter}})
        break;
      }
      case CommandNames.GET_PROJECTS: {
        const query = getQuery<GraphQLProjectFieldType>(request)
        setQueryFieldsArr(query!.fields)
        await graphql.getProjects.exec({variables: {input: query?.filter}})
        break;
      }
      case CommandNames.GET_PROXIES: {
        const query = getQuery<GraphQLProxyFieldType>(request)
        setQueryFieldsArr(query!.fields)
        await graphql.getProxies.exec({variables: {input: query?.filter}})
        break;
      }
      case CommandNames.GET_REQUESTS: {
        const query = getQuery<GraphQLRequestFieldType>(request)
        setQueryFieldsArr(query!.fields)
        await graphql.getRequests.exec({variables: {input: query?.filter}})
        break;
      }
      case CommandNames.ADD_USER: {
        const mutation = getAddEntityMutation<GraphQLUserFieldType>(request)
        await graphql.addUser.exec({variables: {input: mutation?.filter}})
        break;
      }
      case CommandNames.ADD_CURRENCY: {
        const mutation = getAddEntityMutation<GraphQLCurrencyFieldType>(request)
        await graphql.addCurrency.exec({variables: {input: mutation?.filter}})
        break;
      }
      case CommandNames.ADD_MENTOR: {
        const mutation = getAddEntityMutation<GraphQLMentorFieldType>(request)
        await graphql.addMentor.exec({variables: {input: mutation?.filter}})
        break;
      }
      case CommandNames.ADD_PROJECT: {
        const mutation = getAddEntityMutation<GraphQLProjectFieldType>(request)
        await graphql.addProject.exec({variables: {input: mutation?.filter}})
        break;
      }
      case CommandNames.ADD_PROXY: {
        const mutation = getAddEntityMutation<GraphQLProxyFieldType>(request)
        await graphql.addProxy.exec({variables: {input: mutation?.filter}})
        break;
      }
      case CommandNames.ADD_REQUEST: {
        const mutation = getAddEntityMutation<GraphQLRequestFieldType>(request)
        await graphql.addRequest.exec({variables: {input: mutation?.filter}})
        break;
      }
      case CommandNames.DELETE_USERS: {
        const mutation = getDeleteEntityMutation<GraphQLUserFieldType>(request)
        await graphql.deleteUsers.exec({variables: {input: mutation?.filter}})
        break;
      }
      case CommandNames.DELETE_CURRENCIES: {
        const mutation = getDeleteEntityMutation<GraphQLCurrencyFieldType>(request)
        await graphql.deleteCurrencies.exec({variables: {input: mutation?.filter}})
        break;
      }
      case CommandNames.DELETE_MENTORS: {
        const mutation = getDeleteEntityMutation<GraphQLMentorFieldType>(request)
        await graphql.deleteMentors.exec({variables: {input: mutation?.filter}})
        break;
      }
      case CommandNames.DELETE_PROJECTS: {
        const mutation = getDeleteEntityMutation<GraphQLProjectFieldType>(request)
        await graphql.deleteProjects.exec({variables: {input: mutation?.filter}})
        break;
      }
      case CommandNames.DELETE_PROXIES: {
        const mutation = getDeleteEntityMutation<GraphQLProxyFieldType>(request)
        await graphql.deleteProxies.exec({variables: {input: mutation?.filter}})
        break;
      }
      case CommandNames.DELETE_REQUESTS: {
        const mutation = getDeleteEntityMutation<GraphQLRequestFieldType>(request)
        await graphql.deleteRequests.exec({variables: {input: mutation?.filter}})
        break;
      }
      case CommandNames.UPDATE_USERS: {
        let mutation = getUpdateEntityMutation<GraphQLUserFieldType>(request)
        await graphql.updateUsers.exec({variables: {input: {filter: mutation?.filter, set: mutation?.set}}})
        break;
      }
      case CommandNames.UPDATE_MENTORS: {
        let mutation = getUpdateEntityMutation<GraphQLMentorFieldType>(request)
        await graphql.updateMentors.exec({variables: {input: {filter: mutation?.filter, set: mutation?.set}}})
        break;
      }
      case CommandNames.UPDATE_PROJECTS: {
        let mutation = getUpdateEntityMutation<GraphQLProjectFieldType>(request)
        await graphql.updateProjects.exec({variables: {input: {filter: mutation?.filter, set: mutation?.set}}})
        break;
      }
      case CommandNames.UPDATE_PROXIES: {
        let mutation = getUpdateEntityMutation<GraphQLProxyFieldType>(request)
        await graphql.updateProxies.exec({variables: {input: {filter: mutation?.filter, set: mutation?.set}}})
        break;
      }
      case CommandNames.UPDATE_REQUESTS: {
        let mutation = getUpdateEntityMutation<GraphQLRequestFieldType>(request)
        await graphql.updateRequests.exec({variables: {input: {filter: mutation?.filter, set: mutation?.set}}})
        break;
      }
      case CommandNames.UPDATE_CURRENCIES: {
        let mutation = getUpdateEntityMutation<GraphQLCurrencyFieldType>(request)
        await graphql.updateCurrencies.exec({
          variables: {
            input: {
              filter: mutation?.filter,
              set: mutation?.set
            }
          }
        })
        break;
      }
      case CommandNames.SIGN_IN: {
        const mutation = getAddEntityMutation(request)
        await graphql.signIn.exec({variables: {input: mutation?.filter}})
        break;
      }
      case CommandNames.SIGN_UP: {
        const mutation = getAddEntityMutation(request)
        await graphql.signUp.exec({variables: {input: mutation?.filter}})
        break;
      }
    }
  }
}