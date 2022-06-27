import {Request, RequestStatus} from 'store/reducers/consoleReducer'
import 'components/ConsolePage/RequestHistory/RequestHistoryItem/RequestHistoryItem.scss'
import React, {useRef, useState} from 'react'
import ItemMenu from 'components/ConsolePage/RequestHistory/RequestHistoryItem/ItemMenu/ItemMenu'
import {getFormattedJSON} from 'helpers/json/format'
import {connect, ConnectedProps} from 'react-redux'
import {consoleActions} from 'store/actions/console/consoleActions'

type OwnProps = {
  request: Request,
}
type ReduxPropsType = ConnectedProps<typeof connector>
type PropsType = OwnProps & ReduxPropsType

const RequestHistoryItem = ({
                              request,
                              changeRequestResponse,
                              changeCurrentRequestText,
                            }: PropsType) => {
  // I Supposed, when you click to request, response-window should be cleared
  // Because, even if request body is former, response can be different
  const onHistoryItemClick = (request: Request) => {
    changeCurrentRequestText(getFormattedJSON(request.requestText))
    changeRequestResponse('{}')
  }

  const statusClass =
    request.status === RequestStatus.Successful
      ? 'status_successful'
      : 'status_unsuccessful'
  const ref = useRef<HTMLDivElement>(null)
  const [leftOffset, setLeftOffset] = useState<number>(0)
  const requestAction = JSON.parse(request.requestText).action
  return (
    <div
      tabIndex={0}
      onClickCapture={(e) => {
        setLeftOffset(e.currentTarget.offsetLeft + 55)
        onHistoryItemClick(request)
      }}
      className="history__item"
      ref={ref}
    >
      <div className={statusClass}/>
      <div>{requestAction}</div>

      <ItemMenu request={request} leftOffset={leftOffset}/>
    </div>
  )
}

const connector = connect(null, {
  changeCurrentRequestText: consoleActions.changeRequestText,
  changeRequestResponse: consoleActions.changeRequestResponse,
})

export default connector(RequestHistoryItem)
