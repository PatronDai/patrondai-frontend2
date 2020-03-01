import React, { Component } from "react";
import { Button } from "carbon-components-react";

import rampProps from "../rampProps";
import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk";
import EthereumContext from "../contexts/EthereumContext";

export default class DaiAccount extends Component {
  render() {
    return (
      <div class="bx--tile">
        <div style={{ fontSize: 32 }}>0 DAI</div>
        <Button style={{ margin: 10 }} onClick={() => this.handleBuy()}>
          Buy more
        </Button>
        <Button style={{ margin: 10 }} onClick={() => this.handleBuy()}>
          Transfer in or out
        </Button>
      </div>
    );
  }
  handleBuy() {
    new RampInstantSDK({
      ...rampProps,
      swapAsset: "DAI",
      userAddress: this.context.account,
      //url: "https://ri-widget-staging.firebaseapp.com/", // only specify the url if you want to use testnet widget versions,
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
