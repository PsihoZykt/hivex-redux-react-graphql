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
  UPDATE_USERS
} from "components/ConsolePage/Footer/getUsers";
import {
  getAddUserMutation,
  getDeleteUserMutation,
  getQuery,
  getUpdateUsersMutation,
  getValues
} from "helpers/graphql/graphqlHelper";
import {getFormattedJSON} from "helpers/json/format";
import {getCurrenciesQuery} from "components/ConsolePage/Footer/getCurrencies";
import {getMentorsQuery} from "components/ConsolePage/Footer/getMentors";
import {getProxiesQuery} from "components/ConsolePage/Footer/getProxies";
import {getRequestsQuery} from "components/ConsolePage/Footer/getRequests";
import {getProjectsQuery} from "components/ConsolePage/Footer/getProjects";

type FooterProps = {
  request: String
  setResponse: Dispatch<string>
}

enum CommandNames {
  GET_USERS = "get-users",
  GET_FIELDS = "get-fields",
  ADD_USER = "add-user",
  DELETE_USERS = "delete-users",
  UPDATE_USERS = "update-users",
}

enum Fields {
  USERS = 'users',
  CURRENCIES = "currencies",
  MENTORS = "mentors",
  PROXIES = "proxies",
  REQUESTS = "requests",
  PROJECTS = "projects"
}


type CommandType = {
  prefix: "hivex"
  commandName: CommandNames
  valuesKey: "-values"
}
const Footer = ({request, setResponse}: FooterProps) => {

  const [queryObj, setQueryObj] = useState<{ body: String }>({body: "_id"})
  const [testUsersData, userData] = useLazyQuery(createGetUsersQuery(queryObj), {
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
  const [deleteUsers, deleteUsersData] = useMutation(DELETE_USERS, {
    onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
    }
  })
  const [updateUsers, updateUsersData] = useMutation(UPDATE_USERS, {
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
      } else {
        if (command.commandName === CommandNames.GET_USERS && command.valuesKey === "-values") {
          const query = getQuery(request)
          setQueryObj({body: query.fields})
          await testUsersData({variables: {input: query.filter}})
        } else if (command.commandName === CommandNames.ADD_USER && command.valuesKey === "-values") {
          const mutation = getAddUserMutation(request)
          await addUser({variables: {input: mutation.filter}})
        } else if (command.commandName === CommandNames.DELETE_USERS && command.valuesKey === "-values") {
          const query = getDeleteUserMutation(request)
          await deleteUsers({variables: {input: query.filter}})
        } else if (command.commandName === CommandNames.UPDATE_USERS && command.valuesKey === "-values") {

          let mutation = getUpdateUsersMutation(request)
          console.log(mutation.filter)
          await updateUsers({
            variables:
              {
                input:
                  {
                    filter: mutation.filter,
                    set: mutation.set
                  }
              }
          })


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