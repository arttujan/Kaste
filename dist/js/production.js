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
// Add here the endpoints for MS Graph API services you would like to use.
const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
videojs.getPlayer('myPlayerID').ready(function () {
    // +++ Initialize variables and check for mobile device +++
    var player = this,
      playerContainer = document.getElementById('videoContainer'),
      isMobile = (/Android|webOS|iPhone|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)) ? true : false;
    
    if (isMobile) {
      // +++ Define a modal close button +++
      var CloseModal = videojs.getComponent('button');
      var CloseModal_ = videojs.extend(CloseModal, {
        constructor: function () {
          CloseModal.apply(this, arguments);
          this.addClass('vjs-close-modal');
          this.controlText('Close video');
        },
        handleClick: function () {
          playerContainer.style.maxWidth = '286px';
        }
      });
      
      videojs.registerComponent('CloseModal', CloseModal_);
      player.addChild('CloseModal', {});
      
      // +++ When playback begins, enter full width mode +++
      player.on('play', function () {
        playerContainer.style.width = '100%';
        playerContainer.style.maxWidth = '';
      });
    }
});