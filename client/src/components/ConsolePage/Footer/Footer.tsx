import GithubLink from 'common/GithubLink/GithubLink'
import format from 'assets/img/consolePage/format.svg'
import React, {Dispatch, useState} from 'react'
import './Footer.css'
import {MutationHookOptions, useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {
  ADD_USER,
  createGetUsersQuery,
  DELETE_USERS,
  getUsersQuery,
  UPDATE_USERS,
} from "components/ConsolePage/Footer/graphqlQueries/getUsers.graphql";
import {
  getAddEntityMutation,
  getDeleteEntityMutation,
  getQuery,
  getUpdateEntityMutation,
  getValues
} from "helpers/graphql/graphqlHelper";
import {getFormattedJSON} from "helpers/json/format";
import {
  ADD_CURRENCY,
  createGetCurrenciesQuery,
  DELETE_CURRENCIES,
  getCurrenciesQuery,
  UPDATE_CURRENCIES
} from "components/ConsolePage/Footer/graphqlQueries/getCurrencies.graphql";
import {
  ADD_MENTOR,
  createGetMentorsQuery,
  DELETE_MENTORS,
  getMentorsQuery,
  UPDATE_MENTORS
} from "components/ConsolePage/Footer/graphqlQueries/getMentors.graphql";
import {
  ADD_PROXY,
  createGetProxiesQuery,
  DELETE_PROXIES,
  getProxiesQuery,
  UPDATE_PROXIES
} from "components/ConsolePage/Footer/graphqlQueries/getProxies.graphql";
import {
  ADD_REQUEST,
  createGetRequestsQuery,
  DELETE_REQUESTS,
  getRequestsQuery,
  UPDATE_REQUESTS
} from "components/ConsolePage/Footer/graphqlQueries/getRequests.graphql";
import {
  ADD_PROJECT,
  createGetProjectsQuery,
  DELETE_PROJECTS,
  getProjectsQuery,
  UPDATE_PROJECTS
} from "components/ConsolePage/Footer/graphqlQueries/getProjects.graphql";

import {GraphQLUserFieldType} from "types/EntityTypes/GraphQLUserFieldType";
import {GraphqlAnyEntityFieldType} from "types/EntityTypes/EntityTypes";
import {GraphQLCurrencyFieldType} from "types/EntityTypes/GraphQLCurrencyFieldType";
import {CommandNames, CommandType, Fields} from "components/ConsolePage/Footer/Commands/CommandTypes";
import {GraphQLMentorFieldType} from "types/EntityTypes/GraphQLMentorFieldType";
import {GraphQLProjectFieldType} from "types/EntityTypes/GraphQLProjectFieldType";
import {GraphQLProxyFieldType} from "types/EntityTypes/GraphQLProxyFieldType";
import {GraphQLRequestFieldType} from "types/EntityTypes/GraphQLRequestFieldType";

type FooterProps = {
  request: String
  setResponse: Dispatch<string>
}

export const Footer = ({request, setResponse}: FooterProps) => {
  const queryOptions: MutationHookOptions = {
    errorPolicy: "ignore", onCompleted: (data: any) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  }

  const [queryFieldsArr, setQueryFieldsArr] = useState<GraphqlAnyEntityFieldType[]>(["name"])

  const usersData = useQuery(getUsersQuery)
  const currenciesData = useQuery(getCurrenciesQuery)
  const mentorsData = useQuery(getMentorsQuery)
  const proxiesData = useQuery(getProxiesQuery)
  const requestsData = useQuery(getRequestsQuery)
  const projectsData = useQuery(getProjectsQuery)
  //TODO:  Использовать все эти даты, запихать их в массив, и выводить загрузку пока не загрузятся все или че нить такой
  const [getUsers, getUsersData] = useLazyQuery(createGetUsersQuery(queryFieldsArr), queryOptions)
  const [getCurrencies, getCurrenciesData] = useLazyQuery(createGetCurrenciesQuery(queryFieldsArr), queryOptions)
  const [getMentors, getMentorsData] = useLazyQuery(createGetMentorsQuery(queryFieldsArr), queryOptions)
  const [getProjects, getProjectsData] = useLazyQuery(createGetProjectsQuery(queryFieldsArr), queryOptions)
  const [getProxies, getProxiesData] = useLazyQuery(createGetProxiesQuery(queryFieldsArr), queryOptions)
  const [getRequests, getRequestsData] = useLazyQuery(createGetRequestsQuery(queryFieldsArr), queryOptions)
  const [addUser, addUserData] = useMutation(ADD_USER, queryOptions)
  const [addCurrency, addCurrencyData] = useMutation(ADD_CURRENCY, queryOptions)
  const [addMentor, addMentorData] = useMutation(ADD_MENTOR, queryOptions)
  const [addProject, addProjectData] = useMutation(ADD_PROJECT, queryOptions)
  const [addProxy, addProxyData] = useMutation(ADD_PROXY, queryOptions)
  const [addRequest, addRequestData] = useMutation(ADD_REQUEST, queryOptions)
  const [deleteUsers, deleteUsersData] = useMutation(DELETE_USERS, queryOptions)
  const [deleteCurrencies, deleteCurrenciesData] = useMutation(DELETE_CURRENCIES, queryOptions)
  const [deleteMentors, deleteMentorsData] = useMutation(DELETE_MENTORS, queryOptions)
  const [deleteProjects, deleteProjectsData] = useMutation(DELETE_PROJECTS, queryOptions)
  const [deleteProxies, deleteProxiesData] = useMutation(DELETE_PROXIES, queryOptions)
  const [deleteRequests, deleteRequestData] = useMutation(DELETE_REQUESTS, queryOptions)
  const [updateUsers, updateUsersData] = useMutation(UPDATE_USERS, queryOptions)
  const [updateCurrencies, updateCurrenciesData] = useMutation(UPDATE_CURRENCIES, queryOptions)
  const [updateMentors, updateMentorsData] = useMutation(UPDATE_MENTORS, queryOptions)
  const [updateProjects, updateProjectsData] = useMutation(UPDATE_PROJECTS, queryOptions)
  const [updateProxies, updateUProxiesData] = useMutation(UPDATE_PROXIES, queryOptions)
  const [updateRequests, updateRequestsData] = useMutation(UPDATE_REQUESTS, queryOptions)


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
            response += getFormattedJSON(JSON.stringify(projectsData.data)) + "\n"
          }
          if (fields.includes(Fields.USERS)) {
            response += getFormattedJSON(JSON.stringify(usersData.data))
          }
          if (fields.includes(Fields.CURRENCIES)) {
            response += getFormattedJSON(JSON.stringify(currenciesData.data))
          }
          if (fields.includes(Fields.PROXIES)) {
            response += getFormattedJSON(JSON.stringify(proxiesData.data))
          }
          if (fields.includes(Fields.REQUESTS)) {
            response += getFormattedJSON(JSON.stringify(requestsData.data))
          }
          if (fields.includes(Fields.MENTORS)) {
            response += getFormattedJSON(JSON.stringify(mentorsData.data))
          }
          setResponse(response)
        }
        else if (command.valuesKey === "-values") {

          switch (command.commandName) {
            case CommandNames.GET_USERS: {
              const query = getQuery<GraphQLUserFieldType>(request)
              setQueryFieldsArr(query.fields)
              await getUsers({variables: {input: query.filter}})
              break;
            }
            case CommandNames.GET_CURRENCIES: {
              const query = getQuery<GraphQLCurrencyFieldType>(request)
              setQueryFieldsArr(query.fields)
              await getCurrencies({variables: {input: query.filter}})
              break;
            }
            case CommandNames.GET_MENTORS: {
              const query = getQuery<GraphQLMentorFieldType>(request)
              setQueryFieldsArr(query.fields)
              await getMentors({variables: {input: query.filter}})
              break;
            }
            case CommandNames.GET_PROJECTS: {
              const query = getQuery<GraphQLProjectFieldType>(request)
              setQueryFieldsArr(query.fields)
              await getProjects({variables: {input: query.filter}})
              break;
            }
            case CommandNames.GET_PROXIES: {
              const query = getQuery<GraphQLProxyFieldType>(request)
              setQueryFieldsArr(query.fields)
              await getProxies({variables: {input: query.filter}})
              break;
            }
            case CommandNames.GET_REQUESTS: {
              const query = getQuery<GraphQLRequestFieldType>(request)
              setQueryFieldsArr(query.fields)
              await getRequests({variables: {input: query.filter}})
              break;
            }
            case CommandNames.ADD_USER: {
              const mutation = getAddEntityMutation<GraphQLUserFieldType>(request)
              await addUser({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.ADD_CURRENCY: {
              const mutation = getAddEntityMutation<GraphQLCurrencyFieldType>(request)
              await addCurrency({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.ADD_MENTOR: {
              const mutation = getAddEntityMutation<GraphQLMentorFieldType>(request)
              await addMentor({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.ADD_PROJECT: {
              const mutation = getAddEntityMutation<GraphQLProjectFieldType>(request)
              await addProject({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.ADD_PROXY: {
              const mutation = getAddEntityMutation<GraphQLProxyFieldType>(request)
              await addProxy({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.ADD_REQUEST: {
              const mutation = getAddEntityMutation<GraphQLRequestFieldType>(request)
              await addRequest({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.DELETE_USERS: {
              const mutation = getDeleteEntityMutation<GraphQLUserFieldType>(request)
              await deleteUsers({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.DELETE_CURRENCIES: {
              const mutation = getDeleteEntityMutation<GraphQLCurrencyFieldType>(request)
              await deleteCurrencies({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.DELETE_MENTORS: {
              const mutation = getDeleteEntityMutation<GraphQLMentorFieldType>(request)
              await deleteMentors({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.DELETE_PROJECTS: {
              const mutation = getDeleteEntityMutation<GraphQLProjectFieldType>(request)
              await deleteProjects({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.DELETE_PROXIES: {
              const mutation = getDeleteEntityMutation<GraphQLProxyFieldType>(request)
              await deleteProxies({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.DELETE_REQUESTS: {
              const mutation = getDeleteEntityMutation<GraphQLRequestFieldType>(request)
              await deleteRequests({variables: {input: mutation.filter}})
              break;
            }
            case CommandNames.UPDATE_USERS: {
              let mutation = getUpdateEntityMutation<GraphQLUserFieldType>(request)
              await updateUsers({variables: {input: {filter: mutation.filter, set: mutation.set}}})
              break;
            }
            case CommandNames.UPDATE_MENTORS: {
              let mutation = getUpdateEntityMutation<GraphQLMentorFieldType>(request)
              await updateMentors({variables: {input: {filter: mutation.filter, set: mutation.set}}})
              break;
            }
            case CommandNames.UPDATE_PROJECTS: {
              let mutation = getUpdateEntityMutation<GraphQLProjectFieldType>(request)
              await updateProjects({variables: {input: {filter: mutation.filter, set: mutation.set}}})
              break;
            }
            case CommandNames.UPDATE_PROXIES: {
              let mutation = getUpdateEntityMutation<GraphQLProxyFieldType>(request)
              await updateProxies({variables: {input: {filter: mutation.filter, set: mutation.set}}})
              break;
            }
            case CommandNames.UPDATE_REQUESTS: {
              let mutation = getUpdateEntityMutation<GraphQLRequestFieldType>(request)
              await updateRequests({variables: {input: {filter: mutation.filter, set: mutation.set}}})
              break;
            }
            case CommandNames.UPDATE_CURRENCIES: {
              let mutation = getUpdateEntityMutation<GraphQLCurrencyFieldType>(request)
              await updateCurrencies({variables: {input: {filter: mutation.filter, set: mutation.set}}})
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
        {usersData.loading && <p>Loading...</p>}
        {usersData.error && <p>Error!</p>}

      </div>

    </div>
  )
}

export default Footer