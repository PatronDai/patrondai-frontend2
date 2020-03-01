import React from "react";
import { Route } from "react-router-dom";
import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk";
import "./App.css";
import NavBar from "./components/NavBar";
import Accounts from "./components/Accounts";
import CreateNewForm from "./components/CreateNewForm";
import Projects from "./components/Projects";

import EthereumContext from "./contexts/EthereumContext";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provider: null,
      signer: null,
      account: null
    };
  }
  render() {
    return (
      <div className="App">
        <EthereumContext.Provider value={this.state}>
          <NavBar />
          <Accounts />
          <div>
            <Route exact path="/" component={Projects} />
            <Route path="/start" component={CreateNewForm} />
          </div>
        </EthereumContext.Provider>
      </div>
    );
  }
}

export default App;
