import GithubLink from 'common/GithubLink/GithubLink'
import format from 'assets/img/consolePage/format.svg'
import React, {Dispatch, useState} from 'react'
import './Footer.css'
import {useLazyQuery, useQuery} from "@apollo/client";
import {createGetUsersQuery, getUsersQuery} from "components/ConsolePage/Footer/getUsers";
import {getCurrenciesQuery} from "components/ConsolePage/Footer/getCurrencies";
import {getProxiesQuery} from "components/ConsolePage/Footer/getProxies";
import {getRequestsQuery} from "components/ConsolePage/Footer/getRequests";
import {getProjectsQuery} from "components/ConsolePage/Footer/getProjects";
import {getMentorsQuery} from "components/ConsolePage/Footer/getMentors";
import {getFormattedJSON} from "helpers/json/format";
import {getFields, getUsersQueryFields} from "helpers/graphql/graphqlHelper";

type FooterProps = {
  request: String
  setResponse: Dispatch<string>
}


const Footer = ({request, setResponse}: FooterProps) => {
  const [requestBody, setRequestBody] = useState<String>("name")
  const [testUsersData, userData] = useLazyQuery(createGetUsersQuery(requestBody), {
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

  const onSubmitRequest = async () => {
    console.log("TEST")
    let response = ""
    const requestParts = request.split(' ')
    if (requestParts[1] === "get-fields" && requestParts[2] === "-values") {
      const fields = getFields(request)
      if (fields.includes("projects")) {
        response += getFormattedJSON(JSON.stringify(projectsData.data)) + "\n"
      }
      if (fields.includes("users")) {
        response += getFormattedJSON(JSON.stringify(usersData.data))
      }
      if (fields.includes("currencies")) {
        response += getFormattedJSON(JSON.stringify(currenciesData.data))
      }
      if (fields.includes("proxies")) {
        response += getFormattedJSON(JSON.stringify(proxiesData.data))
      }
      if (fields.includes("requests")) {
        response += getFormattedJSON(JSON.stringify(requestsData.data))
      }
      if (fields.includes("mentors")) {
        response += getFormattedJSON(JSON.stringify(mentorsData.data))
      }

      setResponse(response)

    } else
    if (requestParts[1] === "get-users" && requestParts[2] === "-values") {
      const usersQueryString = getUsersQueryFields(request)
      setRequestBody(usersQueryString)
      await testUsersData()

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