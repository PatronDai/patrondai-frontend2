import React, { Component } from "react";

import PatronDaiCampaign from "patrondai-contracts/build/contracts/PatronDaiCampaign.json";
import { ethers } from "ethers";
import EthereumContext from "../contexts/EthereumContext";
import { withRouter } from "react-router";

class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null
    };
  }
  async componentDidMount() {
    const address = await this.props.registry.getCampaign(this.props.index);
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
    if (!this.state.data) return "";
    return (
      <div
        onClick={() => {
          this.props.history.push("/campaign/" + this.state.address);
        }}
        class="bx--tile"
        style={{
          textAlign: "left",
          width: "33%",
          margin: 10,
          cursor: "pointer"
        }}
      >
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
              this.state.data.url ? this.state.data.url : this.state.data.image
            }
          />
        </div>
        <div style={{ opacity: 0.5, padding: 4 }}>{this.state.address}</div>
      </div>
    );
  }
}

ProjectCard.contextType = EthereumContext;

export default withRouter(ProjectCard);
