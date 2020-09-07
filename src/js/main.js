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