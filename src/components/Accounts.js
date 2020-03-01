import React, { Component } from "react";
import DaiAccount from "./DaiAccount";
import EthAccount from "./EthAccount";

import "./Accounts.css";

export default class Accounts extends Component {
  render() {
    return (
      <div className="Accounts">
        <div class="bx--grid">
          <div class="bx--row">
            <div class="bx--col">
              <DaiAccount />
            </div>
            <div class="bx--col">
              <EthAccount />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
