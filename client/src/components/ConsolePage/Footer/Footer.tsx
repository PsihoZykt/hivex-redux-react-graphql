import GithubLink from 'common/GithubLink/GithubLink'
import format from 'assets/img/consolePage/format.svg'
import React, {Dispatch, useState} from 'react'
import './Footer.css'
import {
  getAddEntityMutation,
  getDeleteEntityMutation,
  getQuery,
  getUpdateEntityMutation,
  getValues
} from "helpers/graphql/graphqlHelper";
import {getFormattedJSON} from "helpers/json/format";

import {GraphQLUserFieldType} from "types/EntityTypes/GraphQLUserFieldType";
import {GraphqlAnyEntityFieldType} from "types/EntityTypes/EntityTypes";
import {GraphQLCurrencyFieldType} from "types/EntityTypes/GraphQLCurrencyFieldType";
import {CommandNames, CommandType, Fields} from "components/ConsolePage/Footer/Commands/CommandTypes";
import {GraphQLMentorFieldType} from "types/EntityTypes/GraphQLMentorFieldType";
import {GraphQLProjectFieldType} from "types/EntityTypes/GraphQLProjectFieldType";
import {GraphQLProxyFieldType} from "types/EntityTypes/GraphQLProxyFieldType";
import {GraphQLRequestFieldType} from "types/EntityTypes/GraphQLRequestFieldType";
import {useGraphQL} from "components/ConsolePage/Footer/getUsers";
import {ApolloError} from "@apollo/client";

