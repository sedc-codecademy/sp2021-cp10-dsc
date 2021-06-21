const QuizzesService = {
    form: document.querySelector("#questionsForm"),
    gamesAndQuizzesWindow: document.getElementById("gamesAndQuizzesWindow"),
    popUpQuizzes: document.getElementById("popUpQuizzes"),
    areQuizzesOpen: false,

    //Prints buttons for all the quizzes
    printQuizzesMenu: async function () {
        AnimationsService.chatQuizzes.addEventListener('click', function () {
            UiService.disableGamesAndQuizzesButtons(true);
            QuizzesService.areQuizzesOpen = UiService.changeFlag(QuizzesService.areQuizzesOpen);

            if (!AnimationsService.isChatInitialized) {
                AnimationsService.headerAnimation();
                AnimationsService.chatQuizzes.addEventListener("animationend", function () {
                    UiService.changeQuizzesGamesIconAndFunctionality(QuizzesService.areQuizzesOpen, AnimationsService.chatQuizzes, QuizzesService.gamesAndQuizzesWindow);
                });
            } else {
                UiService.changeQuizzesGamesIconAndFunctionality(QuizzesService.areQuizzesOpen, AnimationsService.chatQuizzes, QuizzesService.gamesAndQuizzesWindow);
            }

            QuizzesService.gamesAndQuizzesWindow.innerHTML = `<p id="quizesMessage">Choose a Quiz</p> <hr class="chat-js-hr">`;
            QuizzesService.gamesAndQuizzesWindow.innerHTML +=
                `<div id="twoRowBtnDiv" class="twoRowBtnFlex">
                <button id="webDevelopmentQuiz" class="btnCard btn"><div class="btnCardName btn" id="webDevelopmentQuiz">Web Development</div><div class="btnCardDescription btn" id="webDevelopmentQuiz">Description</div></button>
                <button id="webDesignQuiz" class="btnCard btn"><div class="btnCardName btn" id="webDesignQuiz">Web Design</div><div class="btnCardDescription btn" id="webDesignQuiz">Description</div></button>
                <button id="gameDesignQuiz" class="btnCard btn"><div class="btnCardName btn" id="gameDesignQuiz">Game Design</div><div class="btnCardDescription btn" id="gameDesignQuiz">Description</div></button>
                <button id="graphicDesignQuiz" class="btnCard btn"><div class="btnCardName btn" id="graphicDesignQuiz">Graphic Design</div><div class="btnCardDescription btn" id="graphicDesignQuiz">Description</div></button>
                <button id="softwareTestingQuiz" class="btnCard btn"><div class="btnCardName btn" id="softwareTestingQuiz">Software Testing</div><div class="btnCardDescription btn" id="softwareTestingQuiz">Description</div></button>
                <button id="dataScience" class="btnCard btn"><div class="btnCardName btn" id="dataScience">Data Science</div><div class="btnCardDescription btn" id="dataScience">Description</div></button>
                <button id="digitalMarketing" class="btnCard btn"><div class="btnCardName btn" id="digitalMarketing">Digital Marketing</div><div class="btnCardDescription btn" id="digitalMarketing">Description</div></button>
                <button id="computerNetworkingQuiz" class="btnCard btn"><div class="btnCardName btn" id="computerNetworkingQuiz">Computer Networks</div><div class="btnCardDescription btn" id="computerNetworkingQuiz">Description</div></button>
                </div>`;
            UiService.disableGamesAndQuizzesButtons(false);
        });
        QuizzesService.getAllQuizzes();
    },

    //Prints the chosen quiz from JSON
    getAllQuizzes: function () {
        QuizzesService.gamesAndQuizzesWindow.addEventListener('click', function (event) {
            if (event.target.matches(".btn")) {
                UiService.displayModalWindow("quizzes");

                DataService.fetchQuizzes().then(() => {
                    let data = DataService.cachedQuizzes;
                    let array = data[event.target.id];

                    if(array === undefined){
                        QuizzesService.somethingWentWrong();
                        return;
                    }

                    array = QuizzesService.chooseRandomQuestions(array);
                });
            }
        })
    },

    // Chooses 15 random questions from 30 questions for each quiz
    chooseRandomQuestions: function (questions) {
        let randomQuestions = [];

        for (let i = 0; i < 15; i++) {
            let index = Math.floor(Math.random() * questions.length);
            randomQuestions.push(questions[index]);
            questions.splice(index, 1);
        }

        QuizzesService.renderQuestions(randomQuestions);
    },

    //Renders chosen random questions in pop-up window
    renderQuestions: function (questions) {
        QuizzesService.form.innerHTML = "";
        let inner = '';

        for (let i = 0; i < questions.length; i++) {
            inner += `
            <div class="quizQuestion">
                <p><b>${i + 1}. ${questions[i].question}</b></p>
                <div class="form-check">
                    <input type="radio" class="radio" name="q${i + 1}" value="A" id="first${i}">
                    <label for="first${i}" class="form-check-label">${questions[i].answer2}</label>
                </div>
                <div class="form-check">
                    <input type="radio" class="radio" name="q${i + 1}" value="B" id="second${i}">
                    <label for="second${i}" class="form-check-label">${questions[i].answer2}</label>
                </div>
                <div class="form-check">
                    <input type="radio" class="radio" name="q${i + 1}" value="C" id="third${i}">
                    <label for="third${i}" class="form-check-label">${questions[i].answer3}</label>
                </div>
                <div class="form-check">
                    <input type="radio" class="radio" name="q${i + 1}" value="D" id="fourth${i}">
                    <label for="fourth${i}" class="form-check-label">${questions[i].answer4}</label>
                </div>
            </div>
            <hr class="quiz-hr">`;
        }
        inner += `<input type="submit" id="submitBtn">`;
        QuizzesService.form.innerHTML = inner;
        QuizzesService.checkRightAnswers(questions);
    },

    //Checks which question's answers are correct
    checkRightAnswers: function (questions) {
            if (!questions || questions.length === 0) {
                this.somethingWentWrong();
            }

            QuizzesService.form.addEventListener('submit', e => {
                e.preventDefault();
                let userAnswers = [QuizzesService.form.q1.value, QuizzesService.form.q2.value, QuizzesService.form.q3.value, QuizzesService.form.q4.value, QuizzesService.form.q5.value, QuizzesService.form.q6.value, QuizzesService.form.q7.value, QuizzesService.form.q8.value, QuizzesService.form.q9.value, QuizzesService.form.q10.value, QuizzesService.form.q11.value, QuizzesService.form.q12.value, QuizzesService.form.q13.value, QuizzesService.form.q14.value, QuizzesService.form.q15.value];

                const empty = (x) => x === "";
                if(userAnswers.some(empty)){
                    QuizzesService.form.innerHTML = '<p class="somethingWentWrongMessage">All the questions must be answered before you submit them! <br><br>Please try again!</p>';
                    return;
                }

                let score = 0;
                userAnswers.forEach((answer, i) => {
                    if (answer === questions[i].correctAnswer) {
                        score += 6.66666;
                    }
                });

                QuizzesService.form.innerHTML = `<p id="quizResult">You got <span id="quizSpan" >${Math.ceil(score)}%</span> of the questions right!</p>`;
            });
    },

    //Prints a message if something is wrong with the quiz
    somethingWentWrong: function(){
        UiService.displayModalWindow("quizzes");
        QuizzesService.form.innerHTML = `<p class="somethingWentWrongMessage">Something went wrong! <br>Please try again later!</p>`
    }
};//PROPERTIES: Form for the quizzes, Games and Quizzes main menu display, Pop up for the quizzes modal, Bool if the quizzes ate open