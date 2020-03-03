import React, { Component } from "react";
import EthereumContext from "../contexts/EthereumContext";
import { ethers } from "ethers";

import RinkebyEnv from "patrondai-contracts/.openzeppelin/rinkeby.json";
import PatronDaiCampaignsRegistry from "patrondai-contracts/build/contracts/PatronDaiCampaignsRegistry.json";
import ProjectCard from "./ProjectCard";

export default class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignsCount: 0
    };
  }
  async componentDidMount() {
    this.contract = new ethers.Contract(
      RinkebyEnv.proxies[
        "squirvels-contracts/PatronDaiCampaignsRegistry"
      ][0].address,
      PatronDaiCampaignsRegistry.abi,
      this.context.provider
    );
    this.setState({
      campaignsCount: (await this.contract.getCampaignsCount()).toNumber()
    });
  }
  render() {
    const projectIndexes = [
      ...new Array(this.state.campaignsCount).keys()
    ].reverse();
    return (
      <div
        style={{
          padding: "0 22px",
          display: "block",
          justifyContent: "center"
        }}
      >
        {projectIndexes.map(e => (
          <ProjectCard key={e} index={e} registry={this.contract} />
        ))}
      </div>
    );
  }
}

Projects.contextType = EthereumContext;
