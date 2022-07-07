import React from 'react'


import './Response.css'

type ResponseProps = {
  response: String
}
const Response = ({response}: ResponseProps) => {

  return (
    <div className={'response'}>
      <div className={`response__header`}>
        Ответ
      </div>
      <pre className={`response__field`}>
      {response}
      </pre>
    </div>
  )
}
export default Response