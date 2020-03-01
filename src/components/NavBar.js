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

export default class NavBar extends Component {
  render() {
    return (
      <Header aria-label="PatronDai">
        <HeaderName href="#" prefix="EthLondonUK">
          PatronDai
        </HeaderName>
        <HeaderNavigation aria-label="IBM [Platform]">
          <HeaderMenuItem href="#">Browse projects</HeaderMenuItem>
          <HeaderMenuItem href="#">Start your own campaign</HeaderMenuItem>
        </HeaderNavigation>
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="App Switcher" onClick={() => {}}>
            <Exit20 />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    );
  }
}
