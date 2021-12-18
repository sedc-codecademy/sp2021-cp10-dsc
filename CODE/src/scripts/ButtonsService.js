import { UiService } from "./UiService";
import { AnimationsService } from "./AnimationsService";
import { ContactUsForm } from "./ContactUsService";
import { ApplyService } from "./ApplyService"; // Do not remove

export const ButtonsService = {
  buttonsDiv: document.getElementById("buttonsDiv"),

  //Prints the buttons for Object info
  getInfoButtons: function (academy) {
    this.buttonsDiv.innerHTML = "";
    AnimationsService.repositionImageHead();

    for (const button of academy.infoProperties) {
      this.buttonsDiv.innerHTML += `<button id="${button}" class="chatBotBtns">${button}</button>`;
    }
    this.buttonsDiv.innerHTML += `<button class="chatBotBtns" id="contactUs"> Contact Us </button>`;

    const optionButtons = [
      ...this.buttonsDiv.getElementsByClassName("chatBotBtns"),
    ];
    optionButtons.forEach((button) =>
      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const buttonInfo = e.target.id;
        if (buttonInfo !== "contactUs") {
          UiService.printAcademyInfo(buttonInfo);
        }
        if (buttonInfo === "contactUs") {
          ContactUsForm.printContactUsForm();
        }
      })
    );

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
      this.buttonsDiv.innerHTML += `<button id="${answer}" class="chatBotBtns">${answer}</button>`;
    }

    const optionButtons = [
      ...this.buttonsDiv.getElementsByClassName("chatBotBtns"),
    ];

    optionButtons.forEach((button) =>
      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const buttonInfo = e.target.id;
        UiService.printConversationDone(buttonInfo);
      })
    );

    this.buttonsDiv.scrollIntoView({ block: "end", behavior: "smooth" });
  },
}; //PROPERTIES: The buttons div
