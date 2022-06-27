import React, {Dispatch} from 'react'
import './Console.css'
import Request from './Request/Request'
import Response from './Response/Response'
type ConsoleProps = {
  request: String,
  response: String,
  setRequest: Dispatch<string>
}
const Console = ({request, response, setRequest}: ConsoleProps) => {
  return (
    <div className="console">
      <Request request={request} setRequest={setRequest}/>
      <Response response={response}/>
    </div>
  )
}
export default Console
