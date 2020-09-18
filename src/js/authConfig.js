// Config object to be passed to Msal on creation
const msalConfig = {
    auth: {
      clientId: "b23bcd24-02ec-4176-85b9-6f0050400394",
      authority: "b6d5681b-4a40-4d3a-8e7b-03a70d3991b6",
      redirectUri: "http://localhost:3000/",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  console.log('heippa maailma')