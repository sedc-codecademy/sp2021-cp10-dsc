const SearchInputService = {
    input : document.getElementById("input"),
    inputButton : document.getElementById("inputButton"),
    inputString : "",

    //Events for search input and logic behind it
    getSearchInput : function(){
        this.inputButton.addEventListener("click", function(){
            SearchInputService.inputButton.disabled = true;
            SearchInputService.SearchInputLogic();
            UiService.sleep().then(() => {
                SearchInputService.inputButton.disabled = false;
            });
        });

        this.input.addEventListener("keypress", function(e){
            const eventKey = e.key;
            if(eventKey === 'Enter'){
                SearchInputService.inputButton.click();
            }
        });
    },

    SearchInputLogic : function(){
        UiService.recommendedDiv.style.display = "none";
        screen.width < 751 ? AnimationsService.chatWindow.style.height = "96%" : AnimationsService.chatWindow.style.height = "82%";
        AnimationsService.changeImageHead('haralampiye');
        AnimationsService.headerAnimation();
        if(SearchInputService.input.value === "") return;

        SearchInputService.inputString = SearchInputService.input.value;
        input.value = "";
        let found = SearchInputService.searchThroughHighTier();
        if(found !== undefined){
            if(SearchInputService.searchThroughInfoProperties(found.item.infoProperties)){
                UiService.printAcademyInfo(SearchInputService.searchThroughInfoProperties(found.item.infoProperties), found.item.nameId, found.branch, SearchInputService.inputString);
            }else{
                UiService.replyMessages(SearchInputService.inputString, found.item.reply);
                UiService.sleep().then(() => { ButtonsService.getInfoButtons(found.item, found.branch); });
            }
        }
        else{
            let found = SearchInputService.searchThroughMidTier();
            if(found !== undefined){
                ButtonsService.getDataButtons(found.item, found.branch, SearchInputService.inputString);
            }else{
                let found = SearchInputService.searchThroughLowTier();
                if(found !== undefined){
                    ButtonsService.mainButtonsLogic(found, SearchInputService.inputString);
                }else{
                    let found = SearchInputService.searchForGreeting();
                    if(found !== undefined){
                        UiService.replyMessages(SearchInputService.inputString, DataService.cachedReplyMessages.ShortTalk.Hello.reply);
                        UiService.sleep().then(() => { ButtonsService.getMainButtons(DataService.cachedData); });
                    }else{
                        let found = SearchInputService.searchForJoke();
                        if(found !== undefined){
                            UiService.replyMessages(SearchInputService.inputString, DataService.cachedReplyMessages.Jokes.jokesArray);
                            UiService.sleep().then(() => { AnimationsService.recommendedBtnsAnimations(); });
                        }else{
                            let found = SearchInputService.searchForBye();
                            if(found !== undefined){
                                UiService.replyMessages(SearchInputService.inputString, DataService.cachedReplyMessages.ShortTalk.Goodbye.reply);
                                UiService.sleep().then(() => { AnimationsService.recommendedBtnsAnimations(); });
                            }else{
                                UiService.replyMessages(SearchInputService.inputString, DataService.cachedReplyMessages.ShortTalk.NoComprende.reply);
                                UiService.sleep().then(() => { ButtonsService.getMainButtons(DataService.cachedData); });
                            }
                        }
                    }
                }
            }
        }
    },

    //Looks for study program
    searchThroughHighTier : function(){
        for(let branch in DataService.cachedData){
            for(let item of DataService.cachedData[branch]){
                if(item.studyPrograms !== undefined){
                    for(let program of item.studyPrograms){
                        if(SearchInputService.inputString.toLowerCase().includes(program.name.toLowerCase())){
                            return{
                                item : program,
                                branch : branch
                            }
                        }
                    }
                }
            }
        }
    },

    //Looks for Academy, Course or Test
    searchThroughMidTier : function(){
        for(let branch in DataService.cachedData){
            for(let item of DataService.cachedData[branch]){
                if(SearchInputService.inputString.toLowerCase().includes(item.name.toLowerCase())){
                    return {
                        branch: branch,
                        item: item.nameId
                    }
                }
            }
        }
    },

    //Looks explicit search for Academies, Courses or Testing
    searchThroughLowTier: function(){
        for(let branch in DataService.cachedData){
            if(SearchInputService.inputString.toLowerCase().includes(branch.toLowerCase())){
                return branch;
            }
        }
    },

    //Looks for info property of the study program
    searchThroughInfoProperties: function(elementProperties){
        let properties = elementProperties;
        if(!properties){
            properties = ["Price", "Overview", "Timeline", "Job Opportunities", "Apply", "About", "Test Centers", "Target Audience"];
        }
        for(let property of properties){
            if(SearchInputService.inputString.toLowerCase().includes(property.toLowerCase())){
                return property;
            }
        }
    },

    //Checks if there is a greet word
    searchForGreeting: function(){
        let greetings = ["Hello", "Hi"];
        for(let greet of greetings){
            if(SearchInputService.inputString.toLowerCase().includes(greet.toLowerCase())){
                return greet;
            }
        }
    },

    //Checks if there is a goodbye word
    searchForBye: function(){
        let goodbyes = ["Bye", "See you later", "Thank you"];
        for(let goodbye of goodbyes){
            if(SearchInputService.inputString.toLowerCase().includes(goodbye.toLowerCase())){
                return goodbye;
            }
        }
    },

    //Checks if you are asking for a joke
    searchForJoke: function(){
        if(SearchInputService.inputString.toLowerCase().includes("joke".toLowerCase())){
            return "joke";
        }
    }
};