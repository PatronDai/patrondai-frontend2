const React = require("react");

export default React.createContext({
  provider: null,
  signer: null,
  account: null,
  authInProgress: false,
  auth: () => {}
});
