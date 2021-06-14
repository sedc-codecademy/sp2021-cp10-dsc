const DataService = {
    url: "https://raw.githubusercontent.com/sedc-codecademy/sp2021-cp10-dsc/main/JSON/DATA.json",
    cachedData: null,
    cachedReplyMessages: null,
    cachedKeywords: null,
    cachedQuizzes: null,

    //Fetch the data from JSON
    getDataAsync: async function () {
        let response = await fetch(`${this.url}`);
        let data = await response.json();
        DataService.cachedData = await data.Data;
        DataService.cachedReplyMessages = await data.ReplyMessages;
        DataService.cachedKeywords = await data.KeywordsTiers;
        console.log(data);
        ButtonsService.getMainButtons(data.Data);
    },

    //Fetches all data from the Quizzes questions json
    fetchQuizzes: async function () {

        let response = await fetch(`https://raw.githubusercontent.com/OlgaBrova/ChatBot-Quiz/master/quizDB.json`);
        let data = await response.json();
        DataService.cachedQuizzes = await data;
    },
};//PROPERTIES: URL for JSON, Cached Data
