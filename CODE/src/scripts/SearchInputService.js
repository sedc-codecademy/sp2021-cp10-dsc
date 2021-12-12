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

    if (SearchInputService.input.value === "" && voiceRecognitionString === undefined) return;

    voiceRecognitionString !== undefined
      ? (SearchInputService.inputStringForUser = voiceRecognitionString)
      : (SearchInputService.inputStringForUser = SearchInputService.input.value);

    SearchInputService.inputString = LexiconService.checkForKeywords(SearchInputService.inputStringForUser);
    input.value = "";

    //Searches for a curse word and promotes looove
    if (SearchInputService.searchForCurseWords() !== undefined) {
      UiService.replyMessages("I love you!", ["I love you too!"]);
      UiService.sleep().then(() => {
        ButtonsService.getInfoButtons(DataService.cachedData);
      });
      return;
    }

    //Searches for info
    let found = SearchInputService.searchThroughInfoProperties(DataService.cachedData.infoProperties);
    if (found.length !== 0) {
      UiService.printAcademyInfo(found[0], SearchInputService.inputStringForUser);
    }
    else {
      // Checks if the user is asking to speak to a real person
      found = SearchInputService.searchForContact();
      if (found !== undefined) {
        UiService.replyMessages(SearchInputService.inputStringForUser, [
          "If you would like to talk to someone who isn't a bot, you can click on the button below and you can send our sales department an email so that they can contact you as soon as possible!",
        ]);
        UiService.sleep().then(() => {
          ContactUsForm.printContactUsForm();
        });
      }
      else {
        //Checks if there is a greet word
        found = SearchInputService.searchForGreeting();
        if (found !== undefined) {
          UiService.replyMessages(
            SearchInputService.inputStringForUser,
            DataService.cachedReplyMessages.ShortTalk.Hello.reply
          );
          UiService.sleep().then(() => {
            ButtonsService.getInfoButtons(DataService.cachedData);
          });
        }
        else {
          //Checks if there is a goodbye word
          found = SearchInputService.searchForBye();
          if (found !== undefined) {
            UiService.replyMessages(SearchInputService.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.Goodbye.reply);
            UiService.printBellButton();
          }
          else {
            //Checks if there is a how are you sentence
            found = SearchInputService.searchForHowAreYou();
            if (found !== undefined) {
              UiService.replyMessages(SearchInputService.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.HowAreYou.reply);
              UiService.sleep().then(() => { ButtonsService.getInfoButtons(DataService.cachedData); });
            }
            else {
              //Checks if there is a reference to who the bot is
              found = SearchInputService.searchForWhoAreYou();
              if (found !== undefined) {
                UiService.replyMessages(
                  SearchInputService.inputStringForUser,
                  DataService.cachedReplyMessages.ShortTalk.WhoAreYou
                    .reply
                );
                UiService.sleep().then(() => {
                  ButtonsService.getInfoButtons(DataService.cachedData);
                });
              }
              else {
                //Checks if there is a reference to who the bot can do
                found = SearchInputService.searchForWhatCanYouDo();
                if (found !== undefined) {
                  UiService.replyMessages(SearchInputService.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.WhatCanYouDo.reply);
                  UiService.sleep().then(() => {
                    ButtonsService.getInfoButtons(DataService.cachedData);
                  });
                }
                else {
                  //Checks if there is a goodbye word
                  found = SearchInputService.searchForBye();
                  if (found !== undefined) {
                    UiService.replyMessages(SearchInputService.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.Goodbye.reply);
                    UiService.sleep().then(() => {
                      ButtonsService.getInfoButtons(DataService.cachedData);
                    });
                  }
                  else {
                    //Checks if there is a how are you sentence
                    found = SearchInputService.searchForHowAreYou();
                    if (found !== undefined) {
                      UiService.replyMessages(SearchInputService.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.HowAreYou.reply);
                      UiService.sleep().then(() => {
                        ButtonsService.getInfoButtons(DataService.cachedData);
                      });
                    }
                    else {
                      UiService.replyMessages(SearchInputService.inputStringForUser, DataService.cachedReplyMessages.ShortTalk.NoComprende.reply);
                      UiService.sleep().then(() => {
                        ButtonsService.getInfoButtons(DataService.cachedData);
                      });
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
    if (elementProperties === undefined) {
      elementProperties = [
        "Price",
        "Overview",
        "Timeline",
        "Job Opportunities",
        "Apply"
      ];
    }

    for (let property of elementProperties) {
      if (
        SearchInputService.inputString
          .toLowerCase()
          .includes(property.toLowerCase())
      ) {
        foundItems.push(property);
      }
    }
    return foundItems;
  },

  // Checks if the user is asking to speak to a real person
  searchForContact: function () {
    let contactUs = [
      "contact",
      "contact you",
      "talk with somebody",
      "person",
      "official",
      "someone",
      "somebody",
    ];

    for (let contact of contactUs) {
      if (SearchInputService.inputString.toLowerCase().includes(contact)) {
        return contact;
      }
    }
  },

  //Checks if there is a greet word
  searchForGreeting: function () {
    let greetings = ["Hello", "Hi", "Good day", "Greetings", "Hey"];
    for (let greet of greetings) {
      if (
        SearchInputService.inputString
          .toLowerCase()
          .includes(greet.toLowerCase())
      ) {
        return greet;
      }
    }
  },

  //Checks if there is a goodbye word
  searchForBye: function () {
    let goodbyes = [
      "Bye",
      "Thank you",
      "See you",
      "Thanks",
      "Goodbye",
      "Farewell",
      "Goodnight",
      "Tnx",
    ];
    for (let goodbye of goodbyes) {
      if (
        SearchInputService.inputString
          .toLowerCase()
          .includes(goodbye.toLowerCase())
      ) {
        return goodbye;
      }
    }
  },

  //Checks if there is a how are you sentence
  searchForHowAreYou: function () {
    let howAreYous = [
      "how are you",
      "how are we",
      "are you ok",
      "are you well",
      "how's it going",
      "hows it going",
      "what's up",
      "whats up",
      "wazzup",
    ];
    for (let howAreYou of howAreYous) {
      if (
        SearchInputService.inputString
          .toLowerCase()
          .includes(howAreYou.toLowerCase())
      ) {
        return howAreYou;
      }
    }
  },

  //Checks if there is a reference to who the bot can do
  searchForWhatCanYouDo: function () { //check
    let whatCanYouDo = "what can you do";
    if (
      SearchInputService.inputString.toLowerCase().includes("what") &&
      SearchInputService.inputString.toLowerCase().includes("you") &&
      SearchInputService.inputString.toLowerCase().includes("do")
    ) {
      return whatCanYouDo;
    } else if (
      SearchInputService.inputString.toLowerCase().includes("what") &&
      SearchInputService.inputString.toLowerCase().includes("i") &&
      SearchInputService.inputString.toLowerCase().includes("do")
    ) {
      return whatCanYouDo;
    }
  },

  //Checks if there is a reference to who the bot is
  searchForWhoAreYou: function () {
    let whoAreYou = "who are you";
    if (
      SearchInputService.inputString.toLowerCase().includes("who") &&
      SearchInputService.inputString.toLowerCase().includes("you")
    ) {
      return whoAreYou;
    }
  },

  // Searches for a curse word and promotes looove
  searchForCurseWords: function () {
    let curseWords = [
      "idiot",
      "fuck",
      "suck",
      "cock",
      "love you",
      "f***",
      "stupid",
      "dumb",
    ];

    for (let curseWord of curseWords) {
      if (SearchInputService.inputString.toLowerCase().includes(curseWord)) {
        return curseWord;
      }
    }
  }
}; //PROPERTIES: Input field, Input button, Input value string, Input string that is shown to the user