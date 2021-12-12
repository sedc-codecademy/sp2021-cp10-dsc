const LexiconService = {
    // Checks if input string contains alternatives to the keywords and returns new modified string with those keywords
    checkForKeywords: function (inputString) {
        let keywordModifiedString = inputString;

        // Checks whether input string has a reference to "Price" and if so adds the corresponding keyword to the modified input string
        if (
            inputString.toLowerCase().includes("cost") ||
            inputString.toLowerCase().includes("how much")
        )
            keywordModifiedString += "Price";

        // Checks whether input string has a reference to "Overview" and if so adds the corresponding keyword to the modified input string
        if (
            inputString.toLowerCase().includes("what is") ||
            inputString.toLowerCase().includes("development") ||
            inputString.toLowerCase().includes("developer") ||
            inputString.toLowerCase().includes("developing") ||
            inputString.toLowerCase().includes("coding") ||
            inputString.toLowerCase().includes("web") ||
            inputString.toLowerCase().includes("site") ||
            inputString.toLowerCase().includes("what's")
        )
            keywordModifiedString += "Overview";

        // Checks whether input string has a reference to "Timeline" and if so adds the corresponding keyword to the modified input string
        if (
            inputString.toLowerCase().includes("how long") ||
            inputString.toLowerCase().includes("time") ||
            inputString.toLowerCase().includes("when")
        )
            keywordModifiedString += "Timeline";

        // Checks whether input string has a reference to "Job Opportunities" and if so adds the corresponding keyword to the modified input string
        if (
            inputString.toLowerCase().includes("trainers") ||
            inputString.toLowerCase().includes("trainer") ||
            inputString.toLowerCase().includes("teacher") ||
            inputString.toLowerCase().includes("teachers") ||
            inputString.toLowerCase().includes("lecturers") ||
            inputString.toLowerCase().includes("coach") ||
            inputString.toLowerCase().includes("coaches") ||
            inputString.toLowerCase().includes("teaching") ||
            inputString.toLowerCase().includes("lecturing") ||
            inputString.toLowerCase().includes("coaching")
        )
            keywordModifiedString += "Trainers";

        // Checks whether input string has a reference to "Apply" and if so adds the corresponding keyword to the modified input string
        if (
            inputString.toLowerCase().includes("application") ||
            inputString.toLowerCase().includes("enroll") ||
            inputString.toLowerCase().includes("sign up") ||
            inputString.toLowerCase().includes("register")
        )
            keywordModifiedString += "Apply";

            if (
                keywordModifiedString.toLowerCase().includes("price")
            )
                keywordModifiedString = "Price";
                
        return keywordModifiedString;
    }
}