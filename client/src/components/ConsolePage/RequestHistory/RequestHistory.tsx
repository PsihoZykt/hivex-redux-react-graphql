import React, {useEffect, useRef, useState} from 'react'
import './RequestHistory.css'
import clear from 'assets/img/consolePage/clear.svg'


const RequestHistory = () => {
  const elRef = useRef<HTMLDivElement>(null)
  const [scroll, setScroll] = useState(false)
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