type FooterProps = {
  request: String
  setResponse: Dispatch<string>
}
// TODO: попробовать аполло девелопер штуку которая высвечивается при запуске приложения
// TODO: валлидацию реквест поля, в общем то для этого вроде все есть
export const Footer = ({request, setResponse}: FooterProps) => {
  const [queryFieldsArr, setQueryFieldsArr] = useState<GraphqlAnyEntityFieldType[]>(["name"])
  const graphql = useGraphQL(queryFieldsArr, setResponse)

  let entitiesData = [graphql.getCurrencyFields.data,
    graphql.getProjectFields.data,
    graphql.getProxyFields.data,
    graphql.getMentorFields.data,
    graphql.getUserFields.data,
    graphql.getRequestFields.data,
    graphql.getUsers.data, graphql.getCurrencies.data, graphql.getMentors.data, graphql.getProjects.data, graphql.getProxies.data, graphql.getRequests.data,
    graphql.addUser.data, graphql.addCurrency.data, graphql.addProject.data, graphql.addMentor.data, graphql.addProxy.data, graphql.addRequest.data,
    graphql.deleteUsers.data, graphql.deleteCurrencies.data, graphql.deleteMentors.data, graphql.deleteProjects.data, graphql.deleteProjects.data, graphql.deleteProxies.data, graphql.deleteRequests.data,
    graphql.updateUsers.data, graphql.updateCurrencies.data, graphql.updateMentors.data, graphql.updateProjects.data, graphql.updateProxies.data, graphql.updateRequests.data,]

  entitiesData.forEach(entity => {
    if (entity.loading) setResponse("Loading...")
    else if (entity.error) throw new ApolloError(entity.error)
  })


  const onSubmitRequest = async () => {
    let response = ""
    const requestParts = request.split(' ')
    let prefix = requestParts[0] as "hivex";
    let commandName = requestParts[1] as unknown as CommandNames
    let valuesKey = requestParts[2] as "-values"
    let command: CommandType = {
      prefix, commandName, valuesKey,
    }
    try {
      if (command.prefix === "hivex") {
        if (command.commandName === CommandNames.GET_FIELDS) {
          const fields = getValues(request)
          if (fields.includes(Fields.PROJECTS)) {
            const getProjectFields = await graphql.getProjectFields.exec()
            response += getFormattedJSON(JSON.stringify(getProjectFields.data)) + "\n"
          }
          if (fields.includes(Fields.USERS)) {
            const getUserFields = await graphql.getUserFields.exec()
            response += getFormattedJSON(JSON.stringify(getUserFields.data)) + "\n"
          }
          if (fields.includes(Fields.CURRENCIES)) {
            const getCurrenciesFields = await graphql.getCurrencyFields.exec()
            response += getFormattedJSON(JSON.stringify(getCurrenciesFields.data))
          }
          if (fields.includes(Fields.PROXIES)) {
            const getProxiesFields = await graphql.getProxyFields.exec()
            response += getFormattedJSON(JSON.stringify(getProxiesFields.data))
          }
          if (fields.includes(Fields.REQUESTS)) {
            const getRequestFields = await graphql.getRequestFields.exec()
            response += getFormattedJSON(JSON.stringify(getRequestFields.data))
          }
          if (fields.includes(Fields.MENTORS)) {
            const getMentorFields = await graphql.getMentorFields.exec()
            response += getFormattedJSON(JSON.stringify(getMentorFields.data))
          }
          await setResponse(response)
        }
        else if (command.valuesKey === "-values") {

          switch (command.commandName) {
            case CommandNames.GET_USERS: {
              const query = getQuery<GraphQLUserFieldType>(request)
              setQueryFieldsArr(query.fields)
              await graphql.getUsers.exec({variables: {input: query.filter}})
              break;
            }
            case CommandNames.GET_CURRENCIES: {
              const query = getQuery<GraphQLCurrencyFieldType>(request)
              setQueryFieldsArr(query.fields)
              await graphql.getCurrencies.exec({variables: {input: query.filter}})
              break;
            }
            case CommandNames.GET_MENTORS: {
              const query = getQuery<GraphQLMentorFieldType>(request)
              setQueryFieldsArr(query.fields)
              await graphql.getMentors.exec({variables: {input: query.filter}})
              break;
            }
            case CommandNames.GET_PROJECTS: {
              const query = getQuery<GraphQLProjectFieldType>(request)
              setQueryFieldsArr(query.fields)
              await graphql.getProjects.exec({variables: {input: query.filter}})
              break;
            }
            case CommandNames.GET_PROXIES: {
              const query = getQuery<GraphQLProxyFieldType>(request)
              setQueryFieldsArr(query.fields)
              await graphql.getProxies.exec({variables: {input: query.filter}})
              break;
            }
            case CommandNames.GET_REQUESTS: {
              const query = getQuery<GraphQLRequestFieldType>(request)
              setQueryFieldsArr(query.fields)
              await graphql.getRequests.exec({variables: {input: query.filter}})
              break;
            }
            case CommandNames.ADD_USER: {
              const mutation = getAddEntityMutation<GraphQLUserFieldType>(request)
              await graphql.addUser.exec({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.ADD_CURRENCY: {
              const mutation = getAddEntityMutation<GraphQLCurrencyFieldType>(request)
              await graphql.addCurrency.exec({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.ADD_MENTOR: {
              const mutation = getAddEntityMutation<GraphQLMentorFieldType>(request)
              await graphql.addMentor.exec({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.ADD_PROJECT: {
              const mutation = getAddEntityMutation<GraphQLProjectFieldType>(request)
              await graphql.addProject.exec({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.ADD_PROXY: {
              const mutation = getAddEntityMutation<GraphQLProxyFieldType>(request)
              await graphql.addProxy.exec({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.ADD_REQUEST: {
              const mutation = getAddEntityMutation<GraphQLRequestFieldType>(request)
              await graphql.addRequest.exec({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.DELETE_USERS: {
              const mutation = getDeleteEntityMutation<GraphQLUserFieldType>(request)
              await graphql.deleteUsers.exec({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.DELETE_CURRENCIES: {
              const mutation = getDeleteEntityMutation<GraphQLCurrencyFieldType>(request)
              await graphql.deleteCurrencies.exec({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.DELETE_MENTORS: {
              const mutation = getDeleteEntityMutation<GraphQLMentorFieldType>(request)
              await graphql.deleteMentors.exec({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.DELETE_PROJECTS: {
              const mutation = getDeleteEntityMutation<GraphQLProjectFieldType>(request)
              await graphql.deleteProjects.exec({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.DELETE_PROXIES: {
              const mutation = getDeleteEntityMutation<GraphQLProxyFieldType>(request)
              await graphql.deleteProxies.exec({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.DELETE_REQUESTS: {
              const mutation = getDeleteEntityMutation<GraphQLRequestFieldType>(request)
              await graphql.deleteRequests.exec({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.UPDATE_USERS: {
              let mutation = getUpdateEntityMutation<GraphQLUserFieldType>(request)
              await graphql.updateUsers.exec({variables: {input: {filter: mutation.filter, set: mutation.set}}})
              break;
            }
            case CommandNames.UPDATE_MENTORS: {
              let mutation = getUpdateEntityMutation<GraphQLMentorFieldType>(request)
              await graphql.updateMentors.exec({variables: {input: {filter: mutation.filter, set: mutation.set}}})
              break;
            }
            case CommandNames.UPDATE_PROJECTS: {
              let mutation = getUpdateEntityMutation<GraphQLProjectFieldType>(request)
              await graphql.updateProjects.exec({variables: {input: {filter: mutation.filter, set: mutation.set}}})
              break;
            }
            case CommandNames.UPDATE_PROXIES: {
              let mutation = getUpdateEntityMutation<GraphQLProxyFieldType>(request)
              await graphql.updateProxies.exec({variables: {input: {filter: mutation.filter, set: mutation.set}}})
              break;
            }
            case CommandNames.UPDATE_REQUESTS: {
              let mutation = getUpdateEntityMutation<GraphQLRequestFieldType>(request)
              await graphql.updateRequests.exec({variables: {input: {filter: mutation.filter, set: mutation.set}}})
              break;
            }
            case CommandNames.UPDATE_CURRENCIES: {
              let mutation = getUpdateEntityMutation<GraphQLCurrencyFieldType>(request)
              await graphql.updateCurrencies.exec({variables: {input: {filter: mutation.filter, set: mutation.set}}})
              break;
            }
          }
        }
      } else {
        setResponse(`
      Incorrect command: 
      command syntax: 
      [hivex commandName -values fieldOne -f? filterOne? | field2 -f? filterTwo?] (? means optional) 
      your command:
      ${request}
      ${command.prefix === "hivex" ? "" : "command should start with hivex"}
      ${command.commandName === CommandNames.GET_USERS || command.commandName === CommandNames.GET_FIELDS ? "" : `Incorrect commandName. Supported commands are: ${CommandNames.GET_USERS}, ${CommandNames.GET_FIELDS}`}
      ${command.valuesKey === "-values" ? "" : "Write -values after commandName"}
      `)
      }
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <div className="footer">
      <button
        onClick={() => onSubmitRequest()}
        className="footer__submit"
      >
        Отправить
      </button>
      <GithubLink/>
      <div
        tabIndex={0}
        className="footer__format"
        onClick={() => {
        }}
      >
        <img src={format} alt="some rectangles with different width"/>
        Форматировать
      </div>

    </div>
  )
}

export default Footer