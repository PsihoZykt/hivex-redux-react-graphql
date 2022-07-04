import GithubLink from 'common/GithubLink/GithubLink'
import format from 'assets/img/consolePage/format.svg'
import React, {Dispatch, useState} from 'react'
import './Footer.css'
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {
  ADD_USER,
  createGetUsersQuery,
  DELETE_USERS,
  getUsersQuery,
  UPDATE_USERS,
} from "components/ConsolePage/Footer/getUsers";
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
} from "components/ConsolePage/Footer/getCurrencies";
import {
  ADD_MENTOR,
  createGetMentorsQuery,
  DELETE_MENTORS,
  getMentorsQuery,
  UPDATE_MENTORS
} from "components/ConsolePage/Footer/getMentors";
import {
  ADD_PROXY,
  createGetProxiesQuery,
  DELETE_PROXIES,
  getProxiesQuery,
  UPDATE_PROXIES
} from "components/ConsolePage/Footer/getProxies";
import {
  ADD_REQUEST,
  createGetRequestsQuery,
  DELETE_REQUESTS,
  getRequestsQuery,
  UPDATE_REQUESTS
} from "components/ConsolePage/Footer/getRequests";
import {
  ADD_PROJECT,
  createGetProjectsQuery,
  DELETE_PROJECTS,
  getProjectsQuery,
  UPDATE_PROJECTS
} from "components/ConsolePage/Footer/getProjects";
import {GraphQLUserFieldType} from "types/EntityTypes/GraphQLUserFieldType";
import {GraphqlAnyEntityFieldType} from "types/EntityTypes/EntityTypes";
import {GraphQLCurrencyFieldType} from "types/EntityTypes/GraphQLCurrencyFieldType";

type FooterProps = {
  request: String
  setResponse: Dispatch<string>
}

export enum CommandNames {
  GET_FIELDS = "get-fields",
  GET_USERS = "get-users",
  ADD_USER = "add-user",
  DELETE_USERS = "delete-users",
  UPDATE_USERS = "update-users",

  GET_CURRENCIES = "get-currencies",
  ADD_CURRENCY = "add-currency",
  DELETE_CURRENCIES = "delete-currencies",
  UPDATE_CURRENCIES = "update-currencies",

  GET_MENTORS = "get-mentors",
  ADD_MENTOR = "add-mentors",
  DELETE_MENTORS = "delete-mentors",
  UPDATE_MENTORS = "update-mentors",

  GET_PROJECTS = "get-projects",
  ADD_PROJECT = "add-project",
  DELETE_PROJECTS = "delete-projects",
  UPDATE_PROJECTS = "update-projects",

  GET_PROXIES = "get-proxies",
  ADD_PROXY = "add-proxy",
  DELETE_PROXIES = "delete-proxies",
  UPDATE_PROXIES = "update-proxies",

  GET_REQUESTS = "get-requests",
  ADD_REQUEST = "add-request",
  DELETE_REQUESTS = "delete-requests",
  UPDATE_REQUESTS = "update-requests",

}

export enum Fields {
  USERS = 'users',
  CURRENCIES = "currencies",
  MENTORS = "mentors",
  PROXIES = "proxies",
  REQUESTS = "requests",
  PROJECTS = "projects"
}


