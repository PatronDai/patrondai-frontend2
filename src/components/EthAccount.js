import React, { Component } from "react";
import { Button } from "carbon-components-react";

import rampProps from "../rampProps";
import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk";
import EthereumContext from "../contexts/EthereumContext";
import { ethers } from "ethers";

export default class EthAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: "???"
    };
  }
  async componentDidMount() {
    this.interval = setInterval(() => this.refresh(), 5000);
    this.refresh();
  }
  async componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }
  async refresh() {
    if (!this.context.address) return;
    this.setState({
      balance: ethers.utils.formatEther(
        await this.context.provider.getBalance(this.context.address)
      )
    });
  }
  render() {
    return (
      <div className="bx--tile">
        <div style={{ fontSize: 32 }}>{this.state.balance} ETH</div>
        <Button style={{ margin: 10 }} onClick={() => this.handleBuy()}>
          Buy more
        </Button>
        <Button style={{ margin: 10 }}>Transfer in or out</Button>
      </div>
    );
  }
  handleBuy() {
    new RampInstantSDK({
      ...rampProps,
      swapAsset: "ETH",
      userAddress: this.context.account,
      url: "https://ri-widget-staging.firebaseapp.com/", // only specify the url if you want to use testnet widget versions,
      // use variant: 'auto' for automatic mobile / desktop handling,
      // 'hosted-auto' for automatic mobile / desktop handling in new window,
      // 'mobile' to force mobile version
      // 'desktop' to force desktop version (default)
      variant: "auto"
    })
      .on("*", console.log)
      .show();
  }
}

EthAccount.contextType = EthereumContext;
