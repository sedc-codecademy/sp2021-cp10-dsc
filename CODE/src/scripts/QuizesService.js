const QuizzesService = {
    form: document.querySelector("#questionsForm"),
    gamesAndQuizzesWindow: document.getElementById("gamesAndQuizzesWindow"),
    popUpQuizzes: document.getElementById("popUpQuizzes"),
    areQuizzesOpen: false,
    displayedQuestions: null,

    //Prints buttons for all the quizzes
    printQuizzesMenu: function () {
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

            if (DataService.cachedQuizzes === null) {
                UiService.disableGamesAndQuizzesButtons(false);
                return;
            }

            let inner = `<p id="quizesMessage">Take a Quiz</p> <hr class="chat-js-hr">`;

            inner += `<div id="twoRowBtnDiv" class="twoRowBtnFlex">`;

            for (let quiz in DataService.cachedQuizzes.Quizzes) {
                inner +=
                    `<button id="${quiz}" class="btnCard" onclick="QuizzesService.getQuiz('${quiz}')">
                        <div class="btnCardName">${quiz.replace(/-/g, " ")}</div>
                        <div class="btnCardDescription">${DataService.cachedQuizzes.Descriptions[quiz]}</div>
                    </button>`;
            }
            inner += `</div>`
            QuizzesService.gamesAndQuizzesWindow.innerHTML = inner;
            UiService.disableGamesAndQuizzesButtons(false);
        });
    },

    //Prints the chosen quiz from JSON
    getQuiz: function (id) {
        let data = DataService.cachedQuizzes.Quizzes[id];

        UiService.displayModalWindow("quizzes");
        if (data === undefined) {
            QuizzesService.somethingWentWrong();
            return;
        }

        QuizzesService.chooseRandomQuestions(data);
    },

    // Chooses 15 random questions from 30 questions for each quiz
    chooseRandomQuestions: function (data) {
        let randomQuestions = [];

        for (let i = 0; i < 15; i++) {
            let index = Math.floor(Math.random() * data.length);
            if (randomQuestions.includes(data[index])) {
                i--;
                continue;
            } else {
                randomQuestions.push(data[index]);
            }
        }

        QuizzesService.renderQuestions(randomQuestions);
    },

    //Renders chosen random questions in pop-up window
    renderQuestions: function (questions) {
        this.displayedQuestions = questions;
        QuizzesService.form.innerHTML = "";

        let inner = '';
        for (let i = 0; i < questions.length; i++) {
            inner += `
            <div class="quizQuestion">
                <p><b>${i + 1}. ${questions[i].question}</b></p>
                <div class="form-check">
                    <input type="radio" class="radio" name="q${i + 1}" value="A" id="first${i}">
                    <label for="first${i}" class="form-check-label">${questions[i].answer1}</label>
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
        inner += `<button type="submit" id="submitBtn">Submit</button>`;
        QuizzesService.form.innerHTML = inner;
    },

    //Checks which question's answers are correct
    checkRightAnswers: function (event) {
        event.preventDefault();

        let userAnswers = [QuizzesService.form.q1.value, QuizzesService.form.q2.value, QuizzesService.form.q3.value, QuizzesService.form.q4.value, QuizzesService.form.q5.value, QuizzesService.form.q6.value, QuizzesService.form.q7.value, QuizzesService.form.q8.value, QuizzesService.form.q9.value, QuizzesService.form.q10.value, QuizzesService.form.q11.value, QuizzesService.form.q12.value, QuizzesService.form.q13.value, QuizzesService.form.q14.value, QuizzesService.form.q15.value];

        const empty = (x) => x === "";
        if (userAnswers.some(empty)) {
            QuizzesService.form.style.display = "flex";
            QuizzesService.form.innerHTML = '<p class="somethingWentWrongMessage">All the questions must be answered before you submit them! <br><br>Please try again!</p>';
            return;
        }

        let score = 0;
        userAnswers.forEach((answer, i) => {
            if (answer === QuizzesService.displayedQuestions[i].correctAnswer) {
                score += 6.66666;
            }
        });

        QuizzesService.form.style.display = "flex";
        QuizzesService.form.innerHTML = `<p class="somethingWentWrongMessage" id="quizResult">You got ${Math.ceil(score)}% of the questions right!</p>`;
    },

    //Prints a message if something is wrong with the quiz
    somethingWentWrong: function () {
        UiService.displayModalWindow("quizzes");
        QuizzesService.form.innerHTML = `<p class="somethingWentWrongMessage">Something went wrong! <br>Please try again later!</p>`
    },

    getQuizzesData: function () {
        return {
            Quizzes: {
                "Web-Development": [
                    {
                        "id": "1",
                        "question": "What does HTML stand for?",
                        "answer1": "Hyperlinks and Text Markup Language",
                        "answer2": "Hypertext Markup Language",
                        "answer3": "Home Tool Markup Language",
                        "answer4": "Hyper Text Module Language",
                        "correctAnswer": "B"
                    },
                    {
                        "id": "2",
                        "question": "Choose the correct HTML tag for the largest heading:",
                        "answer1": "&lt;heading&gt;\n",
                        "answer2": "&lt;h6&gt;\n",
                        "answer3": "&lt;head&gt;\n",
                        "answer4": "&lt;h1&gt;\n",
                        "correctAnswer": "D"
                    },
                    {
                        "id": "3",
                        "question": "What is the correct HTML tag for inserting a line break?",
                        "answer1": "&lt;br&gt;\n",
                        "answer2": "&lt;lb&gt;\n",
                        "answer3": "&lt;break&gt;\n",
                        "answer4": "&lt;hr&gt;\n",
                        "correctAnswer": "A"
                    },
                    {
                        "id": "4",
                        "question": "What should be the first tag in any HTML document?",
                        "answer1": "&lt;html&gt;\n",
                        "answer2": "&lt;document&gt;\n",
                        "answer3": "&lt;title&gt;\n",
                        "answer4": "&lt;head&gt;\n",
                        "correctAnswer": "A"
                    },
                    {
                        "id": "5",
                        "question": "What is the correct HTML for creating a hyperlink?",
                        "answer1": "&lt;a url=\"http://www.w3schools.com\"&gt;W3Schools.com&lt;/a&gt;\n",
                        "answer2": "&lt;a name=\"http://www.w3schools.com\"&gt;W3Schools.com&lt;/a&gt;\n",
                        "answer3": "&lt;a href=\"http://www.w3schools.com\"&gt;W3Schools&lt;/a&gt;\n",
                        "answer4": "&lt;a&gt;http://www.w3schools.com&lt;/a&gt;\n",
                        "correctAnswer": "C"
                    },
                    {
                        "id": "6",
                        "question": "What is the correct HTML for inserting an image?",
                        "answer1": "&lt;img alt=\"MyImage\"&gt;image.gif&lt;/img&gt;\n",
                        "answer2": "&lt;img src=\"image.gif\" alt=\"MyImage\"&gt;\n",
                        "answer3": "&lt;image src=\"image.gif\" alt=\"MyImage\"&gt;\n",
                        "answer4": "&lt;img href=\"image.gif\" alt=\"MyImage\"&gt;\n",
                        "correctAnswer": "B"
                    },
                    {
                        "id": "7",
                        "question": "How can you make a numbered list?",
                        "answer1": "&lt;ol&gt;\n",
                        "answer2": "&lt;ul&gt;\n",
                        "answer3": "&lt;dl&gt;\n",
                        "answer4": "&lt;list&gt;\n",
                        "correctAnswer": "A"
                    },
                    {
                        "id": "8",
                        "question": "What is the correct HTML for making a checkbox?",
                        "answer1": "&lt;checkbox&gt;\n",
                        "answer2": "&lt;input type=\"checkbox\"&gt;\n",
                        "answer3": "&lt;check&gt;\n",
                        "answer4": "&lt;input type=\"check\"&gt;\n",
                        "correctAnswer": "B"
                    },
                    {
                        "id": "9",
                        "question": "What does CSS stand for?",
                        "answer1": "Creative Style Sheets",
                        "answer2": "Cascading Style Sheets",
                        "answer3": "Computer Style Sheets",
                        "answer4": "Colorful Style Sheets",
                        "correctAnswer": "B"
                    },
                    {
                        "id": "10",
                        "question": "What is the correct HTML for referring to an external style sheet?",
                        "answer1": "&lt;stylesheet&gt;mystyle.css&lt;/stylesheet&gt;\n",
                        "answer2": "&lt;style src=\"mystyle.css\"&gt;\n",
                        "answer3": "&lt;link rel=\"stylesheet\" type=\"text/css\" href=\"mystyle.css\"&gt;\n",
                        "answer4": "None of the above",
                        "correctAnswer": "C"
                    },
                    {
                        "id": "11",
                        "question": "Which is the correct CSS syntax?",
                        "answer1": "body {color: black;}",
                        "answer2": "{body:color=black;}",
                        "answer3": "body:color=black;",
                        "answer4": "{body;color:black;}",
                        "correctAnswer": "A"
                    },
                    {
                        "id": "12",
                        "question": "Which property is used to change the background color?",
                        "answer1": "color",
                        "answer2": "background-color",
                        "answer3": "bgcolor",
                        "answer4": "None of the above",
                        "correctAnswer": "B"
                    },
                    {
                        "id": "13",
                        "question": "How do you add a background color for all &lt;h1&gt; elements?",
                        "answer1": "h1 {background-color:#FFFFFF;}",
                        "answer2": "h1.all {background-color:#FFFFFF;}",
                        "answer3": "all.h1 {background-color:#FFFFFF;}",
                        "answer4": "None of the above",
                        "correctAnswer": "A"
                    },
                    {
                        "id": "14",
                        "question": "Which property is used to change the left margin of an element?",
                        "answer1": "padding-left",
                        "answer2": "m-l",
                        "answer3": "indent",
                        "answer4": "margin-left",
                        "correctAnswer": "D"
                    },
                    {
                        "id": "15",
                        "question": "Which sign does jQuery use as a shortcut for jQuery?",
                        "answer1": "the ? sign",
                        "answer2": "the # sign",
                        "answer3": "the $ sign",
                        "answer4": "the @ sign",
                        "correctAnswer": "C"
                    },
                    {
                        "id": "16",
                        "question": "What is the correct jQuery code to set the background color of all p elements to red?",
                        "answer1": "$(\"p\").css(\"background-color\",\"red\");",
                        "answer2": "$(\"p\").manipulate(\"background-color\",\"red\");",
                        "answer3": "$(\"p\").layout(\"background-color\",\"red\");",
                        "answer4": "$(\"p\").style(\"background-color\",\"red\");",
                        "correctAnswer": "A"
                    },
                    {
                        "id": "17",
                        "question": "With jQuery, look at the following selector: $(\"div.intro\"). What does it select?",
                        "answer1": "All div elements with id=\"intro\"",
                        "answer2": "The first div element with id=\"intro\"",
                        "answer3": "The first div element with class=\"intro\"",
                        "answer4": "All div elements with class=\"intro\"",
                        "correctAnswer": "D"
                    },
                    {
                        "id": "18",
                        "question": "Which jQuery method is used to hide selected elements?",
                        "answer1": "hidden()",
                        "answer2": "visible(false)",
                        "answer3": "hide()",
                        "answer4": "display(none)",
                        "correctAnswer": "C"
                    },
                    {
                        "id": "19",
                        "question": "In CSS, what is the correct option to select all the tags on a page?",
                        "answer1": ".p { }",
                        "answer2": "#p { }",
                        "answer3": "&lt;p&gt; { }",
                        "answer4": "p { }",
                        "correctAnswer": "D"
                    },
                    {
                        "id": "20",
                        "question": "In CSS, select the property to set an image in a list instead of a standard bullet:",
                        "answer1": "list-image-src:",
                        "answer2": "list-style-image:",
                        "answer3": "list-image:",
                        "answer4": "image-list:",
                        "correctAnswer": "B"
                    },
                    {
                        "id": "21",
                        "question": "In CSS, select the appropriate option to style an element so that the next element would appear right next to it not underneath it:",
                        "answer1": "display: left;",
                        "answer2": "display: inline;",
                        "answer3": "display: horizontal;",
                        "answer4": "None of the above",
                        "correctAnswer": "B"
                    },
                    {
                        "id": "22",
                        "question": "In CSS, choose the correct option to select this image by its id:\n&lt;img id=\"mainpic\" src=\"cat.png\"&gt;\n",
                        "answer1": "#mainpic { }",
                        "answer2": ".mainpic { }",
                        "answer3": "img { }",
                        "answer4": "mainpic { }",
                        "correctAnswer": "A"
                    },
                    {
                        "id": "23",
                        "question": "Select the property used to create A space between the element’s border and inner content:",
                        "answer1": "border",
                        "answer2": "spacing",
                        "answer3": "padding",
                        "answer4": "margin",
                        "correctAnswer": "C"
                    },
                    {
                        "id": "24",
                        "question": "Select the correct HTML tag to make a text bold.",
                        "answer1": "&lt;bold&gt;\n",
                        "answer2": "&lt;b&gt;\n",
                        "answer3": "&lt;bo&gt;\n",
                        "answer4": "None of the above",
                        "correctAnswer": "B"
                    },
                    {
                        "id": "25",
                        "question": "Where in an HTML document is the correct place to refer to an external style sheet?",
                        "answer1": "In the &lt;head&gt; section",
                        "answer2": "In the &lt;body&gt; section",
                        "answer3": "At the end of the document",
                        "answer4": "None of the above",
                        "correctAnswer": "A"
                    },
                    {
                        "id": "26",
                        "question": "Which HTML tag is used to define an internal style sheet?",
                        "answer1": "&lt;script&gt;",
                        "answer2": "&lt;css&gt;",
                        "answer3": "&lt;style&gt;",
                        "answer4": "None of the above",
                        "correctAnswer": "C"
                    },
                    {
                        "id": "27",
                        "question": "How do you insert a comment in a CSS file?",
                        "answer1": "//comment//",
                        "answer2": "'comment'",
                        "answer3": "//comment",
                        "answer4": "/*comment*/",
                        "correctAnswer": "D"
                    },
                    {
                        "id": "28",
                        "question": "Which CSS property is used to change the text color of an element?",
                        "answer1": "color",
                        "answer2": "text-color",
                        "answer3": "font-color",
                        "answer4": "text-background",
                        "correctAnswer": "A"
                    },
                    {
                        "id": "29",
                        "question": "Which CSS property controls the text size?",
                        "answer1": "text-size",
                        "answer2": "font-size",
                        "answer3": "text-style",
                        "answer4": "font-style",
                        "correctAnswer": "B"
                    },
                    {
                        "id": "30",
                        "question": "How do you display hyperlinks without an underline?",
                        "answer1": "a {underline: none;}",
                        "answer2": "a {text-decoration: no-underline;}",
                        "answer3": "a {text-decoration: none;}",
                        "answer4": "a {decoration:  no-underline;}",
                        "correctAnswer": "C"
                    }
                ],
            },
            "Descriptions": {
                "Web-Development": "Thinking of becoming a Web Developer?"
            }
        }
    }
};//PROPERTIES: Form for the quizzes, Games and Quizzes main menu display, Pop up for the quizzes modal, Bool if the quizzes ate open, Displayed question array