//import "regenerator-runtime/runtime";

import { AnimationsService } from "./AnimationsService";
import { UiService } from "./UiService";
import { ContactUsForm } from "./ContactUsService";

export const ButtonsService = {
  buttonsDiv: document.getElementById("buttonsDiv"),
  UiService: UiService,
  //Prints the buttons for Object info
  getInfoButtons: function (element) {
    this.buttonsDiv.innerHTML = "";
    AnimationsService.repositionImageHead();

    for (const button of element.infoProperties) {
      this.buttonsDiv.innerHTML += `<button id="${button}" class="chatBotBtns" onclick="this.UiService && this.UiService.printAcademyInfo('${button}')">${button}</button>`;
    }
    this.buttonsDiv.innerHTML += `<button class="chatBotBtns" id="contactUs" onclick="${() =>
      ContactUsForm.printContactUsForm()};"> Contact Us </button>`;
    this.buttonsDiv.scrollIntoView({ block: "end", behavior: "smooth" });
  },

  //Pop the question if the user got everything he needed
  isConversationDoneButtons: function (contactUsFlag) {
    this.buttonsDiv.innerHTML = "";
    contactUsFlag !== undefined
      ? null
      : (UiService.chatHistory.innerHTML += `<div class="chatBubblesBot">May I help you with something else?</div>`);

    let answers = ["Yes", "No"];
    for (const answer of answers) {
      console.log("qwe");
      this.buttonsDiv.innerHTML += `<button id="${answer}" class="chatBotBtns" onclick="UiService.printConversationDone("${answer}")">${answer}</button>`;
    }
    buttonsDiv.scrollIntoView({ block: "end", behavior: "smooth" });
  },
}; //PROPERTIES: The buttons div
