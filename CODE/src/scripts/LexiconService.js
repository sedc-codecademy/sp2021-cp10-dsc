const LexiconService = {
    // Checks if input string contains synonyms to the keywords and returns new modified string with those keywords
    checkForKeywords: function (inputString) {
        let modifiedInput = inputString;

        // Checks whether input string has a reference to "Price" and if so adds the corresponding keyword to the modified input string
        let priceKeywords = ["cost", "how much"];
        if (this.doesContainKeyword(inputString, priceKeywords)) {
            modifiedInput += "Price";
        }

        // Checks whether input string has a reference to "Overview" and if so adds the corresponding keyword to the modified input string
        let overviewKeywords = ["what is", "development", "developer", "developing", "coding", "web", "site", "what's"];
        if (this.doesContainKeyword(inputString, overviewKeywords)) {
            modifiedInput += "Overview";
        }

        // Checks whether input string has a reference to "Timeline" and if so adds the corresponding keyword to the modified input string
        let timelineKeywords = ["how long", "time", "when"];
        if (this.doesContainKeyword(inputString, timelineKeywords)) {
            modifiedInput += "Timeline";
        }

        // Checks whether input string has a reference to "Trainers" and if so adds the corresponding keyword to the modified input string
        let trainersKeywords = ["trainers", "trainer", "teacher", "teachers", "lecturers", "coach", "coaches", "teaching", "lecturing", "coaching"];
        if (this.doesContainKeyword(inputString, trainersKeywords)) {
            modifiedInput += "Trainers";
        }

        // Checks whether input string has a reference to "Apply" and if so adds the corresponding keyword to the modified input string
        let applyKeywords = ["application", "enroll", "sign up", "register"];
        if (this.doesContainKeyword(inputString, applyKeywords)) {
            modifiedInput += "Apply";
        }

        if (modifiedInput.toLowerCase().includes("price")) {
            modifiedInput = "Price";
        }

        return modifiedInput;
    },

    doesContainKeyword: function (inputString, keywords) {
        const keyword = (key) => inputString.toLowerCase().includes(key);
        return keywords.some(keyword);
    }
}