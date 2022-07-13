import React, {useEffect, useRef, useState} from 'react'
import './RequestHistory.css'
import clear from 'assets/img/consolePage/clear.svg'
import {useQuery} from "@apollo/client";
import {getRequestsQuery} from "graphql/graphqlQueries/getRequests.graphql";
import RequestHistoryItem from "components/ConsolePage/RequestHistory/RequestHistoryItem/RequestHistoryItem";


const RequestHistory = () => {
  const elRef = useRef<HTMLDivElement>(null)
  const [scroll, setScroll] = useState(false)
  let {data, loading} = useQuery(getRequestsQuery)
  // TODO: Make it works. Update after every request, ability to remove etc. And make it looks good
  useEffect(() => {
    const el = elRef.current
    if (el) {
      const onWheel = (e: WheelEvent) => {
        setScroll(true)

        if (e.deltaY == 0) return
        e.preventDefault()

        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 15,
          behavior: 'smooth',
        })

        if (el.offsetWidth + el.scrollLeft + e.deltaY * 15 >= el.scrollWidth) {
          setScroll(false)
        }
      }
      el.addEventListener('wheel', onWheel)
      return () => el.removeEventListener('wheel', onWheel)
    }
  }, [])

  return (
    <div className="history-wrapper">
      <div ref={elRef} className={`history `}>
        { data?.getRequests.map((request: any) => {
          return <RequestHistoryItem request={request}/>
        })}
      </div>
      <div
        className={`history__clear ${scroll ? 'scrolling' : ''}`}
        onClick={() => {
        }}
        tabIndex={0}
      >
        <img src={clear} alt="X symbol"/>
      </div>
    </div>
  )
}
export default RequestHistory