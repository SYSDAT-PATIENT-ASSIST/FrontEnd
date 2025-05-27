import React from "react";
import DisplayError from "./ErrorComponent";

export default class ErrorComponentBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.componentFailed = props.componentFailed || "Komponenten";
  }

  static getDerivedStateFromError() {
    // Opdater state så næste render viser fallback-UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Muligvis logge fejlen til en ekstern service
    console.error(this.componentFailed + " crashed:", error, info);
  }

  handleRetry = () => {
    // Nulstil fejl-state og prøv at render igen
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) 
      {
      return <DisplayError componentFailed={this.componentFailed} onRetry={this.handleRetry} />;
    }
    return this.props.children;
  }
}
