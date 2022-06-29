import GithubLink from 'common/GithubLink/GithubLink'
import format from 'assets/img/consolePage/format.svg'
import React, {Dispatch, useState} from 'react'
import './Footer.css'
import {useLazyQuery, useQuery} from "@apollo/client";
import {createGetUsersQuery, getUsersQuery} from "components/ConsolePage/Footer/getUsers";

type FooterProps = {
  request: String
  setResponse: Dispatch<string>
}


const Footer = ({request, setResponse}: FooterProps) => {
  // const [requestBody, setRequestBody] = useState<String>("name")
  // const [queryVariables, setQueryVariables] = useState({})
  const [queryObj, setQueryObj] = useState<{ body: String, queryString: any }>({body: "_id", queryString: {}})
  const [testUsersData, userData] = useLazyQuery(createGetUsersQuery(queryObj), {
    errorPolicy: "ignore", onCompleted: (data) => {
      setResponse(JSON.stringify(data, null, "\t"))
      // setQueryVariables({})
    }
  })

  const usersData = useQuery(getUsersQuery)
  // const currenciesData = useQuery(getCurrenciesQuery)
  // const mentorsData = useQuery(getMentorsQuery)
  // const proxiesData = useQuery(getProxiesQuery)
  // const requestsData = useQuery(getRequestsQuery)
  // const projectsData = useQuery(getProjectsQuery)

  const onSubmitRequest = async () => {
    let response = ""
    const requestParts = request.split(' ')
    // if (requestParts[1] === "get-fields" && requestParts[2] === "-values") {
    //   const fields = getFields(request)
    //   if (fields.includes("projects")) {
    //     response += getFormattedJSON(JSON.stringify(projectsData.data)) + "\n"
    //   }
    //   if (fields.includes("users")) {
    //     response += getFormattedJSON(JSON.stringify(usersData.data))
    //   }
    //   if (fields.includes("currencies")) {
    //     response += getFormattedJSON(JSON.stringify(currenciesData.data))
    //   }
    //   if (fields.includes("proxies")) {
    //     response += getFormattedJSON(JSON.stringify(proxiesData.data))
    //   }
    //   if (fields.includes("requests")) {
    //     response += getFormattedJSON(JSON.stringify(requestsData.data))
    //   }
    //   if (fields.includes("mentors")) {
    //     response += getFormattedJSON(JSON.stringify(mentorsData.data))
    //   }
    //
    //   setResponse(response)
    //
    // } else if (requestParts[1] === "get-users" && requestParts[2] === "-values" && !request.includes("-f")) {
    //   const usersQueryString = getUsersQueryFields(request)
    //   // setRequestBody(usersQueryString)
    //   setQueryObj({body: usersQueryString, queryString:  ""})
    //   await testUsersData()
    // }
    if (requestParts[1] === "get-users" && requestParts[2] === "-values" && request.includes("-f")) {
      const afterValues = request.split('-values')[1]
      let fieldsWithFilters = afterValues.split("|").map(e => e.trim())
      let answer: any = []
      fieldsWithFilters.forEach(e => {
        if (e.includes("-f")) {
          answer.push({field: e.split(" ")[0], value: e.split("-f")[1]})
        } else {
          answer.push({field: e, value: null})
        }
      })
      let bracketPosition: any = []

      answer.forEach((e: any, idx: any) => {
        while (answer[idx].field.includes('.')) {
          answer[idx].field = answer[idx].field.replace(/\./, "{") + "}"
        }

        bracketPosition.push(answer[idx].field.indexOf("}"))
        if (answer[idx].value) {
          if (bracketPosition[idx] !== -1) {
            answer[idx].value = answer[idx].field.substr(0, bracketPosition[idx]) + ":" +
              answer[idx].value +
              answer[idx].field.substr(bracketPosition[idx])
            answer[idx].value = answer[idx].value.replace(/{/g,":{")

            console.log(bracketPosition)
          } else answer[idx].value = answer[idx].field + ":" + answer[idx].value
        }
      })
      let query = {body: "" , queryString: ""}
      answer.forEach((e:any) => {
        query.body += e.field + " "
        query.queryString += e.value? e.value : "" + ", "
      })
      query.queryString = "{" + query.queryString + "}"
      setQueryObj({body: query.body, queryString: query.queryString})
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