const DataService = {
    url: "https://raw.githubusercontent.com/sedc-codecademy/sp2021-cp10-dsc/development-js/JSON/DATA.json",
    cachedData: null,
    cachedReplyMessages: null,
    cachedQuizzes: null,

    //Fetch the data from JSON
    getDataAsync: async function () {
        let response = await fetch(`${this.url}`);
        let data = await response.json();
        DataService.cachedData = await data.Data;
        DataService.cachedReplyMessages = await data.ReplyMessages;
        ButtonsService.getMainButtons(data.Data);
        console.log(data.ReplyMessages);
    },

    //Fetches all data from the Quizzes questions json
    fetchQuizzes: async function () {
        let response = await fetch(`https://raw.githubusercontent.com/sedc-codecademy/sp2021-cp10-dsc/development-js/JSON/Quizzes.json`);
        let data = await response.json();
        DataService.cachedQuizzes = await data;
    },
};//PROPERTIES: URL for JSON dummy server, Cached Data, Cached ReplyMessages, Cached Quizzes
