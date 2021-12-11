const AnimationsService = {
    avatarImgDiv: document.getElementById("imgLogo"),
    chatQuizzes: document.getElementById("chatQuizzes"),
    chatName: document.getElementById("chatName"),
    chatWindow: document.getElementById("chatWindow"),
    isChatInitialized: false,

    //Animates the header - Image, Name, Icons
    headerAnimation: function () {
        this.isChatInitialized = true;
        if (window.innerWidth < 821) {
            this.avatarImgDiv.classList.add("avatarAnimation");

            this.avatarImgDiv.style.marginTop = "0rem";
            this.avatarImgDiv.style.marginLeft = "1.25rem";

            this.chatName.classList.add("fadeIn-avatarName");
            this.chatName.addEventListener("animationend", () => {
                this.chatName.style.opacity = "1";
            });
        } else {
            this.avatarImgDiv.classList.add("avatarAnimation");

            this.avatarImgDiv.addEventListener("animationend", () => {
                this.avatarImgDiv.style.marginTop = "-1.25rem";
                this.avatarImgDiv.style.marginLeft = "1.25rem";
            });

            this.chatName.classList.add("fadeIn-avatarName");
            this.chatName.addEventListener("animationend", () => {
                this.chatName.style.opacity = "1";
            });

            this.chatQuizzes.classList.add("games-quizzesAnimation");
            this.chatQuizzes.addEventListener("animationend", () => {
                this.chatQuizzes.classList.remove("chat-quizzes");
                this.chatQuizzes.classList.add("chat-quizzes-icon");
                this.chatQuizzes.innerHTML = `<img src="./src/img-avatars/quizzes.svg" height="25rem">`;
            });
        }
    },

    //Changes the bot personality depending on the chosen academy
    changeImageHead: function () {
        if (window.innerWidth < 821) {
            AnimationsService.chatName.style.marginTop = "0rem";
        } else {
            AnimationsService.chatName.style.marginTop = "0.9rem";
        }

        AnimationsService.chatName.innerHTML = "Haralampiye<br>SEDC Chat Bot";
    },

    //Functionality for window resize games and quizzes feature
    onResizeGamesAndQuizzes: function () {
        if (this.isChatInitialized) {
            if (window.innerWidth < 821) {
                this.chatQuizzes.style.display = "none";
                this.avatarImgDiv.style.marginTop = "0rem";
                this.avatarImgDiv.style.marginLeft = "1.25rem";
            } else {
                this.chatQuizzes.style.display = "block";

                this.chatQuizzes.classList.remove("chat-quizzes");
                this.chatQuizzes.classList.add("chat-quizzes-icon");
                this.chatQuizzes.innerHTML = `<img src="./src/img-avatars/quizzes.svg" height="25rem">`;

                this.avatarImgDiv.style.marginTop = "-1.25rem";
                this.avatarImgDiv.style.marginLeft = "1.25rem";
            }
        }
    }
};