const GamesService = {
    myModalGame: document.getElementById("myModalGames"),
    popUpGame: document.getElementById("popUpGames"),
    closeModalGame: document.getElementById("closeGame"),
    areGamesOpen: false,


    //Prints buttons for all the games
    printGamesMenu: function () {

        AnimationsService.chatGames.addEventListener('click', function () {
            GamesService.areGamesOpen = UiService.changeFlag(GamesService.areGamesOpen);

            AnimationsService.headerAnimation();
            setTimeout(() => {
                UiService.changeQuizzesGamesIconAndFunctionality(GamesService.areGamesOpen, AnimationsService.chatGames, QuizzesService.gamesAndQuizzesWindow);

                QuizzesService.gamesAndQuizzesWindow.innerHTML = "";

                QuizzesService.gamesAndQuizzesWindow.innerHTML += `<p id="gamesMessage">Choose a Game</p>
                <hr class="chat-js-hr">`;

                QuizzesService.gamesAndQuizzesWindow.innerHTML +=
                    `
                <button id="clashOfCode" onclick="GamesService.startGame('1')">Clash of Code</button>
                <button id="cssDinner" onclick="GamesService.startGame('2')">CSS Dinner</button>
                <button id="flexboxFroggy" onclick="GamesService.startGame('3')">FlexBox Froggy</button>
                <button id="vimAdventures" onclick="GamesService.startGame('4')">VIM Adventures</button>
                <button id="elevatorSaga" onclick="GamesService.startGame('5')">Elevator Saga</button>
                <hr class="chat-js-hr">
                <button id="kidsGames" onclick="GamesService.startGame('6')">Kids Coding Games</button>
                `;
            }, 1060);
        });
    },

    startGame: function (gameNumber) {

        let url = '';

        switch (gameNumber) {
            case '1':
                url = "https://www.codingame.com/ide/puzzle/onboarding";
                break;
            case '2':
                url = "https://flukeout.github.io/";
                break;
            case '3':
                url = "http://flexboxfroggy.com/";
                break;
            case '4':
                url = "https://vim-adventures.com/";
                break;
            case '5':
                url = "http://play.elevatorsaga.com/";
                break;
            case '6':
                url = "https://blockly.games/";
                break;
        }

        this.myModalGame.style.display = "block";

        this.popUpGame.innerHTML = "";

        this.popUpGame.innerHTML += `<iframe src= ${url} scrolling="no" seamless="seamless" marginheight="0" marginwidth="0" frameBorder="0" width="100%" height="100%" ></iframe>`;
    }
};