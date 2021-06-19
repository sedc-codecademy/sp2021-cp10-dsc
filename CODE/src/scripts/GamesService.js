const GamesService = {
    areGamesOpen: false,


    //Prints buttons for all the games
    printGamesMenu: function () {
        AnimationsService.chatGames.addEventListener('click', function () {
            UiService.disableGamesAndQuizzesButtons(true);
            GamesService.areGamesOpen = UiService.changeFlag(GamesService.areGamesOpen);

            if(!AnimationsService.isChatInitialized){
                AnimationsService.headerAnimation();
                AnimationsService.chatGames.addEventListener("animationend", function(){
                    UiService.changeQuizzesGamesIconAndFunctionality(GamesService.areGamesOpen, AnimationsService.chatGames, QuizzesService.gamesAndQuizzesWindow);
                });
            }else{
                UiService.changeQuizzesGamesIconAndFunctionality(GamesService.areGamesOpen, AnimationsService.chatGames, QuizzesService.gamesAndQuizzesWindow);
            }

            QuizzesService.gamesAndQuizzesWindow.innerHTML = "";

                QuizzesService.gamesAndQuizzesWindow.innerHTML += `<p id="gamesMessage">Choose a Game</p>
                <hr class="chat-js-hr">`;

                QuizzesService.gamesAndQuizzesWindow.innerHTML +=
                    `
                    <div id="twoRowBtnDiv" class="twoRowBtnFlex">

                <button id="clashOfCode" class="btnCard gamesCardBorderColor" onclick="GamesService.startGame('1')"><div class="btnCardName gamesCardColor">Clash of Code</div><div class="btnCardDescription">Description</div></button>

                <button id="cssDinner" class="btnCard gamesCardBorderColor" onclick="GamesService.startGame('2')"><div class="btnCardName gamesCardColor">CSS Dinner</div><div class="btnCardDescription">Description</div></button>

                <button id="flexboxFroggy" class="btnCard gamesCardBorderColor" onclick="GamesService.startGame('3')"><div class="btnCardName gamesCardColor">FlexBox Froggy</div><div class="btnCardDescription">Description</div></button>

                <button id="vimAdventures" class="btnCard gamesCardBorderColor" onclick="GamesService.startGame('4')"><div class="btnCardName gamesCardColor">VIM Adventures</div><div class="btnCardDescription">Description</div></button>

                <button id="elevatorSaga" class="btnCard gamesCardBorderColor" onclick="GamesService.startGame('5')"><div class="btnCardName gamesCardColor">Elevator Saga</div><div class="btnCardDescription">Description</div></button>

                <button id="kidsGames" class="btnCard gamesCardBorderColor" onclick="GamesService.startGame('6')"><div class="btnCardName gamesCardColor">Kids Coding Games</div><div class="btnCardDescription">Description</div></button>
                </div>
                `;
                UiService.disableGamesAndQuizzesButtons(false);
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

        UiService.displayModalWindow("games");

        ApplyAndPriceService.popUp.innerHTML = `<iframe src= ${url} scrolling="no" seamless="seamless" marginheight="0" marginwidth="0" frameBorder="0" width="100%" height="230%" ></iframe>`;
    }
};