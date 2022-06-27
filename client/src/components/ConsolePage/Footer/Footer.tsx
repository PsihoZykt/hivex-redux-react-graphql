import GithubLink from 'common/GithubLink/GithubLink'
import format from 'assets/img/consolePage/format.svg'
import React, {Dispatch, useEffect} from 'react'
import './Footer.css'
import {gql, useMutation, useQuery} from "@apollo/client";
import {getFormattedJSON} from "helpers/json/format";

type FooterProps = {
  request: String
  setResponse: Dispatch<string>
}
const Footer = ({request, setResponse}: FooterProps) => {

    const getUsers = gql`query GetRequests {
        getUsers {
            name
            proxy {
                bank
            }
            salary
            project {
                name
            }
        }
    }`
    const saveRequestToHistory = gql`mutation AddRequest($input: RequestInput) {
        addRequest(input: $input) {
            createdAt, request, response
        }
    }`


  const [func, res] = useMutation(saveRequestToHistory)
  const {loading, error, data} = useQuery(getUsers)
  const onSubmitRequest = async () => {
    if (request === "get-users") {
      await func({variables: {input: {request: request, response: JSON.stringify(data), createdAt: new Date()}}});
      setResponse(getFormattedJSON(JSON.stringify(data)))

    }

  }
  useEffect(() => {

  })

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