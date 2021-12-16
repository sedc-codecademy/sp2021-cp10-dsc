//ONLY CALLS FOR THE FUNCTIONS THAT NEEDS TO BE EXECUTED AT START AND LISTEN FOR WINDOW EVENTS
let chatMinimize = document.getElementById("chatMinimize");
let chatMaximize = document.getElementById("chatMaximize");
let mainWindow = document.getElementById("mainWindow");
let maximizeSpeechBox = document.getElementById("maximizeSpeechBox");
let searchInputWrapper = document.getElementById("searchInputWrapper");
let isChatBotOpened = true;
let firstTimePageLoaded = true;

//Minimize event
chatMinimize.addEventListener("click", () => {
    if (isChatBotOpened) {
        chatMinimize.style.opacity = 0;
        mainWindow.style.height = 0;
        mainWindow.style.transition = "0.5s ease-in-out";
        mainWindow.style.visibility = "hidden";
        chatMaximize.style.visibility = "visible";
        chatMaximize.style.transform = "translateY(0rem)";
        searchInputWrapper.style.opacity = 0;
        chatMaximize.style.opacity = 1;
        isChatBotOpened = false;
        chatMaximize.classList.add("jello-horizontal");
        setTimeout(() => {
            if (!isChatBotOpened) {
                if (firstTimePageLoaded) {
                    maximizeSpeechBox.innerHTML = "Hey there partner! I'm the SEDC chatbot! Do you wanna talk?"
                } else {
                    maximizeSpeechBox.innerHTML = "I'll be here if you need me just click on my handsome face!"
                }
                firstTimePageLoaded = false;
                maximizeSpeechBox.style.display = "flex";
                setTimeout(() => {
                    maximizeSpeechBox.style.display = "none";
                }, 4000);
            }
        }, 1500);
        UiService.HTMLScrollCheck();
    }
});

//Maximize event
chatMaximize.addEventListener("click", () => {
    if (!isChatBotOpened) {
        mainWindow.style.display = "block";
        chatMaximize.classList.remove("jello-horizontal");
        maximizeSpeechBox.style.display = "none";
        setTimeout(() => {
            window.innerWidth < 821 ? mainWindow.style.height = "100%" : mainWindow.style.height = "80%";
            UiService.HTMLScrollCheck();
            mainWindow.style.transition = "0.5s ease-in-out";
            mainWindow.style.visibility = "visible";
        }, 500);
        setTimeout(() => {
            chatMinimize.style.opacity = 1;
            searchInputWrapper.style.opacity = 1;
        }, 1000);
        chatMaximize.style.transform = "translateY(-137.5rem)";
        chatMaximize.style.visibility = "hidden";
        chatMaximize.style.opacity = 0;
        isChatBotOpened = true;
    }
});

//Modal close on button
ApplyService.closeModalButton.addEventListener("click", () => {
    ApplyService.myModal.style.display = "none";
});

//Modal close on side
window.addEventListener("click", (event) => {
    if (event.target == ApplyService.myModal) {
        ApplyService.closeModalButton.click();
    }
});

//Chat Window scroll into view on screen resize
window.addEventListener("resize", () => {
    AnimationsService.onResizeQuizzes();
    ButtonsService.buttonsDiv.scrollIntoView({ block: 'end', behavior: 'smooth' });

    UiService.HTMLScrollCheck();

    if (window.innerWidth < 821) {
        mainWindow.style.height = "100%"
        AnimationsService.chatName.style.marginTop = "0rem";
        UiService.toggleDisplayView(QuizzesService.QuizzesWindow, AnimationsService.chatWindow);
        ApplyService.closeModalButton.click();
    } else {
        mainWindow.style.height = "80%";
        AnimationsService.chatName.style.marginTop = "0.9rem";
    }
})

//Changes the voice button to a send button and reverse
SearchInputService.input.addEventListener("input", function () {
    VoiceRecognitionService.voiceRecognitionBtn.style.display = "none";
    SearchInputService.inputButton.style.display = "block";
    if (SearchInputService.input.value === "") {
        SearchInputService.inputButton.style.display = "none";
        VoiceRecognitionService.voiceRecognitionBtn.style.display = "block";
    }
});

// Check if the browser is firefox and disables voice input feature
let ua = navigator.userAgent.toLowerCase();
if (ua.indexOf('firefox') > -1) {
    VoiceRecognitionService.voiceRecognitionBtn.style.display = "none";
    SearchInputService.inputButton.style.display = "block";
    VoiceRecognitionService.voiceRecognitionBtn.style.backgroundImage = "url(./src/img-avatars/send.svg)";
    VoiceRecognitionService.voiceRecognitionBtn.addEventListener("click", SearchInputService.inputButton.click);
} else {
    VoiceRecognitionService.voiceRecognition();
}

//Quizzes form submit
QuizzesService.form.addEventListener('submit', QuizzesService.checkRightAnswers);

mainWindow.style.display = "none";
window.addEventListener("load", chatMinimize.click());

DataService.getDataAsync();

UiService.firstMessage();

SearchInputService.getSearchInput();

QuizzesService.printQuizzesMenu();