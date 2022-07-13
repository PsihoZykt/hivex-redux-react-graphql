import GithubLink from 'common/GithubLink/GithubLink'
import format from 'assets/img/consolePage/format.svg'
import React, {Dispatch, useState} from 'react'
import './Footer.css'
import {GraphqlAnyEntityFieldType} from "types/EntityTypes/EntityTypes";
import {validateRequest} from "helpers/graphql/validateRequest";
import {useGraphQL} from "hooks/useGraphql";
import {runRequestGraphql} from "helpers/runRequestGraphql";

type FooterProps = {
  request: String
  setResponse: Dispatch<string>
}
export const Footer = ({request, setResponse}: FooterProps) => {
  // This state used in getQuery with dynamical return fields
  const [queryFieldsArr, setQueryFieldsArr] = useState<GraphqlAnyEntityFieldType[]>(["name"])
  const graphql = useGraphQL(queryFieldsArr, setResponse, request)

  // Set loading if any graphql request is loading
  Object.values(graphql).forEach(command => {
    if (command.data.loading) setResponse("Loading...")
    else if (command.data.error) console.log(command.data.error)
  })
  const onSubmitRequest = async () => {

    let requestError = validateRequest(request)

    try {
      if (!requestError) {
        await runRequestGraphql(request, graphql, setQueryFieldsArr)
      } else
        setResponse(requestError)

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