console.log('Popup.js is running!');

$(function () {
    chrome.management.getAll(function (info) {
        
        /* Set Search Box Placeholder */
        $('#myInput').attr('placeholder', `Search ${info.length} extensions`);
       
        /* Operate DOM and Append Elements Dynamically */
        info.forEach(element => {
            
            /* Get Each Extension's Info */
            let shortName = element.shortName;
            let icons = "/assets/images/null.jpg";
            if(typeof(element.icons) !== "undefined") {
                icons = element.icons[0].url;
            }
            let enabled = element.enabled ? "checked":"";
            let description = element.description;
            let homepageUrl = element.homepageUrl;

            $('.container')
                .append(`<div class="extension" >          
                            <input type="checkbox" ${enabled}>
                            <img class="icons" id="${shortName}_icon" src=${icons}>
                            <span class="shortName_${enabled} mySpan" href="${homepageUrl}">${shortName}</span>  
                        </div>`);
        });
        console.log(info);
    });

    /* Click and Open the Home Page */
    $('.container').on('click', 'span', function (param) {  
        var url = $(this).attr('href');
        window.open(url);
    });

    // $('#myInput').keyup(searchExtensions());
    
    /* Search Extension */
    function searchExtensions() {
        console.log($('#myInput'));
    }
});
