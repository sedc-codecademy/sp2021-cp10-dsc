const SearchInputService = {
    input: document.getElementById("input"),
    inputButton: document.getElementById("inputButton"),
    inputString: "",
    inputStringForUser: "",

    //Events for search input - Click and Enter
    getSearchInput: function () {
        this.inputButton.addEventListener("click", function () {
            SearchInputService.inputButton.style.display = "none";
            VoiceRecognitionService.voiceRecognitionBtn.style.display = "block";
            SearchInputService.inputButton.disabled = true;
            SearchInputService.SearchInputLogic();
            UiService.sleep().then(() => {
                SearchInputService.inputButton.disabled = false;
            });
        });

        this.input.addEventListener("keypress", function (e) {
            const eventKey = e.key;
            if (eventKey === 'Enter') {
                SearchInputService.inputButton.click();
            }
        });
    },

    //Search for a suitable response on the input
    SearchInputLogic: function (voiceRecognitionString) {
        if (AnimationsService.chatWindow.style.display === "none") UiService.resetChatWindow();
        UiService.recommendedDiv.style.display = "none";
        AnimationsService.changeImageHead('haralampiye');
        AnimationsService.headerAnimation();
        if (SearchInputService.input.value === "" && voiceRecognitionString === undefined) return;

        voiceRecognitionString !== undefined ? SearchInputService.inputStringForUser = voiceRecognitionString : SearchInputService.inputStringForUser = SearchInputService.input.value;

        SearchInputService.inputString = LexiconService.checkForKeywords(SearchInputService.inputStringForUser);
        input.value = "";

        //Searches for a curse word and promotes looove
        if (SearchInputService.searchForCurseWords() !== undefined) {
            UiService.replyMessages("I love you!", ["I love you too!"]);
            UiService.sleep().then(() => { ButtonsService.getMainButtons(DataService.cachedData); });
            return;
        }

        //Looks for study program
        let foundHigh = SearchInputService.searchThroughHighTier();
        if (foundHigh.length === 1) {
            if (SearchInputService.searchThroughInfoProperties(foundHigh[0].item.infoProperties).length === 1 && foundHigh[0].branch !== 'Testing') {
                UiService.printAcademyInfo(SearchInputService.searchThroughInfoProperties(foundHigh[0].item.infoProperties)[0], foundHigh[0].item.nameId, foundHigh[0].branch, SearchInputService.inputStringForUser);
            } else if(foundHigh[0].branch === 'Testing'){
                if(SearchInputService.searchThroughInfoProperties(foundHigh[0].item.infoProperties).length === 1){
                    UiService.printTestingInfo(SearchInputService.searchThroughInfoProperties(foundHigh[0].item.infoProperties)[0], foundHigh[0].item.nameId, SearchInputService.inputStringForUser);
                }else{
                    ButtonsService.getInfoTestingButtons(foundHigh[0].item, SearchInputService.inputStringForUser);
                }
            }
            else {
                UiService.replyMessages(SearchInputService.inputStringForUser, foundHigh[0].item.reply);
                UiService.sleep().then(() => { ButtonsService.getInfoButtons(foundHigh[0].item, foundHigh[0].branch); });
            }
        }
        else {
            //Looks for Academy, Course or Test
            let foundMid = SearchInputService.searchThroughMidTier();
            let found = foundHigh.concat(foundMid);
            if (foundMid.length !== 0) {
                found.length === 1 ? ButtonsService.getDataButtons(found[0].item.nameId, found[0].branch, SearchInputService.inputStringForUser) : SearchInputService.moreOptionsFound(found);
            }
            else {
                //Looks explicit search for Academies, Courses or Testing
                found = SearchInputService.searchThroughLowTier();
                if (found !== undefined) {
                    ButtonsService.mainButtonsLogic(found, SearchInputService.inputStringForUser);
                }
                else {
                    // Checks if the user is asking to speak to a real person
                    found = SearchInputService.searchForContact();
                    if (found !== undefined) {
                        UiService.replyMessages(SearchInputService.inputStringForUser, ["If you would like to talk to someone who isn't a bot, you can click on the button below and you can send our sales department an email so that they can contact you as soon as possible!"]);
                        UiService.sleep().then(() => { UiService.printContactButton(); });
                    }
                    else {
                        //Checks if there is a greet word
                        found = SearchInputService.searchForGreeting();
                        if (found !== undefined) {
                            UiService.replyMessages(SearchInputService.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.Hello.reply);
                            UiService.sleep().then(() => { ButtonsService.getMainButtons(DataService.cachedData); });
                        }
                        else {
                            //Checks if there is a reference to how funny the bot is
                            found = SearchInputService.searchForFunny();
                            if (found !== undefined) {
                                UiService.replyMessages(SearchInputService.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.Funny.reply);
                                UiService.sleep().then(() => { AnimationsService.recommendedBtnsAnimations(); });
                            }
                            else {
                                //Checks if there is a goodbye word
                                found = SearchInputService.searchForBye();
                                if (found !== undefined) {
                                    UiService.replyMessages(SearchInputService.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.Goodbye.reply);
                                    UiService.sleep().then(() => { AnimationsService.recommendedBtnsAnimations(); });
                                }
                                else {
                                    //Checks if there is a how are you sentence
                                    found = SearchInputService.searchForHowAreYou();
                                    if (found !== undefined) {
                                        UiService.replyMessages(SearchInputService.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.HowAreYou.reply);
                                        UiService.sleep().then(() => { ButtonsService.getMainButtons(DataService.cachedData); });
                                    }
                                    else {
                                        //Checks if you are asking for a joke
                                        found = SearchInputService.searchForJoke();
                                        if (found !== undefined) {
                                            UiService.replyMessages(SearchInputService.inputStringForUser, DataService.cachedReplyMessages.Jokes.jokesArray);
                                            UiService.sleep().then(() => { AnimationsService.recommendedBtnsAnimations(); });
                                        }
                                        else {
                                            //Checks if there is a reference to who the bot is
                                            found = SearchInputService.searchForWhoAreYou();
                                            if (found !== undefined) {
                                                UiService.replyMessages(SearchInputService.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.WhoAreYou.reply);
                                                UiService.sleep().then(() => { ButtonsService.getMainButtons(DataService.cachedData); });
                                            }
                                            else {
                                                //Checks if there is a reference to who the bot can do
                                                found = SearchInputService.searchForWhatCanYouDo();
                                                if (found !== undefined) {
                                                    UiService.replyMessages(SearchInputService.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.WhatCanYouDo.reply);
                                                    UiService.sleep().then(() => { ButtonsService.getMainButtons(DataService.cachedData); });
                                                } else {
                                                    UiService.replyMessages(SearchInputService.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.NoComprende.reply);
                                                    UiService.sleep().then(() => { ButtonsService.getMainButtons(DataService.cachedData); });
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    //Looks for study program or test
    searchThroughHighTier: function () {
        let element;
        let foundItems = [];
        for (let branch in DataService.cachedData) {
            for (let item of DataService.cachedData[branch]) {
                if (item.studyPrograms !== undefined) {
                    for (let program of item.studyPrograms) {
                        if (SearchInputService.inputString.toLowerCase().includes(program.name.toLowerCase())) {
                            element = { item: program, branch: branch }
                            foundItems.push(element);
                        }
                    }
                }
                else if (branch === "Testing") {
                    if (SearchInputService.inputString.toLowerCase().includes(item.name.toLowerCase())) {
                        element = { item: item, branch: branch }
                        foundItems.push(element);
                    }
                }
            }
        }
        return foundItems;
    },

    //Looks for Academy, Course or Test
    searchThroughMidTier: function () {
        let element;
        let foundItems = [];
        for (let branch in DataService.cachedData) {
            if (branch === 'Testing') continue;
            for (let item of DataService.cachedData[branch]) {
                if (SearchInputService.inputString.toLowerCase().includes(item.name.toLowerCase())) {
                    element = { item: item, branch: branch }
                    foundItems.push(element);
                }
            }
        }
        return foundItems;
    },

    //Looks explicit search for Academies, Courses or Testing
    searchThroughLowTier: function () {
        for (let branch in DataService.cachedData) {
            if (SearchInputService.inputString.toLowerCase().includes(branch.toLowerCase())) {
                return branch;
            }
        }
    },

    //Looks for info property of the study program
    searchThroughInfoProperties: function (elementProperties) {
        let foundItems = [];
        if (elementProperties === undefined) {
            elementProperties = ["Price", "Overview", "Timeline", "Job Opportunities", "Apply", "About", "Test Centers", "Target Audience"];
        }

        for (let property of elementProperties) {
            if (SearchInputService.inputString.toLowerCase().includes(property.toLowerCase())) {
                foundItems.push(property);
            }
        }
        return foundItems;
    },

    //Checks if there is a greet word
    searchForGreeting: function () {
        let greetings = ["Hello", "Hi", "Good day", "Greetings", "Hey"];
        for (let greet of greetings) {
            if (SearchInputService.inputString.toLowerCase().includes(greet.toLowerCase())) {
                return greet;
            }
        }
    },

    //Checks if there is a goodbye word
    searchForBye: function () {
        let goodbyes = ["Bye", "Thank you", "See you", "Thanks", "Goodbye", "Farewell", "Goodnight", "Tnx"];
        for (let goodbye of goodbyes) {
            if (SearchInputService.inputString.toLowerCase().includes(goodbye.toLowerCase())) {
                return goodbye;
            }
        }
    },

    //Checks if you are asking for a joke
    searchForJoke: function () {
        if (
            SearchInputService.inputString.toLowerCase().includes("joke".toLowerCase()) ||
            SearchInputService.inputString.toLowerCase().includes("funny".toLowerCase())
        ) {
            return "joke";
        }
    },

    //Checks if there is a how are you sentence
    searchForHowAreYou: function () {
        let howAreYous = ["how are you", "are you ok", "are you well", "how's it going", "hows it going", "what's up", "whats up", "wazzup"];
        for (let howAreYou of howAreYous) {
            if (SearchInputService.inputString.toLowerCase().includes(howAreYou.toLowerCase())) {
                return howAreYou;
            }
        }
    },

    //Checks if there is a reference to how funny the bot is
    searchForFunny: function () {
        let funny = "funny";
        if (SearchInputService.inputString.toLowerCase().includes("you are") && SearchInputService.inputString.toLowerCase().includes("funny")) {
            return funny;
        } else if (SearchInputService.inputString.toLowerCase().includes("you're") && SearchInputService.inputString.toLowerCase().includes("funny")) {
            return funny;
        } else if (SearchInputService.inputString.toLowerCase().includes("that") && SearchInputService.inputString.toLowerCase().includes("funny")) {
            return funny;
        }
    },

    //Checks if there is a reference to who the bot is
    searchForWhoAreYou: function () {
        let whoAreYou = "who are you";
        if (SearchInputService.inputString.toLowerCase().includes("who") && SearchInputService.inputString.toLowerCase().includes("you")) {
            return whoAreYou;
        }
    },

    //Checks if there is a reference to who the bot can do
    searchForWhatCanYouDo: function () {
        let whatCanYouDo = "what can you do";
        if (SearchInputService.inputString.toLowerCase().includes("what") && SearchInputService.inputString.toLowerCase().includes("you") && SearchInputService.inputString.toLowerCase().includes("do")) {
            return whatCanYouDo;
        } else if (SearchInputService.inputString.toLowerCase().includes("what") && SearchInputService.inputString.toLowerCase().includes("i") && SearchInputService.inputString.toLowerCase().includes("do")) {
            return whatCanYouDo;
        }
    },

    // Checks if the user is asking to speak to a real person
    searchForContact: function () {
        let contactUs = ["contact", "contact you", "talk with somebody", "person", "official", "someone", "somebody"];

        for (let contact of contactUs) {
            if (SearchInputService.inputString.toLowerCase().includes(contact)) {
                return contact;
            }
        }
    },

    // Searches for a curse word and promotes looove
    searchForCurseWords: function () {
        let curseWords = ["idiot", "fuck", "suck", "cock", "love you", "f***", "stupid", "dumb"];

        for (let curseWord of curseWords) {
            if (SearchInputService.inputString.toLowerCase().includes(curseWord)) {
                return curseWord;
            }
        }
    },

    // Gathers all the possible answers and returns them to the user as buttons (options) to choose from
    moreOptionsFound: function (foundItems) {
        UiService.replyMessages(SearchInputService.inputStringForUser, ["Woooah, hold on there partner, you asked a couple of different things there! Which one did you mean or which one do you wanna talk about first?"]);

        let buttons = [];
        for (let i = 0; i < foundItems.length; i++) {
            if (i === 5) break;
            let button = ButtonsService.createMoreOptionsButtons(foundItems[i].item, foundItems[i].branch);
            buttons.push(button);
        }

        let uniqueButtons = [...new Set(buttons)];
        UiService.sleep().then(() => {
            ButtonsService.buttonsDiv.innerHTML = "";
            uniqueButtons.forEach(x => ButtonsService.buttonsDiv.innerHTML += x);
            ButtonsService.buttonsDiv.scrollIntoView({ block: "end", behavior: "smooth" });
        });
    }
};//PROPERTIES: Input field, Input button, Input value string, Input string that is shown to the user