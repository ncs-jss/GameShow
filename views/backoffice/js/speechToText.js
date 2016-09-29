function startDictation(elem) {

    if (window.hasOwnProperty('webkitSpeechRecognition')) {

      var recognition = new webkitSpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.lang = "en-IN";
      recognition.start();

      recognition.onresult = function(e) {
        document.querySelector(elem).value
                                 = e.results[0][0].transcript;
        recognition.stop();
        reply();
      };

      recognition.onerror = function(e) {
        recognition.stop();
      }

    }
  }
// startDictation()