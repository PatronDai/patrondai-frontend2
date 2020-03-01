import React, { Component } from "react";
import { Button } from "carbon-components-react";

export default class EthAccount extends Component {
  render() {
    return (
      <div class="bx--tile">
        <div style={{ fontSize: 32, paddingBottom: 16 }}>0 ETH</div>
        <Button style={{ marginRight: 10 }} onClick={() => this.handleBuy()}>
          Buy more
        </Button>
        <Button onClick={() => this.handleBuy()}>Transfer in or out</Button>
      </div>
    );
  }
}
