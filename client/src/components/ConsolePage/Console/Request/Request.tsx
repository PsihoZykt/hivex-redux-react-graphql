import React, {Dispatch, MutableRefObject, useRef, useState} from 'react'
import 'components/ConsolePage/Console/Request/Request.scss'
import {DragElement} from 'common/DragElement/DragElement'
import {validateRequest} from "components/ConsolePage/Console/Request/validateRequest";

type RequestProps = {
  setRequest: Dispatch<string>
  request: String
}
const Request = ({request, setRequest}: RequestProps) => {
  const resizeDrag = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const wrapperRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const getErrorClass = () => (validateRequest(request) ? 'error' : '')
  const [consoleWidth, setConsoleWidth] = useState(400);
  let x: number
  let dx: number
  let wd = consoleWidth;
  const startResize = function (evt: React.MouseEvent<HTMLDivElement>) {
    x = evt.screenX
  }

  const resize = function (evt: MouseEvent) {
    dx = evt.screenX - x
    x = evt.screenX
    wd += dx
    if (wd < 400) wd = 400
    if (wd > window.innerWidth - 400) wd = window.innerWidth - 400
    setConsoleWidth(wd)
  }

  const onDragMouseDown = (evt: React.MouseEvent<HTMLDivElement>) => {
    startResize(evt)
    document.addEventListener('mousemove', resize)
    resizeDrag.current.addEventListener('mouseup', function () {
      document.removeEventListener('mousemove', resize)
    })

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', resize)
    })
  }
  return (
    <div className={`request`}>
      <div className={`request__header  ${getErrorClass()}` }>Запрос</div>

      <div ref={wrapperRef} style={{width: consoleWidth + 'px'}} className={"textarea-wrapper"}>
    <textarea
      className={`request__textarea ${getErrorClass()}`}
      onChange={(e) => setRequest(e.target.value)}
    />

        <div
          onMouseDown={(evt) => onDragMouseDown(evt)}
          ref={resizeDrag}
          className="resizer"
        >
          <DragElement/>
        </div>
      </div>
    </div>
  )
}
export default Request