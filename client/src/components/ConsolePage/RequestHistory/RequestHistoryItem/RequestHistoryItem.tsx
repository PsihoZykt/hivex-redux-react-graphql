import 'components/ConsolePage/RequestHistory/RequestHistoryItem/RequestHistoryItem.scss'
import React, {useRef, useState} from 'react'


const RequestHistoryItem = ({request}: any) => {

  // I Supposed, when you click to request, response-window should be cleared
  // Because, even if request body is former, response can be different
  const onHistoryItemClick = (request: Request) => {
    // changeCurrentRequestText(getFormattedJSON(request.requestText))
    // changeRequestResponse('{}')
  }

  const statusClass = "status_successful"
    // request.status === RequestStatus.Successful
    //   ? 'status_successful'
    //   : 'status_unsuccessful'
  const ref = useRef<HTMLDivElement>(null)
  const [leftOffset, setLeftOffset] = useState<number>(0)
  // const requestAction = JSON.parse(request.requestText).action
  return (
    <div
      tabIndex={0}
      onClickCapture={(e) => {
        setLeftOffset(e.currentTarget.offsetLeft + 55)
        // onHistoryItemClick(request)
      }}
      className="history__item"
      ref={ref}
    >
      <div className={statusClass}/>
      <div>{request.request.split(" ")[1]}</div>

      {/*<ItemMenu request={request} leftOffset={leftOffset}/>*/}
    </div>
  )
}

export default RequestHistoryItem