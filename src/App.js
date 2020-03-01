import React from "react";
import { Route } from "react-router-dom";
import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk";
import "./App.css";
import NavBar from "./components/NavBar";
import Accounts from "./components/Accounts";
import CreateNewForm from "./components/CreateNewForm";
import Projects from "./components/Projects";

import EthereumContext from "./contexts/EthereumContext";
import Torus from "@toruslabs/torus-embed";
import { ethers } from "ethers";
const network = "rinkeby";
const torus = new Torus();
torus.init({ showTorusButton: false, network: { host: network } });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provider: new ethers.getDefaultProvider(network),
      signer: null,
      account: null,
      authInProgress: false,
      auth: () => {
        this.handleAuth();
      }
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
  handleAuth() {
    this.setState({ authInProgress: true });
    if (window.ethereum) this.handleMetamaskAuth();
    else this.handleTorusAuth();
    this.setState({ authInProgress: false });
  }
  async handleTorusAuth() {
    await torus.login();
  }
  async handleMetamaskAuth() {
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);
    this.setState({ provider, signer });
  }
}

export default App;
