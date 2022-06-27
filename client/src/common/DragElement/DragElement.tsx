import React from 'react'
import './DragElement.css'

export class DragElement<T, S> extends React.Component<T, S> {
  render() {
    return (
      <div className={`drag-element`}>
        <div className="drag-element_circle"/>
        <div className="drag-element_circle"/>
        <div className="drag-element_circle"/>
      </div>
    )
  }
}
