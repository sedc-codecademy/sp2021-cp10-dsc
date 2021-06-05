const UiService = {
    chatHistory: document.getElementById("chatHistory"),
    recommendedDiv: document.getElementById("recommendedDiv"),

    //Prints the very first message for the user
    firstMessage: function () {
        this.chatHistory.innerHTML = `
        <div class="greetingMessage">Welcome to the<br>
         Seavus Education Chat Bot!</div>
         <div class="greetingMessageQue">How can we help you?</div>
         <hr class="chat-js-hr">
        `;
    },

    //Prints a user message and random bot message in chat history(Depending on the choice)
    replyMessages: function (elementName, elementMessages) {
        ButtonsService.buttonsDiv.innerHTML = "";
        ButtonsService.mainButtonsDiv.innerHTML = "";

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
    printAcademyInfo: function (neededInfo, elementId, branchName, searchInput) {
        ButtonsService.mainButtonsDiv.innerHTML = "";

        for (const academy of DataService.cachedData[branchName]) {
            for (const studyProgram of academy.studyPrograms) {
                if (elementId === studyProgram.nameId) {
                    if (studyProgram[neededInfo.toLowerCase().replace(/\s/g, "")] !== undefined) {
                        UiService.replyInfoMessage(searchInput === undefined ? neededInfo : searchInput, studyProgram[neededInfo.toLowerCase().replace(/\s/g, "")]);
                        UiService.sleep().then(() => { ButtonsService.isConversationDoneButtons(); });
                        break;
                    } else if (neededInfo === "Apply") {
                        UiService.replyInfoMessage(searchInput === undefined ? neededInfo : searchInput, ["Thank you for your interest!"]);
                        ApplyAndPriceService.getApplyForm(branchName, studyProgram.name);
                        UiService.sleep().then(() => { ButtonsService.isConversationDoneButtons(); });
                        break;
                    } else if (neededInfo === "Price") {
                        UiService.replyInfoMessage(searchInput === undefined ? neededInfo : searchInput, ["Here is a preview of the prices!"]);
                        ApplyAndPriceService.getPriceTable(branchName, studyProgram.name);
                        UiService.sleep().then(() => { ButtonsService.isConversationDoneButtons(); });
                        break;
                    }
                }
            }
        }
    },

    //Prints the INFO for the Testing object
    printTestingInfo: function (neededInfo, elementId) {
        for (const test of DataService.cachedData.Testing) {
            if (test.nameId === elementId) {
                if (test[neededInfo.toLowerCase().replace(/\s/g, "")] !== undefined) {
                    this.replyInfoMessage(neededInfo, test[neededInfo.toLowerCase().replace(/\s/g, "")]);
                    UiService.sleep().then(() => { ButtonsService.isConversationDoneButtons(); });
                    break;
                }else if(neededInfo === "Apply"){
                    UiService.replyInfoMessage(neededInfo, ["Thank you for your interest!"]);
                    ApplyAndPriceService.getApplyForm("Testing");
                    UiService.sleep().then(() => { ButtonsService.isConversationDoneButtons(); });
                    break;
                }
            }
        }
    },

    //Prints message for the answer in the user got everything he needed
    printConversationDone: function (choice) {
        if (choice === "Yes") {
            this.replyInfoMessage(choice, ["What do you wanna to talk about next?"]);
            UiService.sleep().then(() => { ButtonsService.getMainButtons(DataService.cachedData); });
        } else if (choice === "No") {
            UiService.replyMessages(choice, DataService.cachedReplyMessages.ShortTalk.Goodbye.reply);
            UiService.sleep().then(() => { AnimationsService.recommendedBtnsAnimations(); });
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
    }
};//PROPERTIES: Chat history div, Recommended slide div