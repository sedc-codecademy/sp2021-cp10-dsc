const ApplyService = {
    myModal: document.getElementById("myModal"),
    popUp: document.getElementById("popUp"),
    closeModalButton: document.getElementById("close"),

    //Gets the application form needed
    getApplyForm: function () {
        let applicationUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfamWShsXlBZqvMf3WoAKpr2jW5zr4AO7a4XGD7ch_V1KvVmg/viewform";

        UiService.displayModalWindow("apply");
        ApplyService.popUp.innerHTML = `<iframe src="${applicationUrl}" width="97%" height="100%" frameborder="0" marginheight="0" marginwidth="0"></iframe>`;
    },
};//PROPERTIES: The Modal div, Pop up from the modal, Close modal button, Application url, Price table url