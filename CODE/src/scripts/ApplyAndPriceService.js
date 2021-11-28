const ApplyAndPriceService = {
    myModal: document.getElementById("myModal"),
    popUp: document.getElementById("popUp"),
    closeModalButton: document.getElementById("close"),

    //Gets the application form needed
    getApplyForm: function () {
        let applicationUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfrbe6vM-Kje6VBpPSKUwzE_oe34UayAprtJoM_T4-RrswHeg/viewform";

        UiService.displayModalWindow("apply");
        ApplyAndPriceService.popUp.innerHTML = `<iframe src="${applicationUrl}" width="97%" height="100%" frameborder="0" marginheight="0" marginwidth="0"></iframe>`;
    },
};//PROPERTIES: The Modal div, Pop up from the modal, Close modal button, Application url, Price table url