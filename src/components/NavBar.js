import React, { Component } from "react";

import {
  Header,
  HeaderName,
  HeaderMenu,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction
} from "carbon-components-react/lib/components/UIShell";

import Exit20 from "@carbon/icons-react/lib/exit/20";
import Person20 from "@carbon/icons-react/lib/person/20";
import Settings20 from "@carbon/icons-react/lib/settings/20";
import { Link } from "react-router-dom";
import HeaderLink from "./HeaderLink";
import EthereumContext from "../contexts/EthereumContext";

export default class NavBar extends Component {
  render() {
    return (
      <Header aria-label="PatronDai">
        <HeaderName href="/" prefix="Eth">
          PatronDai
        </HeaderName>
        <HeaderNavigation style={{ display: "block" }}>
          <HeaderLink to="/">Browse</HeaderLink>
          <HeaderLink to="/start">Start</HeaderLink>
        </HeaderNavigation>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label="App Switcher"
            onClick={() => {
              if (!this.context.authInProgress) this.context.auth();
            }}
          >
            {!this.context.authInProgress ? (
              <>{this.context.signer ? <Exit20 /> : <Person20 />}</>
            ) : (
              <Settings20 />
            )}
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    );
  }
}

NavBar.contextType = EthereumContext;
