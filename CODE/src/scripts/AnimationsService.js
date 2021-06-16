const AnimationsService = {
    avatarImgDiv: document.getElementById("imgLogo"),
    chatGames: document.getElementById("chatGames"),
    chatQuizzes: document.getElementById("chatQuizzes"),
    chatName : document.getElementById("chatName"),
    recommendedSlide: document.getElementById("recommendedSlide"),
    chatWindow: document.getElementById("chatWindow"),
    mainWindow: document.getElementById("mainWindow"),

    //Animates the header - Image, Name, Icons
    headerAnimation: function () {
        if(window.innerWidth < 725){
            this.avatarImgDiv.classList.add("avatarAnimation");

            this.avatarImgDiv.style.marginTop = "0rem";
            this.avatarImgDiv.style.marginLeft = "1.25rem";

            this.chatName.classList.add("fadeIn-avatarName");
            this.chatName.addEventListener("animationend", () => {
                this.chatName.style.opacity = "1";
            });
        }else{
            this.avatarImgDiv.classList.add("avatarAnimation");

        this.avatarImgDiv.addEventListener("animationend", () => {
            this.avatarImgDiv.style.marginTop = "-1.25rem";
            this.avatarImgDiv.style.marginLeft = "1.25rem";
        });

        this.chatName.classList.add("fadeIn-avatarName");
        this.chatName.addEventListener("animationend", () => {
            this.chatName.style.opacity = "1";
        });

        this.chatGames.classList.add("games-quizzesAnimation");
        this.avatarImgDiv.addEventListener("animationend", () => {
            this.chatGames.classList.remove("chat-games");
            this.chatGames.classList.add("chat-games-icon");
            this.chatGames.innerHTML = `<img src="./src/img-avatars/games.png" height="25rem">`;
        });

        this.chatQuizzes.classList.add("games-quizzesAnimation");
        this.chatQuizzes.addEventListener("animationend", () => {
            this.chatQuizzes.classList.remove("chat-quizzes");
            this.chatQuizzes.classList.add("chat-quizzes-icon");
            this.chatQuizzes.innerHTML = `<img src="./src/img-avatars/quizzes.png" height="25rem">`;

        });
        }
    },

    //Animates the recommendations slide
    recommendedBtnsAnimations: function () {
        // screen.width < 751 ? AnimationsService.chatWindow.style.height = "82%" : AnimationsService.chatWindow.style.height = "68%";
        UiService.chatHistory.scrollIntoView({ block: 'end', behavior: 'smooth' });

        ButtonsService.recommendationsButtons();

        UiService.recommendedDiv.style.display = "block";
        AnimationsService.recommendedSlide.classList.add("slider");

        this.recommendedSlide.addEventListener("animationiteration", () => {
            ButtonsService.recommendationsButtons();
        })
        UiService.recommendedDiv.scrollIntoView({ block: 'end', behavior: 'smooth' });
    },

    //Changes the bot personality depending on the chosen academy
    changeImageHead: function(academy){
        switch (academy) {
            case 'programming':
            case 'Web Development':
                AnimationsService.avatarImgDiv.style.backgroundImage = "url(./src/img-avatars/CODE.png)";
                break;
            case 'computerNetworks':
            case 'CloudOps Network Engineer':
            case 'Security Specialist':
                AnimationsService.avatarImgDiv.style.backgroundImage = "url(./src/img-avatars/Networks.png)";
                break;
            case 'design':
            case 'Graphic Designer':
            case 'Web Designer':
            case 'Game Designer':
                AnimationsService.avatarImgDiv.style.backgroundImage = "url(./src/img-avatars/DESIGN.png)";
                break;
            case 'softwareTesting':
            case 'Software Tester':
                AnimationsService.avatarImgDiv.style.backgroundImage = "url(./src/img-avatars/QA.png)";
                break;
            // case 'dataScience':
                // AnimationsService.avatarImgDiv.style.backgroundImage = "url(./src/img-avatars/.png)";
            //     break;
            // case 'digitalMarketing':
                // AnimationsService.avatarImgDiv.style.backgroundImage = "url(./src/img-avatars/.png)";
            //     break;
            // case 'iThink':
                // AnimationsService.avatarImgDiv.style.backgroundImage = "url(./src/img-avatars/.png)";
            //     break;
            case 'haralampiye':
                AnimationsService.avatarImgDiv.style.backgroundImage = "url(./src/img-avatars/HARALAMPIYE.png)";
                break;
        }
    }
};//PROPERTIES: The image div, Games button, Quizzes button, Name div, Recommended buttons slide, Chat div, Main div