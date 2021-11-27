const ButtonsService = {
  buttonsDiv: document.getElementById("buttonsDiv"),
  chatMinimize: document.getElementById("chatMinimize"),
  chatMaximize: document.getElementById("chatMaximize"),

  //Prints the buttons for Object info
  getInfoButtons: function (element) {
    this.buttonsDiv.innerHTML = "";
    AnimationsService.changeImageHead("haralampiye");

    for (const button of element.infoProperties) {
      this.buttonsDiv.innerHTML += `<button id="${button}" class="chatBotBtns" onclick="UiService.printAcademyInfo('${button}')">${button}</button>`;
    }
    buttonsDiv.scrollIntoView({ block: "end", behavior: "smooth" });
  },

  //Pop the question if the user got everything he needed
  isConversationDoneButtons: function () {
    this.buttonsDiv.innerHTML = "";
    UiService.chatHistory.innerHTML += `<div class="chatBubblesBot">May I help you with something else?</div>`;

    let answers = ["Yes", "No"];
    for (const answer of answers) {
      this.buttonsDiv.innerHTML += `<button id = "${answer}" class="chatBotBtns" onclick="UiService.printConversationDone('${answer}')">${answer}</button>`;
    }
    buttonsDiv.scrollIntoView({ block: "end", behavior: "smooth" });
  }
}