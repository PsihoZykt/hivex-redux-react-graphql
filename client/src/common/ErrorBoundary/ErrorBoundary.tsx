import React from "react";

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {hasError: false}
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({hasError: false})
    console.error(`Error: ${error}, ${errorInfo}`)
  }

  render() {
    return this.props.children
  }
}