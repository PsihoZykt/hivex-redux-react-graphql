import React, {useState} from 'react'
import './ConsolePage.css'

import Console from 'components/ConsolePage/Console/Console'
import Header from 'components/ConsolePage/Header/Header'
import {FullScreen, useFullScreenHandle,} from 'react-full-screen'
import Footer from "components/ConsolePage/Footer/Footer";
import RequestHistory from "components/ConsolePage/RequestHistory/RequestHistory";
import {ErrorBoundary} from "common/ErrorBoundary/ErrorBoundary";

const ConsolePage = () => {
  //Don't know yet how to handle pass values between components without store, so just pass it with props
  const [request, setRequest] = useState(`dsadsa`)
  const [response, setResponse] = useState("")
  const fullScreen = useFullScreenHandle()
  return (
    <FullScreen handle={fullScreen}>
      <div className="console-page">
        {/*<ErrorBoundary>*/}
          <Header fullScreen={fullScreen}/>
          <RequestHistory/>
          <Console request={request} setRequest={setRequest} response={response}/>
          <Footer request={request} setResponse={setResponse}/>
        {/*</ErrorBoundary>*/}
      </div>
    </FullScreen>
  )
}

export default ConsolePage
