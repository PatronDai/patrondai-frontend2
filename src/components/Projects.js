import React, { Component } from "react";
import EthereumContext from "../contexts/EthereumContext";
import { ethers } from "ethers";

export default class Projects extends Component {
  async componentDidMount() {
    this.contract = new ethers.Contract();
  }
  render() {
    return <div>test</div>;
  }
}

Projects.contextType = EthereumContext;
