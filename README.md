# SEDC ChatBot 🔖 VERSION: 3.0.0 🔖


## Table of contents 📑
- [SEDC ChatBot 🔖 VERSION: 3.0.0 🔖](#sedc-chatbot--version-300-)
  - [Table of contents 📑](#table-of-contents-)
  - [General info ℹ️](#general-info-ℹ️)
  - [Technologies 💻](#technologies-)
  - [How to use 📘](#how-to-use-)
  - [Features ✨](#features-)
  - [Status 🏇](#status-)
  - [Credits 🧾](#credits-)
  - [License 🔒](#license-)

## General info ℹ️
* We are a team of students making a chat bot for SEDC

## Technologies 💻
* Vanilla JS (ES6)
* CSS
* HTML

## How to use 📘
* The bot is works on it's own and just needs to be merged with the index html of any webpage
* It may need a few tweaks depending on the webpage regarding the CSS and responsiveness
* The desired email recipient has to be inserted in the ContactUs service instead of the placeholder (insertEmailAdressHere) where the arrow indicates
```
const ContactUsForm = {
    //Displays a SEDC contact email form
    printContactUsForm: function () {
        UiService.displayModalWindow("contact");

        ApplyAndPriceService.popUp.innerHTML = `
        <div class="container" id="contactUsForm">
            <h1 class="formHeader">Contact us!</h1>
---->   <form action="https://formsubmit.co/INSERT-EMAIL-ADDRESS-HERE" method="POST">
```
## Features ✨
List of ready features:
* The chat bot window accepts user interaction
* The bot replies info for the chosen content
* The bot includes quiz related to Web Development
* The bot can both accept and understand written and voice commands (in English)
* The bot has both desktop and mobile versions
* The bot provides contact with SEDC if needed and sends a e-mail directly through and API from https://formsubmit.co
* THIS BOT SPREADS LOVE, NOT HATE

## Status 🏇
The project is finished and can be implemented on a website!

## Credits 🧾
* The UI design was done by Aleksandar Popovski - apopovski90@gmail.com - https://www.aleksandarpopovski.com/ - https://dribbble.com/popovskia - https://www.behance.net/popovskia
* The avatar icon was done by Aleksandra Cakikj - aleksandra.cakikj@gmail.com - https://www.behance.net/AleksandraCakikj

## License 🔒
[MIT](https://github.com/sedc-codecademy/sp2021-cp10-dsc/blob/main/LICENSE)