export type CommandType = {
  prefix: "hivex"
  commandName: CommandNames
  valuesKey: "-values"
}
export const Footer = ({request, setResponse}: FooterProps) => {

  const [queryFieldsArr, setQueryFieldsArr] = useState<GraphqlAnyEntityFieldType[]>(["name"])
  const [getUsers, getUsersData] = useLazyQuery(createGetUsersQuery(queryFieldsArr), {
    errorPolicy: "ignore", onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })


  const [getCurrencies, getCurrenciesData] = useLazyQuery(createGetCurrenciesQuery(queryFieldsArr), {
    errorPolicy: "ignore", onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })

  const [getMentors, getMentorsData] = useLazyQuery(createGetMentorsQuery(queryFieldsArr), {
    errorPolicy: "ignore", onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })
  const [getProjects, getProjectsData] = useLazyQuery(createGetProjectsQuery(queryFieldsArr), {
    errorPolicy: "ignore", onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })
  const [getProxies, getProxiesData] = useLazyQuery(createGetProxiesQuery(queryFieldsArr), {
    errorPolicy: "ignore", onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })
  const [getRequests, getRequestsData] = useLazyQuery(createGetRequestsQuery(queryFieldsArr), {
    errorPolicy: "ignore", onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })


  const usersData = useQuery(getUsersQuery)
  const currenciesData = useQuery(getCurrenciesQuery)
  const mentorsData = useQuery(getMentorsQuery)
  const proxiesData = useQuery(getProxiesQuery)
  const requestsData = useQuery(getRequestsQuery)
  const projectsData = useQuery(getProjectsQuery)
  const [addUser, addUserData] = useMutation(ADD_USER, {
    onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })
  const [addCurrency, addCurrencyData] = useMutation(ADD_CURRENCY, {
    onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })

  const [addMentor, addMentorData] = useMutation(ADD_MENTOR, {
    onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })

  const [addProject, addProjectData] = useMutation(ADD_PROJECT, {
    onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })
  const [addProxy, addProxyData] = useMutation(ADD_PROXY, {
    onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })


  const [addRequest, addRequestData] = useMutation(ADD_REQUEST, {
    onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })
  const [deleteUsers, deleteUsersData] = useMutation(DELETE_USERS, {
    onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })
  const [deleteCurrencies, deleteCurrenciesData] = useMutation(DELETE_CURRENCIES, {
    onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })
  const [deleteMentors, deleteMentorsData] = useMutation(DELETE_MENTORS, {
    onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })
  const [deleteProjects, deleteProjectsData] = useMutation(DELETE_PROJECTS, {
    onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })
  const [deleteProxies, deleteProxiesData] = useMutation(DELETE_PROXIES, {
    onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })
  const [deleteRequests, deleteRequestData] = useMutation(DELETE_REQUESTS, {
    onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })


  const [updateUsers, updateUsersData] = useMutation(UPDATE_USERS, {
    onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })
  const [updateCurrencies, updateCurrenciesData] = useMutation(UPDATE_CURRENCIES, {
    onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })
  const [updateMentors, updateMentorsData] = useMutation(UPDATE_MENTORS, {
    onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })
  const [updateProjects, updateProjectsData] = useMutation(UPDATE_PROJECTS, {
    onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })
  const [updateProxies, updateUProxiesData] = useMutation(UPDATE_PROXIES, {
    onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })
  const [updateRequests, updateRequestsData] = useMutation(UPDATE_REQUESTS, {
    onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
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
        } else if (command.valuesKey === "-values") {
          if (command.commandName === CommandNames.GET_USERS) {
            const query = getQuery<GraphQLUserFieldType>(request)
            setQueryFieldsArr(query.fields)
            await getUsers({variables: {input: query.filter}})
          } else if (command.commandName === CommandNames.GET_CURRENCIES) {
            const query = getQuery<GraphQLCurrencyFieldType>(request)
            setQueryFieldsArr(query.fields)
            await getCurrencies({variables: {input: query.filter}})
          } else if (command.commandName === CommandNames.GET_MENTORS) {
            const query = getQuery(request)

            setQueryFieldsArr( query.fields)
            await getMentors({variables: {input: query.filter}})
          } else if (command.commandName === CommandNames.GET_PROJECTS) {
            const query = getQuery(request)
            setQueryFieldsArr(query.fields)
            await getProjects({variables: {input: query.filter}})
          } else if (command.commandName === CommandNames.GET_PROXIES) {
            const query = getQuery(request)
            setQueryFieldsArr(query.fields)
            await getProxies({variables: {input: query.filter}})
          } else if (command.commandName === CommandNames.GET_REQUESTS) {
            const query = getQuery(request)
            setQueryFieldsArr( query.fields)
            await getRequests({variables: {input: query.filter}})
          } else if (command.commandName === CommandNames.ADD_USER) {
            const mutation = getAddEntityMutation(request)
            await addUser({variables: {input: mutation.filter}})
          } else if (command.commandName === CommandNames.ADD_CURRENCY) {
            const mutation = getAddEntityMutation(request)
            await addCurrency({variables: {input: mutation.filter}})
          } else if (command.commandName === CommandNames.ADD_MENTOR) {
            const mutation = getAddEntityMutation(request)
            await addMentor({variables: {input: mutation.filter}})
          } else if (command.commandName === CommandNames.ADD_PROJECT) {
            const mutation = getAddEntityMutation(request)
            await addProject({variables: {input: mutation.filter}})
          } else if (command.commandName === CommandNames.ADD_PROXY) {
            const mutation = getAddEntityMutation(request)
            await addProxy({variables: {input: mutation.filter}})
          } else if (command.commandName === CommandNames.ADD_REQUEST) {
            const mutation = getAddEntityMutation(request)
            await addRequest({variables: {input: mutation.filter}})
          } else if (command.commandName === CommandNames.DELETE_USERS) {
            const query = getDeleteEntityMutation(request)
            await deleteUsers({variables: {input: query.filter}})
          } else if (command.commandName === CommandNames.DELETE_CURRENCIES) {
            const query = getDeleteEntityMutation(request)
            await deleteCurrencies({variables: {input: query.filter}})
          } else if (command.commandName === CommandNames.DELETE_MENTORS) {
            const query = getDeleteEntityMutation(request)
            await deleteMentors({variables: {input: query.filter}})
          } else if (command.commandName === CommandNames.DELETE_PROJECTS) {
            const query = getDeleteEntityMutation(request)
            await deleteProjects({variables: {input: query.filter}})
          } else if (command.commandName === CommandNames.DELETE_PROXIES) {
            const query = getDeleteEntityMutation(request)
            await deleteProxies({variables: {input: query.filter}})
          } else if (command.commandName === CommandNames.DELETE_REQUESTS) {
            const query = getDeleteEntityMutation(request)
            await deleteRequests({variables: {input: query.filter}})
          } else if (command.commandName === CommandNames.UPDATE_USERS) {
            let mutation = getUpdateEntityMutation(request)
            console.log(mutation.filter)
            await updateUsers({variables: {input: {filter: mutation.filter, set: mutation.set}}})
          } else if (command.commandName === CommandNames.UPDATE_MENTORS) {
            let mutation = getUpdateEntityMutation(request)
            console.log(mutation.filter)
            await updateMentors({variables: {input: {filter: mutation.filter, set: mutation.set}}})
          } else if (command.commandName === CommandNames.UPDATE_PROJECTS) {
            let mutation = getUpdateEntityMutation(request)
            console.log(mutation.filter)
            await updateProjects({variables: {input: {filter: mutation.filter, set: mutation.set}}})
          } else if (command.commandName === CommandNames.UPDATE_PROXIES) {
            let mutation = getUpdateEntityMutation(request)
            console.log(mutation.filter)
            await updateProxies({variables: {input: {filter: mutation.filter, set: mutation.set}}})
          } else if (command.commandName === CommandNames.UPDATE_REQUESTS) {
            let mutation = getUpdateEntityMutation(request)
            console.log(mutation.filter)
            await updateRequests({variables: {input: {filter: mutation.filter, set: mutation.set}}})
          } else if (command.commandName === CommandNames.UPDATE_CURRENCIES) {
            let mutation = getUpdateEntityMutation(request)
            console.log(mutation.filter)
            await updateCurrencies({variables: {input: {filter: mutation.filter, set: mutation.set}}})
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