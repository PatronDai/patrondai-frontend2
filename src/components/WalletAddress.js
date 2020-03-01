import React, { Component } from "react";
import EthereumContext from "../contexts/EthereumContext";

export default class WalletAddress extends Component {
  render() {
    return (
      <div style={{ padding: 20, opacity: 0.5 }}>
        {this.context.address ? this.context.address : "no wallet connected"}
      </div>
    );
  }
}

WalletAddress.contextType = EthereumContext;
