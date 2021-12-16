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
      if (eventKey === "Enter") {
        SearchInputService.inputButton.click();
      }
    });
  },

  //Search for a suitable response on the input
  SearchInputLogic: function (voiceRecognitionString) {
    UiService.helpersDiv.innerHTML = "";

    if (AnimationsService.chatWindow.style.display === "none") {
      UiService.resetChatWindow();
    }

    AnimationsService.headerAnimation();

    if (this.input.value === "" && voiceRecognitionString === undefined) return;

    voiceRecognitionString !== undefined
      ? (this.inputStringForUser = voiceRecognitionString)
      : (this.inputStringForUser = SearchInputService.input.value);

    this.inputString = LexiconService.checkForKeywords(this.inputStringForUser);
    input.value = "";

    //Searches for a curse word and promotes looove
    if (this.searchForCurseWords() !== undefined) {
      UiService.replyMessages("I love you!", ["I love you too!"]);
      UiService.sleep().then(() => {
        ButtonsService.getInfoButtons(DataService.cachedData);
      });
      return;
    }

    //Searches for info
    let found = this.searchThroughInfoProperties(DataService.cachedData.infoProperties);
    if (found.length !== 0) {
      UiService.printAcademyInfo(found[0], this.inputStringForUser);
    }
    else {
      // Checks if the user is asking to speak to a real person
      found = this.searchForContact();
      if (found) {
        UiService.replyMessages(this.inputStringForUser, ["Thank you for contacting us! \nMay I help you with something else?",]);
        UiService.sleep().then(() => { ContactUsForm.printContactUsForm(true); });
      }
      else {
        //Checks if there is a greet word
        found = this.searchForGreeting();
        if (found) {
          UiService.replyMessages(
            this.inputStringForUser,
            DataService.cachedReplyMessages.ShortTalk.Hello.reply
          );
          UiService.sleep().then(() => {
            ButtonsService.getInfoButtons(DataService.cachedData);
          });
        }
        else {
          //Checks if there is a goodbye word
          found = this.searchForBye();
          if (found) {
            UiService.replyMessages(this.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.Goodbye.reply);
            UiService.printBellButton();
          }
          else {
            //Checks if there is a how are you sentence
            found = this.searchForHowAreYou();
            if (found) {
              UiService.replyMessages(this.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.HowAreYou.reply);
              UiService.sleep().then(() => { ButtonsService.getInfoButtons(DataService.cachedData); });
            }
            else {
              //Checks if there is a reference to who the bot is
              found = this.searchForWhoAreYou();
              if (found) {
                UiService.replyMessages(this.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.WhoAreYou.reply);
                UiService.sleep().then(() => { ButtonsService.getInfoButtons(DataService.cachedData); });
              }
              else {
                //Checks if there is a reference to who the bot can do
                found = this.searchForWhatCanYouDo();
                if (found) {
                  UiService.replyMessages(this.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.WhatCanYouDo.reply);
                  UiService.sleep().then(() => { ButtonsService.getInfoButtons(DataService.cachedData); });
                }
                else {
                  //Checks if there is a goodbye word
                  found = this.searchForBye();
                  if (found) {
                    UiService.replyMessages(this.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.Goodbye.reply);
                    UiService.sleep().then(() => { ButtonsService.getInfoButtons(DataService.cachedData); });
                  }
                  else {
                    //Checks if there is a how are you sentence
                    found = this.searchForHowAreYou();
                    if (found) {
                      UiService.replyMessages(this.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.HowAreYou.reply);
                      UiService.sleep().then(() => { ButtonsService.getInfoButtons(DataService.cachedData); });
                    }
                    else {
                      UiService.replyMessages(this.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.NoComprende.reply);
                      UiService.sleep().then(() => { ButtonsService.getInfoButtons(DataService.cachedData); });
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

  //Looks for info property of the study program
  searchThroughInfoProperties: function (elementProperties) {
    let foundItems = [];

    for (let property of elementProperties) {
      if (this.inputString.toLowerCase().includes(property.toLowerCase())) {
        foundItems.push(property);
      }
    }
    return foundItems;
  },

  // Checks if the user is asking to speak to a real person
  searchForContact: function () {
    let contactUs = ["contact", "contact you", "talk with somebody", "person", "official", "someone", "somebody"];

    for (let contact of contactUs) {
      if (this.inputString.toLowerCase().includes(contact)) {
        return contact;
      }
    }
  },

  //Checks if there is a greet word
  searchForGreeting: function () {
    let greetings = ["Hello", "Hi", "Good day", "Greetings", "Hey"];
    for (let greet of greetings) {
      if (this.inputString.toLowerCase().includes(greet.toLowerCase())) {
        return greet;
      }
    }
  },

  //Checks if there is a goodbye word
  searchForBye: function () {
    let goodbyes = ["Bye", "Thank you", "See you", "Thanks", "Goodbye", "Farewell", "Goodnight", "Tnx"];
    for (let goodbye of goodbyes) {
      if (this.inputString.toLowerCase().includes(goodbye.toLowerCase())) {
        return goodbye;
      }
    }
  },

  //Checks if there is a how are you sentence
  searchForHowAreYou: function () {
    let howAreYous = ["how are you", "how are we", "are you ok", "are you well", "how's it going", "hows it going", "what's up", "whats up", "wazzup"];
    for (let howAreYou of howAreYous) {
      if (SearchInputService.inputString.toLowerCase().includes(howAreYou.toLowerCase())) {
        return howAreYou;
      }
    }
  },

  //Checks if there is a reference to who the bot can do
  searchForWhatCanYouDo: function () {
    let keywords1 = ["what", "you", "do"];
    let keywords2 = ["what", "i", "do"];

    if (keywords1.every((key) => this.inputString.toLowerCase().includes(key)) ||
      keywords2.every((key) => this.inputString.toLowerCase().includes(key))) {
      return "what can you do";
    }
  },

  //Checks if there is a reference to who the bot is
  searchForWhoAreYou: function () {
    let keywords = ["who", "you"];
    if (keywords.every((key) => this.inputString.toLowerCase().includes(key))) {
      return "who are you";
    }
  },

  // Searches for a curse word and promotes looove
  searchForCurseWords: function () {
    let curseWords = ["idiot", "fuck", "suck", "cock", "love you", "f***", "stupid", "dumb"];

    for (let curseWord of curseWords) {
      if (this.inputString.toLowerCase().includes(curseWord)) {
        return curseWord;
      }
    }
  }
}; //PROPERTIES: Input field, Input button, Input value string, Input string that is shown to the user