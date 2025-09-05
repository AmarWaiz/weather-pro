import React from 'react';

type State = { error: Error | null; info?: React.ErrorInfo | null };

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { error: null, info: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ error, info });
    console.error('[App crashed]', error, info);
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ padding: 16 }}>
        <h1 style={{ color: '#b00020' }}>Something went wrong.</h1>
        <pre style={{ whiteSpace:'pre-wrap', background:'#fff4f4', border:'1px solid #f3caca', padding:12, borderRadius:8 }}>
{String(this.state.error?.message || this.state.error)}{this.state.info?.componentStack}
        </pre>
      </div>
    );
  }
}
