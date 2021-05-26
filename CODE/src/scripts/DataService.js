const DataService = {
    url: "https://raw.githubusercontent.com/Dejan-Stojkoski/ChatBotApp/master/JSON/DATA.json",
    cachedData: null,
    cachedReplyMessages : null,
    cachedKeywords : null,

    //Fetch the data from JSON
    getDataAsync: async function () {
        let response = await fetch(`${this.url}`);
        let data = await response.json();
        DataService.cachedData = await data.Data;
        DataService.cachedReplyMessages = await data.ReplyMessages;
        DataService.cachedKeywords = await data.KeywordsTiers;
        console.log(data);
        ButtonsService.getMainButtons(data.Data);
    }
};//PROPERTIES: URL for JSON, Cached Data
