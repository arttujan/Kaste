// Config object to be passed to Msal on creation
const msalConfig = {
    auth: {
      clientId: "c666fc28-6a50-4e9e-bf88-fc4bb4138e4c",
      authority: "b6d5681b-4a40-4d3a-8e7b-03a70d3991b6",
      redirectUri: "https://www.kaste.app",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };