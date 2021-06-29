import { Component, ReactNode } from "react";
import ReactJson from "react-json-view";

/** Sentry exposes a Sentry.ErrorBoundary component as well, if we want to send bounded errors to Sentry
 * https://docs.sentry.io/platforms/javascript/guides/react/#add-react-error-boundary
 */
export class ErrorBoundary extends Component<{
  ignore?: boolean;
  component?: JSX.Element | ((err: { error: any; info: any }) => ReactNode);
  hideHtmlErrorOverlay?: boolean;
  boundaryTitle?: string;
}> {
  state = {
    hasError: false,
    error: "",
    info: "",
  };

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: any, info: any) {
    if (!this.props.ignore) {
      this.setState({ error, info });
      console.log({ error, info });
    }
  }

  render() {
    if (this.state.hasError) {
      const errorData = {
        error: this.state.error,
        info: this.state.info,
      };
      console.log("something went wrong!");
      return (
        <>
          {this.props.hideHtmlErrorOverlay ? null : (
            <>
              <div>❌ {this.props.boundaryTitle} :</div>
              <ReactJson
                src={errorData}
                // collapsed={1} // collapse JSON tree to level 1 by default
              />
            </>
          )}
          {typeof this.props.component === "function"
            ? this.props.component(errorData)
            : this.props.component || null}
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
