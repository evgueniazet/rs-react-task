import { Component } from "react";
import styles from "./ErrorBoundary.module.scss";
import {
  IErrorBoundaryProps,
  IErrorBoundaryState,
} from "../../interfaces/IErrorBoundary";

class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  state: IErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    return { error };
  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <div className={styles.errorWrapper}>
          <p className={styles.errorMessage}>{error.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
