import { UiService } from "./UiService";
import { ApplyService } from "./ApplyService";
import { ButtonsService } from "./ButtonsService";

export const ContactUsForm = {
  //Displays a SEDC contact email form

  printContactUsForm: function (searchService) {
    UiService.displayModalWindow("contact");

    ApplyService.popUp.innerHTML = `
        <div class="container" id="contactUsForm">
            <h1 class="formHeader">Contact us!</h1>
            <form action="https://formsubmit.co/INSERT-EMAIL-ADRESS-HERE" method="POST">
                <label>First Name</label>
                <input type="text" id="fname" name="FirstName" placeholder="Your name.." required>

                <label">Last Name</label>
                <input type="text" id="lname" name="LastName" placeholder="Your last name.." required>

                <label">Email</label>
                <input type="email" name="email" id="Email" placeholder="Your email.." required>

                <label>Subject</label>
                <input type="text" id="subject" name="Subject" placeholder="Message subject.." required>

                <label>Message</label>
                <textarea id="message" name="message" placeholder="Write something.." required style="height:200px"></textarea>
                <div class="submit">
                    <input type="submit" id="submit" value="Submit">
                <div>
            </form>
        </div>`;
    !searchService &&
      UiService.replyMessages("Contact", [
        "Thank you for contacting us! \nMay I help you with something else?",
      ]);
    UiService.sleep().then(() => {
      ButtonsService.isConversationDoneButtons(true);
    });
  },
};
