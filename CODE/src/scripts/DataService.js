const DataService = {
    cachedData: null,
    cachedReplyMessages: RepliesService.replies,
    cachedQuizzes: QuizzesService.getQuizzesData(),

    //Fetch the data from API
    getDataAsync: async function () {
        try {
            UiService.helpersDiv.innerHTML += `<div class="lds-dual-ring"></div>`;

            let response = await fetch(`https://dev.sedc.mk/wp-json/wp/v2/pages/4167?fbclid=IwAR0GF8p_JPAi40bfL22FNQUiTcR3q7W8e_nbn99VZhCI0cYx7cGyAeyZNKk`);
            let data = this.serializeData(await response.json());
            this.cachedData = data;

            UiService.helpersDiv.innerHTML = "";

            ButtonsService.getInfoButtons(data);
        } catch (error) {
            UiService.helpersDiv.innerHTML = "";

            AnimationsService.chatWindow.innerHTML =
                `<div id="errorWrapper" class="errorWrapper"> <img src="./src/img-avatars/errorImage.png" alt="Error Img">
                    <div class="errorText">"Oops, Something is wrong with my circuits I can't process the command"</br>Please try again later!</div>
                </div>`;
        }
    },

    //Serialize data from API
    serializeData: function (data) {
        return {
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
    }
};//PROPERTIES: Cached Data, Cached ReplyMessages, Cached Quizzes
