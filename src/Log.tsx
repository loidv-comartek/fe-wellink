import React from "react";
import { Hook, Console } from "console-feed";

class Log extends React.Component {
  state = {
    logs: [],
  };

  componentDidMount() {
    Hook(
      window.console,
      (log) => {
        this.setState((s: any) => ({
          logs: [...s.logs, log],
        }));
      },
      false
    );
  }

  render() {
    return (
      <div style={{ backgroundColor: "#242424" }}>
        <Console logs={this.state.logs} variant="dark" />
      </div>
    );
  }
}

export default Log;
