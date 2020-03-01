import React, { Component } from "react";

import "./CreateNewForm.css";

export default class CreateNewForm extends Component {
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
          />
        </div>
        <div className="bx--form-item">
          <button className="bx--btn bx--btn--primary" type="button">
            Submit
          </button>
        </div>
      </div>
    );
  }
}
