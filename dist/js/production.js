const msalConfig={auth:{clientId:"b23bcd24-02ec-4176-85b9-6f0050400394",authority:"b6d5681b-4a40-4d3a-8e7b-03a70d3991b6",redirectUri:"http://localhost:3000/"},cache:{cacheLocation:"sessionStorage",storeAuthStateInCookie:!1}};console.log("heippa maailma");const graphConfig={graphMeEndpoint:"https://graph.microsoft.com/v1.0/me"};videojs.getPlayer("myPlayerID").ready((function(){var e=document.getElementById("videoContainer");if(!!/Android|webOS|iPhone|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)){var o=videojs.getComponent("button"),t=videojs.extend(o,{constructor:function(){o.apply(this,arguments),this.addClass("vjs-close-modal"),this.controlText("Close video")},handleClick:function(){e.style.maxWidth="286px"}});videojs.registerComponent("CloseModal",t),this.addChild("CloseModal",{}),this.on("play",(function(){e.style.width="100%",e.style.maxWidth=""}))}}));