const UiService = {
    chatHistory: document.getElementById("chatHistory"),
    modalContent: document.getElementById("modalContent"),

    //Prints the very first message for the user
    firstMessage: function () {
        this.chatHistory.innerHTML = `
        <div class="greetingMessage">Welcome to the<br>
         Seavus Education Chat Bot!</div>
         <div class="greetingMessageQue">How can I help you?</div>
         <hr class="chat-js-hr">`;
    },

    //Prints a user message and random bot message in chat history(Depending on the choice)
    replyMessages: function (elementName, elementMessages) {
        ButtonsService.buttonsDiv.innerHTML = "";

        const randomIndex = Math.floor(Math.random() * elementMessages.length);
        const item = elementMessages[randomIndex];

        this.chatHistory.innerHTML += `
        <div chatBotName>
            <span class="chatUserYou">You</span>
            <div class="chatBubblesUser">${elementName}</div>
        </div>`;
        this.toggleLoader();
        UiService.sleep().then(() => {
            this.chatHistory.innerHTML += `
            <div>
                <span class="chatBotName">Haralampiye</span>
                <div class="chatBubblesBot">${item}</div>
            </div>`;
            chatHistory.scrollIntoView({ block: 'end', behavior: 'smooth' });
        });
    },

    //Print the actual required INFO name and message
    replyInfoMessage: function (infoName, infoMessage) {
        ButtonsService.buttonsDiv.innerHTML = "";

        this.chatHistory.innerHTML += `
        <div >
            <span class="chatUserYou">You</span>
            <div class="chatBubblesUser">${infoName}</div>
        </div>`
        this.toggleLoader();
        UiService.sleep().then(() => {
            this.chatHistory.innerHTML += `
            <div>
                <span class="chatBotName">Haralampiye</span>
                <div class="chatBubblesBot">${infoMessage}</div>
            </div>`;
            chatHistory.scrollIntoView({ block: 'end', behavior: 'smooth' });
        });
    },

    //Prints the INFO for the Object
    printAcademyInfo: function (neededInfo, searchInput) {
        AnimationsService.headerAnimation();
        let = studyProgram = DataService.cachedData;
        debugger;
        console.log(neededInfo, searchInput);
        if (studyProgram[neededInfo.toLowerCase().replace(/\s/g, "")] !== undefined || neededInfo === "Price") {
            UiService.replyInfoMessage(searchInput === undefined ? neededInfo : searchInput, studyProgram[neededInfo.toLowerCase().replace(/\s/g, "")]);
            UiService.sleep().then(() => { ButtonsService.isConversationDoneButtons(); });
            console.log(neededInfo, searchInput);
        } else if (neededInfo === "Apply") {
            UiService.replyInfoMessage(searchInput === undefined ? neededInfo : searchInput, ["Thank you for your interest!"]);
            ApplyAndPriceService.getApplyForm(studyProgram.name);
            UiService.sleep().then(() => { ButtonsService.isConversationDoneButtons(); });
        }
    },

    //Prints message for the answer in the user got everything he needed
    printConversationDone: function (choice) {
        if (choice === "Yes") {
            this.replyInfoMessage(choice, ["What do you wanna to talk about next?"]);
            UiService.sleep().then(() => { ButtonsService.getInfoButtons(DataService.cachedData); });
        } else if (choice === "No") {
            UiService.replyMessages(choice, DataService.cachedReplyMessages.ShortTalk.Goodbye.reply);
        }
    },

    //Shows and hides the loader
    toggleLoader: function () {
        let loader = document.getElementById("loader");
        loader.style.display = "block";
        loader.scrollIntoView({ block: 'end', behavior: 'smooth' });
        setTimeout(() => {
            loader.style.display = "none";
        }, 2000)
    },

    //Pauses everything for some time
    sleep: function () {
        return new Promise(resolve => setTimeout(resolve, 2000));
    },

    // Toggles between 2 view ports
    toggleDisplayView: function (view1, view2) {
        view1.style.display = "none";
        view2.style.display = "flex";
        view2.style.overflowX = "hidden";
    },

    // Changes the quizzes/games icon
    changeQuizzesGamesIconAndFunctionality: function (gameOrQuizFlag, item, viewPort) {
        if (gameOrQuizFlag) {
            item.innerHTML = `<img src="./src/img-avatars/chatButton.svg" height="20rem">`;
            item.title = "Chat";
            if (item.id === "chatQuizzes") {
                GamesService.areGamesOpen = false;
                AnimationsService.chatGames.innerHTML = `<img src="./src/img-avatars/games.svg" height="25rem">`;
                AnimationsService.chatGames.title = "Games";
                item.title = "Chat";
            } else {
                QuizzesService.areQuizzesOpen = false;
                AnimationsService.chatQuizzes.innerHTML = `<img src="./src/img-avatars/quizzes.svg" height="25rem">`;
                AnimationsService.chatQuizzes.title = "Quizzes";
                item.title = "Chat";
            }
            this.toggleDisplayView(AnimationsService.chatWindow, viewPort);
        } else {
            if (item.id === "chatQuizzes") {
                item.innerHTML = `<img src="./src/img-avatars/quizzes.svg" height="25rem">`;
                item.title = "Quizzes";
            } else {
                item.innerHTML = `<img src="./src/img-avatars/games.svg" height="25rem">`;
                item.title = "Games";
            };
            this.toggleDisplayView(viewPort, AnimationsService.chatWindow);
        };
    },

    // Changes flag value
    changeFlag: function (flag) {
        if (flag) {
            return false;
        };
        return true;
    },

    // Resets chat-window if called from another viewport
    resetChatWindow: function () {
        this.toggleDisplayView(QuizzesService.gamesAndQuizzesWindow, AnimationsService.chatWindow);
        AnimationsService.chatWindow.style.overflowX = "hidden";
        AnimationsService.chatGames.innerHTML = `<img src="./src/img-avatars/games.svg" height="25rem">`;
        GamesService.areGamesOpen = false;
        AnimationsService.chatQuizzes.innerHTML = `<img src="./src/img-avatars/quizzes.svg" height="25rem">`;
        QuizzesService.areQuizzesOpen = false;
    },

    // Stops user from clicking buttons too fast
    disableGamesAndQuizzesButtons: function (flag) {
        if (flag) {
            AnimationsService.chatQuizzes.disabled = true;
            AnimationsService.chatGames.disabled = true;
        }
        else {
            AnimationsService.chatQuizzes.disabled = false;
            AnimationsService.chatGames.disabled = false;
        }
    },

    //Changes modal style to block and sets height and width
    displayModalWindow: function (flag) {
        ApplyAndPriceService.myModal.style.display = "block";

        if (window.innerWidth < 821) {
            this.modalContent.style.height = "100%";
            this.modalContent.style.width = "100%";
            QuizzesService.popUpQuizzes.style.display = "none";
            QuizzesService.form.style.display = "none";
            ApplyAndPriceService.popUp.style.display = "block";
            return;
        }

        QuizzesService.form.style.display = "none";
        QuizzesService.popUpQuizzes.style.display = "none";
        ApplyAndPriceService.popUp.style.display = "block";
        ApplyAndPriceService.popUp.style.overflowY = "hidden";

        switch (flag) {
            case "games":
                ApplyAndPriceService.popUp.style.overflowY = "auto";
                break;
            case "quizzes":
                ApplyAndPriceService.popUp.style.display = "none";
                QuizzesService.popUpQuizzes.style.display = "block";
                QuizzesService.form.style.display = "block";
                QuizzesService.form.scrollIntoView({ block: 'start', behavior: 'smooth' });
                break;
            case "contact":
                ApplyAndPriceService.popUp.style.overflowY = "auto";
                break;
        }
    },

    //Enables/Disables HTML scroll depending on the case
    HTMLScrollCheck: function () {
        mainWindow.style.height === "100%" ? document.getElementsByTagName("html")[0].style.overflowY = "hidden" : document.getElementsByTagName("html")[0].style.overflowY = "auto";
    },
};