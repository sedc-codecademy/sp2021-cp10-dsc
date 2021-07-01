# SEDC ChatBot 🔖 VERSION: 3.0.0 🔖


## Table of contents 📑
* [General info](#general-info)
* [Technologies](#technologies)
* [How to use](#howtouse)
* [Features](#features)
* [Status](#status)
* [Credits](#credits)

## General info ℹ️
* We are a team of students making a chat bot for SEDC
* This app uses its own JSON dummy servers

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
---->   <form action="https://formsubmit.co/insertEmailAdressHere" method="POST">
```
## Features ✨
List of ready features:
* The chat bot window accepts user interaction
* The bot replies info for the chosen content
* The bot gives suggestions to the user in the form of buttons
* The bot includes quizzes related to SEDC
* The bot features games
* The bot can both accept and understand written and voice commands (in English)
* The bot has both desktop and mobile versions
* The bot provides contact with SEDC if needed and sends a e-mail directly through and API from https://formsubmit.co
* THIS BOT SPREADS LOVE, NOT HATE

## Status 🏇
The project is finished and can be implemented on a website!

## Credits 🧾
* The games in this project are iFrames of existing games on hosted on their own sites:
 - https://www.codingame.com/ide/puzzle/onboarding
 - https://flukeout.github.io/
 - http://flexboxfroggy.com/
 - https://vim-adventures.com/
 - http://play.elevatorsaga.com/
 - https://blockly.games/
* The UI/UX design was done by Aleksandar Popovski - apopovski90@gmail.com - https://www.aleksandarpopovski.com/ - https://dribbble.com/popovskia - https://www.behance.net/popovskia
* The avatar icons were done by Aleksandra Cakikj - aleksandra.cakikj@gmail.com - https://www.behance.net/AleksandraCakikj

## License 🔒
[MIT](https://github.com/sedc-codecademy/sp2021-cp10-dsc/blob/main/LICENSE)
