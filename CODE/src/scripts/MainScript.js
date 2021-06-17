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
            window.innerWidth < 821 ? mainWindow.style.height = "100%": mainWindow.style.height = "80%";
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
    if (event.target === GamesService.myModalGame) {
        GamesService.myModalGame.style.display = "none";
    }
});

//GameModal close on button
GamesService.closeModalGame.addEventListener("click", () => {
    GamesService.myModalGame.style.display = "none";
});

//Chat Window scroll into view on screen resize
window.addEventListener("resize", () => {
    AnimationsService.onResizeGamesAndQuizzes();
    ButtonsService.buttonsDiv.scrollIntoView({ block: 'end', behavior: 'smooth' });
    UiService.recommendedDiv.scrollIntoView({ block: 'end', behavior: 'smooth' });
})

DataService.getDataAsync();

UiService.firstMessage();

SearchInputService.getSearchInput();

QuizzesService.printQuizzesMenu();

GamesService.printGamesMenu();