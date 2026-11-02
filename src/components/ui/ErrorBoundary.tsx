import { Component, type ReactNode } from "react";
import styled from "styled-components";

import { TextButton } from "./TextButton";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

const FallbackStyled = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 1.75rem;
  text-transform: uppercase;
`;

// Shows a message with a reload button instead of a blank page when rendering throws
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <FallbackStyled role="alert">
        <Heading>Noget gik galt</Heading>
        <p>Elprisen kunne ikke vises. Prøv at genindlæse siden.</p>
        <TextButton type="button" onClick={() => window.location.reload()}>
          Genindlæs
        </TextButton>
      </FallbackStyled>
    );
  }
}
