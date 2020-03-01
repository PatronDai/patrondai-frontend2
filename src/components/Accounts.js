import React, { Component } from "react";
import DaiAccount from "./DaiAccount";
import EthAccount from "./EthAccount";

import "./Accounts.css";

export default class Accounts extends Component {
  render() {
    return (
      <div className="Accounts">
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--col">
              <DaiAccount />
            </div>
            <div className="bx--col">
              <EthAccount />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
