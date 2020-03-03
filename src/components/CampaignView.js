import React, { Component } from "react";

import RinkebyEnv from "patrondai-contracts/.openzeppelin/rinkeby.json";
import PatronDaiCampaignsRegistry from "patrondai-contracts/build/contracts/PatronDaiCampaignsRegistry.json";
import PatronDaiCampaign from "patrondai-contracts/build/contracts/PatronDaiCampaign.json";
import CErc20 from "patrondai-contracts/build/contracts/CErc20.json";
import IERC20 from "patrondai-contracts/build/contracts/IERC20.json";
import { ethers } from "ethers";
import EthereumContext from "../contexts/EthereumContext";
import { Button } from "carbon-components-react";

export default class CampaignView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      raisedDai: "???"
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

    const cDaiAddress = await this.contract.getCDaiAddress();

    const cDaiContract = new ethers.Contract(
      cDaiAddress,
      CErc20.abi,
      this.context.provider
    );

    const daiAddress = await this.contract.getDaiAddress();
    const data = await fetch(
      "https://centralization.sucks.af/api/campaign/" + address
    ).then(r => r.json());
    this.setState({ address, data: data.data, daiAddress });
    this.refresh();
    this.interval = setInterval(() => this.refresh(), 5000);
    this.refresh();
  }
  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }
  async refresh() {
    const raisedDai = await this.contract.getDaiRaised();
    this.setState({ raisedDai: ethers.utils.formatEther(raisedDai) });
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

          <div
            class="bx--col"
            style={{ display: this.context.signer ? "block" : "none" }}
          >
            <Button
              style={{ marginRight: 10, marginBottom: 10 }}
              onClick={() => {
                const scontract = new ethers.Contract(
                  this.state.daiAddress,
                  IERC20.abi,
                  this.context.signer
                );
                scontract
                  .approve(
                    this.state.address,
                    ethers.utils.parseEther("1000000000000")
                  )
                  .catch(alert);
              }}
            >
              Set allowance
            </Button>
            <Button
              style={{ marginRight: 10, marginBottom: 10 }}
              onClick={() => {
                const scontract = new ethers.Contract(
                  this.state.address,
                  PatronDaiCampaign.abi,
                  this.context.signer
                );
                scontract
                  .support(ethers.utils.parseEther(prompt("How much?")))
                  .catch(alert);
              }}
            >
              Support
            </Button>
            <Button
              style={{ marginRight: 10, marginBottom: 10 }}
              onClick={() => {
                const scontract = new ethers.Contract(
                  this.state.address,
                  PatronDaiCampaign.abi,
                  this.context.signer
                );
                scontract
                  .stopSupporting(ethers.utils.parseEther(prompt("How much?")))
                  .catch(alert);
              }}
            >
              Stop supporting
            </Button>
            <Button
              style={{ marginRight: 10, marginBottom: 10 }}
              onClick={() => {
                const scontract = new ethers.Contract(
                  this.state.address,
                  PatronDaiCampaign.abi,
                  this.context.signer
                );
                scontract
                  .withdraw(ethers.utils.parseEther(prompt("How much?")))
                  .catch(alert);
              }}
            >
              Withdraw
            </Button>
            <div>Dai in contract: {this.state.raisedDai}</div>
          </div>
        </div>
      </div>
    );
  }
}

CampaignView.contextType = EthereumContext;
