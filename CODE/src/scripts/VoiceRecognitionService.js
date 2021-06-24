const VoiceRecognitionService = {
    voiceRecognitionBtn: document.getElementById("voiceButton"),
    voiceRecognitionLoader: document.getElementById("voiceRecognitionLoader"),
    clickCounter: 0,

    //Gets the voice input and returns a string
    voiceRecognition: function () {
        const recognition = new webkitSpeechRecognition();

        recognition.continuous = true;
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        this.voiceRecognitionBtn.addEventListener("click", function () {
            VoiceRecognitionService.clickCounter++;
            if (VoiceRecognitionService.clickCounter % 2 === 1) {
                recognition.start();
                SearchInputService.input.disabled = true;
                VoiceRecognitionService.voiceRecognitionLoader.style.display = "block";
                VoiceRecognitionService.voiceRecognitionBtn.style.backgroundImage = "url(./src/img-avatars/muted.svg)";
            } else {
                recognition.stop();
                VoiceRecognitionService.voiceRecognitionLoader.style.display = "none";
                SearchInputService.input.disabled = false;
                VoiceRecognitionService.voiceRecognitionBtn.style.backgroundImage = "url(./src/img-avatars/mic.svg)";
            }

            recognition.addEventListener("end", function () {
                if (VoiceRecognitionService.clickCounter % 2 === 1) { VoiceRecognitionService.clickCounter--; }

                VoiceRecognitionService.voiceRecognitionBtn.style.backgroundImage = "url(./src/img-avatars/mic.svg)";
                VoiceRecognitionService.voiceRecognitionLoader.style.display = "none";
            })
        }
        );

        recognition.onresult = function (e) {
            ApplyAndPriceService.closeModalButton.click();
            const transcript = e.results[e.results.length - 1]
            [0].transcript.trim();
            const transcriptUpperCase = transcript.charAt(0).toUpperCase() + transcript.slice(1);
            SearchInputService.SearchInputLogic(transcriptUpperCase);
        }
    }
};//PROPERTIES: Voice input button