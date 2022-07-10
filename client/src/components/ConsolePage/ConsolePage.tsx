import React, {useEffect, useState} from 'react'
import './ConsolePage.css'

import Console from 'components/ConsolePage/Console/Console'
import Header from 'components/ConsolePage/Header/Header'
import {FullScreen, useFullScreenHandle,} from 'react-full-screen'
import Footer from "components/ConsolePage/Footer/Footer";
import RequestHistory from "components/ConsolePage/RequestHistory/RequestHistory";
import {useLazyQuery} from "@apollo/client";
import {UserType} from "types/EntityTypes/EntityTypes";
import {AUTH} from "graphql/graphqlQueries/getUsers.graphql";

export const CurrentUserContext = React.createContext({
    user: {} ,
    changeUser: (currentUser: UserType) => {
    }
  }
)

const ConsolePage = () => {
  //Don't know yet how to handle pass values between components without store, so just pass it with props
  const [request, setRequest] = useState(`dsadsa`)
  const [response, setResponse] = useState("")
  const [currentUser, changeCurrentUser] = useState({})
  let [authFunc] = useLazyQuery(AUTH, {
    onCompleted: (data) => {
      changeCurrentUser(data.auth)
    }
  })
  useEffect(() => {
   authFunc()
  }, [authFunc])

// Server side is done ( only need to move gwt-token to file)
  // Need to pass current user via context to header
  const fullScreen = useFullScreenHandle()
  return (
    <CurrentUserContext.Provider value={{user: currentUser, changeUser: changeCurrentUser}}>


      <FullScreen handle={fullScreen}>
        <div className="console-page">
          <Header fullScreen={fullScreen}/>
          <RequestHistory/>
          <Console request={request} setRequest={setRequest} response={response}/>
          <Footer request={request} setResponse={setResponse}/>
        </div>
      </FullScreen>
    </CurrentUserContext.Provider>

  )
}

export default ConsolePage
