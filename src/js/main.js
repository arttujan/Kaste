// if(document.getElementById('myPlayerID') != null) {
//   videojs.getPlayer('myPlayerID').ready(function () {
//       // +++ Initialize variables and check for mobile device +++
//       var player = this,
//         playerContainer = document.getElementById('videoContainer'),
//         isMobile = (/Android|webOS|iPhone|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)) ? true : false;
      
//       if (isMobile) {
//         // +++ Define a modal close button +++
//         var CloseModal = videojs.getComponent('button');
//         var CloseModal_ = videojs.extend(CloseModal, {
//           constructor: function () {
//             CloseModal.apply(this, arguments);
//             this.addClass('vjs-close-modal');
//             this.controlText('Close video');
//           },
//           handleClick: function () {
//             playerContainer.style.maxWidth = '286px';
//           }
//         });
        
//         videojs.registerComponent('CloseModal', CloseModal_);
//         player.addChild('CloseModal', {});
        
//         // +++ When playback begins, enter full width mode +++
//         player.on('play', function () {
//           playerContainer.style.width = '100%';
//           playerContainer.style.maxWidth = '';
//         });
//       }
//   });
// }
$(() => {

  // Player
  if (flvjs.isSupported()) {
    let videoElement = document.getElementById('myPlayerID');
    let flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: 'http://localhost:8000/live/live.flv'
    });
    
    flvPlayer.attachMediaElement(videoElement);
    flvPlayer.load();
    flvPlayer.play();
    
  }

  // Example for getting data from api
  

    $.get('/api/question', data => {
      if(document.getElementById('question_text') != null) 
      {
        $('#question_text').html(data[0].question)
        $('#question_text').removeClass('hidden')
      }
      
      if(document.getElementById('answers') != null) 
      {
        if(data[0].answers.length > 0) {
          // TÄSSÄ MYÖS SETTIMEOUT
         
          data[0].answers.map((a, i) => {
            //console.log(a)
            // THIS CORRECT PART IS REALY STUPID AND SHOULD DEFINITELY NOT BE SHOWN FOR THE END USER IN PRODUCTION
            // MADE FOR JUST DEMO PURPOSES
            $('#answers').append('<li><button correct="' + a.correct + '"class="answer buttonstyle1" id="answer-' + i + '">' + a.answer + '</button></li>')
          })
          
        }
      }
    }).then(data => {
      addAnswerClickListeners();
    })

  

  if(document.getElementById('submitAnswer') != null) 
  {
    let answers = []
    $('#submitAnswer').on('click', (e) => {
      e.preventDefault()
      answers.push({answer : $('#answer_name').val(), correct : $("#correct").is(':checked')})
      var answersTable = $('#answers_table')
      answersTable.append('<li correct="' + $('#correct').is(':checked') + '">' + $('#answer_name').val() + '</li>')

    })
  }
  if(document.getElementById('submit_question') != null) {
    $('#submit_question').on('click', (e) => {
      e.preventDefault();
      if(answers.length > 0 && $('#question_name').val().length > 3) {
        
        $.ajax({
          url:"api/question",
          type:"POST",
          headers: { 
            "Accept" : "application/json; charset=utf-8",
            "Content-Type": "application/json; charset=utf-8"
          },
          data:JSON.stringify({ question : $('#question_name').val(), answers : answers, order : 1}),
          dataType:"json",
          success: (d) => {
            console.log(d)
          }
        })
      } 
    })
  }
  var i = 0;
  var move = () => {
    if (i == 0) {
      i = 1;
      let elem = document.getElementById("progressbar");
      let width = 0;
      let id = setInterval(frame, 300);
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          elem.style.width = width + "%";
          //elem.innerHTML = width + "%";
        }
      }
    }
  }
  
  move();
  
})

var addAnswerClickListeners = () => {
  $('.answer').on('click', (e) => {
    /* SHOULD NOT BE DONE LIKE THIS, ONLY FOR DEMOPURPOSES.
      SHOULD BE CALLING FOR API TO GET RIGHT ANWER
    */

    let btn = e.target
    let correct = $(btn).attr('correct')
    
    if(correct === 'true') {
      $('#answer_right').removeClass('hidden')

      setTimeout(() => {
        $('#answer_right').addClass('hidden')
      }, 2500);

    }else {

      $('#answer_wrong').removeClass('hidden')

      setTimeout(() => {
        $('#answer_wrong').addClass('hidden')
      }, 2500)


    }

    // Must write code that displays right/wrong mark

  })

}