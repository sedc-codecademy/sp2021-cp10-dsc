const QuizzesService = {
    form: document.querySelector("#questionsForm"),
    gamesAndQuizzesWindow: document.getElementById("gamesAndQuizzesWindow"),
    popUpGamesAndQuizzes: document.getElementById("popUpGamesAndQuizzes"),
    areQuizzesOpen: false,

    //Prints buttons for all the quizzes
    printQuizzesMenu: async function () {
        AnimationsService.chatQuizzes.addEventListener('click', function () {
            UiService.disableGamesAndQuizzesButtons(true);
            QuizzesService.areQuizzesOpen = UiService.changeFlag(QuizzesService.areQuizzesOpen);

            AnimationsService.headerAnimation();
            setTimeout(() => {
                UiService.changeQuizzesGamesIconAndFunctionality(QuizzesService.areQuizzesOpen, AnimationsService.chatQuizzes, QuizzesService.gamesAndQuizzesWindow);

                QuizzesService.gamesAndQuizzesWindow.innerHTML = "";

                QuizzesService.gamesAndQuizzesWindow.innerHTML += `<p id="quizesMessage">Choose a Quiz</p> <hr class="chat-js-hr">`;

                QuizzesService.gamesAndQuizzesWindow.innerHTML +=
                    `<button id="webDevelopmentQuiz" class="btn">Web Development Quiz</button>
                        <button id="webDesignQuiz" class="btn" >Web Design Quiz</button>
                        <button id="gameDesignQuiz" class="btn" >Game Design Quiz</button>
                        <button id="graphicDesignQuiz" class="btn" >Graphic Design Quiz</button>
                        <button id="softwareTestingQuiz" class="btn" >Software Testing Quiz</button>`
                    ;
                UiService.disableGamesAndQuizzesButtons(false);
            }, 1100);
        });
        QuizzesService.getAllQuizzes();
    },

    //Get one quiz from json, by id
    getAllQuizzes: function () {

        QuizzesService.gamesAndQuizzesWindow.addEventListener('click', function (event) {
            if (event.target.matches(".btn")) {
                let quizName = event.target.id;
                ApplyAndPriceService.myModal.style.display = "block";
                ApplyAndPriceService.popUp.style.display = "none";
                QuizzesService.popUpGamesAndQuizzes.style.display = "block";
                QuizzesService.form.style.display = "block";

                DataService.fetchQuizzes()
                    .then(() => {
                        let data = DataService.cachedQuizzes;
                        let array = '';

                        if (quizName === "webDevelopmentQuiz") {
                            array = data.webDevelopmentQuiz;
                        } else if (quizName === "graphicDesignQuiz") {
                            array = data.graphicDesignQuiz;
                        } else if (quizName === "webDesignQuiz") {
                            array = data.webDesignQuiz;
                        } else if (quizName === "gameDesignQuiz") {
                            array = data.gameDesignQuiz;
                        }

                        QuizzesService.chooseRandomQuestions(array);
                        QuizzesService.renderQuestions(array);
                        QuizzesService.checkRightAnswers(array);
                    })
            }
        })
    },

    //Chooses 15 random questions from 30 questions for each quiz
    chooseRandomQuestions: function (questions) {
        let randomQuestions = [];

        for (let i = 0; i < 15; i++) {
            let index = Math.floor(Math.random() * questions.length);
            randomQuestions.push(questions[index]);
            questions.splice(index, 1);
        }

        return randomQuestions;
    },

    //Renders chosen random questions in pop-up window
    renderQuestions: function (questions) {
        ApplyAndPriceService.myModal.style.display = "block";
        QuizzesService.form.innerHTML = '';
        let inner = '';

        for (let i = 0; i < questions.length; i++) {
            inner += `
            <div class="quizQuestion">
                <p class="lead font-weight-normal"><b>${i + 1}. ${questions[i].question}</b></p>
                <div class="form-check">
                    <input type="radio" class="radio" name="q${i + 1}" value="A">
                    <label class="form-check-label">${questions[i].answer1}</label>
                </div>
                <div class="form-check">
                    <input type="radio" class="radio" name="q${i + 1}" value="B">
                    <label class="form-check-label">${questions[i].answer2}</label>
                </div>
                <div class="form-check">
                    <input type="radio" class="radio" name="q${i + 1}" value="C">
                    <label class="form-check-label">${questions[i].answer3}</label>
                </div>
                <div class="form-check">
                    <input type="radio" class="radio" name="q${i + 1}" value="D">
                    <label class="form-check-label">${questions[i].answer4}</label>
                </div>
            </div>
            <hr class="quiz-hr">`;
        }
        inner += `<input type="submit" id="submitBtn">`;

        QuizzesService.form.innerHTML += inner;
    },

    //Checks which question's answers are correct
    checkRightAnswers: function (questions) {
        return new Promise((resolve, reject) => {
            if (!questions || questions.length === 0) {
                reject("Something went wrong!");
            }

            let correctAnswers = [];
            for (let i = 0; i < questions.length; i++) {
                correctAnswers.push(questions[i].correctAnswer);
            }
            resolve(correctAnswers);

            QuizzesService.form.addEventListener('submit', e => {
                e.preventDefault();
                let userAnswers = [QuizzesService.form.q1.value, QuizzesService.form.q2.value, QuizzesService.form.q3.value, QuizzesService.form.q4.value, QuizzesService.form.q5.value, QuizzesService.form.q6.value, QuizzesService.form.q7.value, QuizzesService.form.q8.value, QuizzesService.form.q9.value, QuizzesService.form.q10.value, QuizzesService.form.q11.value, QuizzesService.form.q12.value, QuizzesService.form.q13.value, QuizzesService.form.q14.value, QuizzesService.form.q15.value];

                let score = 0;
                userAnswers.forEach((answer, i) => {
                    if (answer === correctAnswers[i]) {
                        score += 6.66666;
                    }
                });

                QuizzesService.form.innerHTML = '';
                QuizzesService.form.innerHTML += `<p id="quizResult">You got <span id="quizSpan" >${Math.ceil(score)}%</span> of the questions right!</p>`;
            });
        });
    }
};