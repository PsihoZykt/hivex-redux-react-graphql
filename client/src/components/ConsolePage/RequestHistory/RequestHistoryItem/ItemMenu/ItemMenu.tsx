import {Request} from "store/reducers/consoleReducer";
import React, {useEffect, useRef, useState} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {DragElement} from "common/DragElement/DragElement";
import {connect, ConnectedProps} from "react-redux";
import {consoleActions} from "store/actions/console/consoleActions";
import './ItemMenu.css'

type OwnProps = {
  request: Request,
  leftOffset: number,
}
type ReduxPropsType = ConnectedProps<typeof connector>
type PropsType = OwnProps & ReduxPropsType
const ItemMenu = ({
                    deleteRequest,
                    request,
                    leftOffset,
                  }: PropsType) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const expandElementRef = useRef<HTMLDivElement>(null)
  const copyElement = useRef<HTMLDivElement>(null)
  const [fade, setFade] = useState(false)
  const onDocumentClick = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement
    // If we click on "copy" button, menu remains expanded
    if (copyElement.current && copyElement.current.contains(target)) {
      setIsExpanded(true)
    } else {
      //If we click on 3 dots icon, open menu, otherwise close it
      setIsExpanded(expandElementRef.current && expandElementRef.current === e.target || false)
    }

  }

  useEffect(() => {
    document.addEventListener('click', onDocumentClick)
    return () => {
      document.removeEventListener('click', onDocumentClick)
    }
  }, [])


  const onDelete = () => {
    deleteRequest(request)
  }


  const getExpandedClass = () => {
    return isExpanded ? 'expand-expanded' : 'expand-hidden'
  }
  const expandedRef = useRef<HTMLDivElement>(null)
  return (
    <div className="expand">
      <div
        ref={expandElementRef}
        className="expand__icon"
        tabIndex={0}
      >
        <DragElement/>
        <div
          style={{
            left: leftOffset - 80,
          }}
          ref={expandedRef}
          className={`expand ${getExpandedClass()}`}
        >
          <div
            className="expand__item run"
            onClick={() => {
            }}
            tabIndex={0}

          >
            Запустить
          </div>
          <div
            className={`expand__item copy `}
            onClick={() => {
              setFade(true)

            }}
            tabIndex={0}

            ref={copyElement}

          >
            <div
              onAnimationEnd={() => {
                setFade(false)
              }}
              className={`copyEvent ${fade ? 'fade' : ''}`}
              tabIndex={0}

            >
              Скопировано
            </div>
            <CopyToClipboard text={request.requestText}>
              <div>Скопировать</div>
            </CopyToClipboard>
          </div>
          <div className="delimiter"/>
          <div
            className="expand__item delete"
            onClick={onDelete}
            tabIndex={0}

          >
            Удалить
          </div>
        </div>
      </div>

    </div>
  )
}

const connector = connect(null, {deleteRequest: consoleActions.deleteRequest})
export default connector(ItemMenu)