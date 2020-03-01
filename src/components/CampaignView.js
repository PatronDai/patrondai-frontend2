import React, { Component } from "react";

import RinkebyEnv from "patrondai-contracts/.openzeppelin/rinkeby.json";
import PatronDaiCampaignsRegistry from "patrondai-contracts/build/contracts/PatronDaiCampaignsRegistry.json";
import PatronDaiCampaign from "patrondai-contracts/build/contracts/PatronDaiCampaign.json";
import { ethers } from "ethers";
import EthereumContext from "../contexts/EthereumContext";

export default class CampaignView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null
    };
  }
  async componentDidMount() {
    this.registry = new ethers.Contract(
      RinkebyEnv.proxies[
        "squirvels-contracts/PatronDaiCampaignsRegistry"
      ][0].address,
      PatronDaiCampaignsRegistry.abi,
      this.context.provider
    );
    const address = this.props.match.params.address;
    this.contract = new ethers.Contract(
      address,
      PatronDaiCampaign.abi,
      this.context.provider
    );
    const data = await fetch(
      "https://centralization.sucks.af/api/campaign/" + address
    ).then(r => r.json());
    this.setState({ address, data: data.data });
  }
  render() {
    if (!this.state.data) return "Loading...";
    return (
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col">
            <div style={{ padding: 4 }}>
              <h3>{this.state.data.title}</h3>
            </div>
            <div style={{ padding: 4 }}>
              <h4>{this.state.data.description}</h4>
            </div>
            <div className="ProjectCard-image" style={{ padding: 4 }}>
              <img
                style={{ width: 300, height: 200, objectFit: "cover" }}
                src={
                  this.state.data.url
                    ? this.state.data.url
                    : this.state.data.image
                }
              />
            </div>
            <div style={{ opacity: 0.5, padding: 4 }}>{this.state.address}</div>
          </div>
        </div>
      </div>
    );
  }
}

CampaignView.contextType = EthereumContext;
