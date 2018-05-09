$(function () {
    console.log('Popup.js is running!');

    chrome.management.getAll(function (info) {
        
        /* Set Search Box Placeholder */
        $('#myInput').attr('placeholder', `Search ${info.length} extensions`);
       
        /* Operate DOM */
        info.forEach(element => {
            
            /* Get Each Extension's Info */
            let shortName = element.shortName;
            let icons = null;
            if(typeof(element["icons"]) !== "undefined") {
                icons = element.icons[0].url;
            }

            let enabled = element.enabled ? "checked":"";
            let description = element.description;
            let homepageUrl = element.homepageUrl;

            $('.container')
                .append(`<div class="extension">          
                            <input type="checkbox" ${enabled}>
                            <img class="icons" id="${shortName}_icon" src=${icons}>
                            <span class="shortName_${enabled} mySpan"> ${shortName}</span>  
                        </div>`);
        });
        console.log(info);
    });

});