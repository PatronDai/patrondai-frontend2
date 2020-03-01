import React, { Component } from "react";

import "./CreateNewForm.css";
import EthereumContext from "../contexts/EthereumContext";
import RinkebyEnv from "patrondai-contracts/.openzeppelin/rinkeby.json";
import PatronDaiCampaignsRegistry from "patrondai-contracts/build/contracts/PatronDaiCampaignsRegistry.json";
import { ethers } from "ethers";

export default class CreateNewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      image: ""
    };
  }
  render() {
    return (
      <div className="CreateNewForm">
        <div className="bx--form-item">
          <label for="text-input-3" className="bx--label">
            Site name
          </label>
          <div className="bx--form__helper-text">The title of your site.</div>
          <input
            id="text-input-3"
            type="text"
            className="bx--text-input"
            placeholder="Hey, I'm Peter and I'm a YouTube streamer"
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
        </div>
        <div className="bx--form-item">
          <label for="text-area-2" className="bx--label">
            Description
          </label>
          <div className="bx--form__helper-text">
            Please shortly describe what you do and why you need the funds.
          </div>
          <textarea
            id="text-area-2"
            className="bx--text-area"
            rows="4"
            cols="50"
            placeholder="Placeholder text."
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
          ></textarea>
        </div>
        <div className="bx--form-item">
          <label for="text-input-4" className="bx--label">
            Image link
          </label>
          <div className="bx--form__helper-text">Picture for your site.</div>
          <input
            id="text-input-4"
            type="text"
            className="bx--text-input"
            placeholder="https://imgur.com/...."
            value={this.state.image}
            onChange={e => this.setState({ image: e.target.value })}
          />
        </div>
        <div className="bx--form-item">
          <button
            className="bx--btn bx--btn--primary"
            type="button"
            onClick={async () => {
              const contract = new ethers.Contract(
                RinkebyEnv.proxies[
                  "squirvels-contracts/PatronDaiCampaignsRegistry"
                ][0].address,
                PatronDaiCampaignsRegistry.abi,
                this.context.signer
              );
              let tx = await contract.registerCampaign();
              const txReceipt = await tx.wait();
              console.log(txReceipt.logs);
              const decodedEvents = new ethers.utils.defaultAbiCoder.decode(
                ["uint256", "address"],
                txReceipt.logs[1].data
              );
              console.log(decodedEvents);
              let signature = await this.context.signer.signMessage(
                JSON.stringify(this.state)
              );
              const response = await fetch(
                "https://centralization.sucks.af/api/campaign/" +
                  decodedEvents[1],
                {
                  method: "POST", // *GET, POST, PUT, DELETE, etc.
                  mode: "cors", // no-cors, *cors, same-origin
                  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                  credentials: "same-origin", // include, *same-origin, omit
                  headers: {
                    "Content-Type": "application/json"
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  redirect: "follow", // manual, *follow, error
                  referrerPolicy: "no-referrer", // no-referrer, *client
                  body: JSON.stringify({ data: this.state, signature }) // body data type must match "Content-Type" header
                }
              );
              alert(await response.json());
            }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

CreateNewForm.contextType = EthereumContext;
