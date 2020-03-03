import React, { Component } from "react";
import { Button } from "carbon-components-react";

import rampProps from "../rampProps";
import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk";
import EthereumContext from "../contexts/EthereumContext";
import { ethers } from "ethers";
import IERC20 from "patrondai-contracts/build/contracts/IERC20.json";

export default class DaiAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: "???"
    };
  }
  async componentDidMount() {
    this.contract = new ethers.Contract(
      "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea",
      IERC20.abi,
      this.context.provider
    );
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
        await this.contract.balanceOf(this.context.address)
      )
    });
  }
  render() {
    return (
      <div className="bx--tile">
        <div style={{ fontSize: 32 }}>{this.state.balance} DAI</div>
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
      swapAsset: "DAI",
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

DaiAccount.contextType = EthereumContext;
