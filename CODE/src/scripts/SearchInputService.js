const SearchInputService = {
    input: document.getElementById("input"),
    inputButton: document.getElementById("inputButton"),
    inputString: "",
    inputStringForUser: "",

    //Events for search input - Click and Enter
    getSearchInput: function () {
        this.inputButton.addEventListener("click", function () {
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
    SearchInputLogic: function () {
        if (AnimationsService.chatWindow.style.display === "none") UiService.resetChatWindow();
        UiService.recommendedDiv.style.display = "none";
        AnimationsService.changeImageHead('haralampiye');
        AnimationsService.headerAnimation();
        if (SearchInputService.input.value === "") return;

        SearchInputService.inputStringForUser = SearchInputService.input.value;
        SearchInputService.inputString = LexiconService.checkForKeywords(SearchInputService.input.value);
        input.value = "";

        let found = SearchInputService.searchThroughHighTier();
        if (found !== undefined) {
            if (SearchInputService.searchThroughInfoProperties(found.item.infoProperties)) {
                UiService.printAcademyInfo(SearchInputService.searchThroughInfoProperties(found.item.infoProperties), found.item.nameId, found.branch, SearchInputService.inputStringForUser);
            } else {
                UiService.replyMessages(SearchInputService.inputStringForUser, found.item.reply);
                UiService.sleep().then(() => { ButtonsService.getInfoButtons(found.item, found.branch); });
            }
        }
        else {
            found = SearchInputService.searchThroughMidTier();
            if (found !== undefined) {
                ButtonsService.getDataButtons(found.item, found.branch, SearchInputService.inputStringForUser);
            } else {
                found = SearchInputService.searchThroughLowTier();
                if (found !== undefined) {
                    ButtonsService.mainButtonsLogic(found, SearchInputService.inputStringForUser);
                } else {
                    found = SearchInputService.searchForGreeting();
                    if (found !== undefined) {
                        UiService.replyMessages(SearchInputService.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.Hello.reply);
                        UiService.sleep().then(() => { ButtonsService.getMainButtons(DataService.cachedData); });
                    } else {
                        found = SearchInputService.searchForJoke();
                        if (found !== undefined) {
                            UiService.replyMessages(SearchInputService.inputStringForUser, DataService.cachedReplyMessages.Jokes.jokesArray);
                            UiService.sleep().then(() => { AnimationsService.recommendedBtnsAnimations(); });
                        } else {
                            found = SearchInputService.searchForBye();
                            if (found !== undefined) {
                                UiService.replyMessages(SearchInputService.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.Goodbye.reply);
                                UiService.sleep().then(() => { AnimationsService.recommendedBtnsAnimations(); });
                            } else {
                                UiService.replyMessages(SearchInputService.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.NoComprende.reply);
                                UiService.sleep().then(() => { ButtonsService.getMainButtons(DataService.cachedData); });
                            }
                        }
                    }
                }
            }
        }
    },

    //Looks for study program
    searchThroughHighTier: function () {
        for (let branch in DataService.cachedData) {
            for (let item of DataService.cachedData[branch]) {
                if (item.studyPrograms !== undefined) {
                    for (let program of item.studyPrograms) {
                        if (SearchInputService.inputString.toLowerCase().includes(program.name.toLowerCase())) {
                            return {
                                item: program,
                                branch: branch
                            }
                        }
                    }
                }
            }
        }
    },

    //Looks for Academy, Course or Test
    searchThroughMidTier: function () {
        for (let branch in DataService.cachedData) {
            for (let item of DataService.cachedData[branch]) {
                if (SearchInputService.inputString.toLowerCase().includes(item.name.toLowerCase())) {
                    return {
                        branch: branch,
                        item: item.nameId
                    }
                }
            }
        }
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
        let properties = elementProperties;
        if (!properties) {
            properties = ["Price", "Overview", "Timeline", "Job Opportunities", "Apply", "About", "Test Centers", "Target Audience"];
        }
        for (let property of properties) {
            if (SearchInputService.inputString.toLowerCase().includes(property.toLowerCase())) {
                return property;
            }
        }
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
            if (SearchInputService.inputString.toLowerCase().includes(goodbye.toLowerCase())) {
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
    searchForWhatCanYouDo: function(){
        let whatCanYouDo = "what can you do";
            if(SearchInputService.inputString.toLowerCase().includes("what") && SearchInputService.inputString.toLowerCase().includes("you") && SearchInputService.inputString.toLowerCase().includes("do")){
                return whatCanYouDo;
            } else if(SearchInputService.inputString.toLowerCase().includes("what") && SearchInputService.inputString.toLowerCase().includes("i") && SearchInputService.inputString.toLowerCase().includes("do")){
                return whatCanYouDo;
            }
        }
};//PROPERTIES: Input field, Input button, Input value string