const DataService = {
    cachedData: null,
    cachedReplyMessages: RepliesService.replies,
    cachedQuizzes: null,

    //Fetch the data from JSON
    getDataAsync: async function () {
        try {
            let response = await fetch(`https://dev.sedc.mk/wp-json/wp/v2/pages/4167?fbclid=IwAR0GF8p_JPAi40bfL22FNQUiTcR3q7W8e_nbn99VZhCI0cYx7cGyAeyZNKk`);
            let data = DataService.serializeData(await response.json());
            DataService.cachedData = await data;
            ButtonsService.getInfoButtons(data);
        } catch (error) {
            AnimationsService.chatWindow.innerHTML =
                `<div id="errorWrapper" class="errorWrapper"> <img src="./src/img-avatars/errorEmo.png" alt="Error Img">
                <div class="errorText">"Oops, Something is wrong with my circuits I can't process the command"</br>Please try again later!</div>
            </div>`;
        }

    },

    //Fetches all data from the Quizzes questions json
    fetchQuizzes: async function () {
        try {
            let response = await fetch(`https://raw.githubusercontent.com/sedc-codecademy/sp2021-cp10-dsc/main/JSON/Quizzes.json`);
            let data = await response.json();
            DataService.cachedQuizzes = await data;
        } catch (error) {
            QuizzesService.QuizzesWindow.innerHTML =
                `<div id="errorWrapper" class="errorWrapper"> <img src="./src/img-avatars/quizzesError.png" alt="Error Img">
                <div class="errorText">"Oops, Something is wrong with my circuits I can't process the command"</br>Please try again later!</div>
            </div>`;
        }
    },

    serializeData: function (data) {
        let serializedData = {
            name: "Web Development",
            price: `The price of the academy is ${data.ACF.price}. However, there are some discounts for early registration and cash payment. Contact SEDC or go to the site to get more info about the discounts.`,
            overview: data.ACF.overview.split('\r')[0],
            timeline: `The academy duration is ${data.ACF.length_in_month}.\n${data.ACF['timeline-skopje'].map((x) => x.skopje).join(",\n")}.`,
            trainers: data.ACF.trainers,
            infoProperties: [
                "Overview",
                "Timeline",
                "Trainers",
                "Apply",
                "Price"
            ]
        }
        return serializedData;
    }
};//PROPERTIES: Cached Data, Cached ReplyMessages, Cached Quizzes
