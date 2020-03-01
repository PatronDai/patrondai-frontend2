import React from "react";
import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk";
import { Button } from "carbon-components-react";
import "./App.css";
import NavBar from "./components/NavBar";
import Accounts from "./components/Accounts";
import CreateNewForm from "./components/CreateNewForm";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Accounts />

        <CreateNewForm />
      </div>
    );
  }
  handleBuy() {
    new RampInstantSDK({
      hostAppName: "PatronDai",
      hostLogoUrl:
        "https://cdn-images-1.medium.com/max/2600/1*nqtMwugX7TtpcS-5c3lRjw.png",
      swapAmount: "1000000000000000000",
      swapAsset: "DAI",
      userAddress: "0x83dA1fAe7e4ab4050dA61509F410b85Ae68149b9",
      //url: "https://ri-widget-staging.firebaseapp.com/", // only specify the url if you want to use testnet widget versions,
      // use variant: 'auto' for automatic mobile / desktop handling,
      // 'hosted-auto' for automatic mobile / desktop handling in new window,
      // 'mobile' to force mobile version
      // 'desktop' to force desktop version (default)
      variant: "auto"
    })
      .on("*", console.log)
      .show();
  }
}

export default App;
