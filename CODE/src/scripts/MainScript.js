//ONLY CALLS FOR THE FUNCTIONS THAT NEEDS TO BE EXECUTED AT START AND HAVE THE MAXIMIZE AND MINIMIZE FEATURE
let chatMinimize = document.getElementById("chatMinimize");
let chatMaximize = document.getElementById("chatMaximize");
let mainWindow = document.getElementById("mainWindow");
let isChatBotOpened = true;

//Minimize event
chatMinimize.addEventListener("click", () => {
    if (isChatBotOpened) {
        mainWindow.style.height = 0;
        mainWindow.style.transition = "0.5s ease-in-out";
        mainWindow.style.visibility = "hidden";
        chatMaximize.style.visibility = "visible";
        chatMaximize.style.transform = "translateY(0rem)";
        chatMaximize.style.opacity = 1;
        isChatBotOpened = false;
        chatMaximize.classList.add("jello-horizontal");
    }
});

//Maximize event
chatMaximize.addEventListener("click", () => {
    if (!isChatBotOpened) {
        chatMaximize.classList.remove("jello-horizontal");
        setTimeout(() => {
            window.innerWidth < 821 ? mainWindow.style.height = "100%" : mainWindow.style.height = "80%";
            mainWindow.style.transition = "0.5s ease-in-out";
            mainWindow.style.visibility = "visible";
        }, 500);
        chatMaximize.style.transform = "translateY(-137.5rem)";
        chatMaximize.style.visibility = "hidden";
        chatMaximize.style.opacity = 0;
        isChatBotOpened = true;
    }
});

//Modal close on button
ApplyAndPriceService.closeModalButton.addEventListener("click", () => {
    ApplyAndPriceService.myModal.style.display = "none";
});

//Modal close on side
window.addEventListener("click", (event) => {
    if (event.target == ApplyAndPriceService.myModal) {
        ApplyAndPriceService.myModal.style.display = "none";
    }
});

//Chat Window scroll into view on screen resize
window.addEventListener("resize", () => {
    AnimationsService.onResizeGamesAndQuizzes();
    ButtonsService.buttonsDiv.scrollIntoView({ block: 'end', behavior: 'smooth' });
    UiService.recommendedDiv.scrollIntoView({ block: 'end', behavior: 'smooth' });

    if (window.innerWidth < 821) {
        UiService.toggleDisplayView(QuizzesService.gamesAndQuizzesWindow, AnimationsService.chatWindow);
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

QuizzesService.form.addEventListener('submit', QuizzesService.checkRightAnswers);

DataService.getDataAsync();

DataService.fetchQuizzes();

UiService.firstMessage();

SearchInputService.getSearchInput();

QuizzesService.printQuizzesMenu();

GamesService.printGamesMenu();



let ua = navigator.userAgent.toLowerCase();
if (ua.indexOf('firefox') > -1 && window.innerWidth < 820) {
    VoiceRecognitionService.voiceRecognitionBtn.style.display = "none";
    SearchInputService.inputButton.style.display = "block";
    VoiceRecognitionService.voiceRecognitionBtn.style.backgroundImage = "url(./src/img-avatars/send.svg)";
    VoiceRecognitionService.voiceRecognitionBtn.addEventListener("click", SearchInputService.inputButton.click);
} else {
    VoiceRecognitionService.voiceRecognition();
}