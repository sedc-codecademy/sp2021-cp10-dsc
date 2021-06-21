const VoiceRecognitionService = {
    voiceRecognitionBtn: document.getElementById(""),

    //Gets the voice input and returns a string
    voiceRecognition: function () {
        const recognition = new webkitSpeechRecognition();

        recognition.continuous = true;
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        this.voiceRecognition.addEventListener("click", function () {
            recognition.start();
        });

        recognition.onresult = function (e) {
            const transcript = e.results[e.results.length - 1]
            [0].transcript.trim();
        }
    }
};//PROPERTIES: Voice input button