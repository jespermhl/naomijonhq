"use client";

import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-screen items-center justify-center p-8 text-center">
            <div className="rounded-card border border-border-glass bg-bg-surface p-8 shadow-card backdrop-blur-md">
              <h2 className="text-brand-red mb-2 text-2xl font-black">Something went wrong</h2>
              <p className="text-text-muted mb-4 text-sm font-semibold">
                An unexpected error occurred. Please try refreshing the page.
              </p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="bg-brand-btn cursor-pointer rounded-full px-6 py-2 text-sm font-black text-on-brand transition-all hover:scale-105"
              >
                Try again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
