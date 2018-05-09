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
            if (typeof (element.icons) !== "undefined") {
                icons = element.icons[0].url;
            }
            let enabled = element.enabled ? "checked" : "";
            let description = element.description;
            let homepageUrl = element.homepageUrl;

            $('.container')
                .append(`<div class="extension">          
                            <input type="checkbox" ${enabled}>
                            <img class="icons" id="${shortName}_icon" src=${icons}>
                            <span class="shortName_${enabled} mySpan" href="${homepageUrl}">${shortName}</span>  
                        </div>`);
        });
        console.log(info);
    });

    /* Events */

    /* Click Event */
    $('.container').on('click', 'span', function (param) {
        var url = $(this).attr('href');
        window.open(url);
    });

    /* Keyup Event */
    $('#myInput').keyup(searchExtensions);

    /* Search Extension  */
    function searchExtensions() {
        var input = $(this).val().toUpperCase();
        var cnt = $('.container');
        var extensions = $('div.extension');
        var shortName = "";

        extensions.each(function (index, element) {
            shortName = $(element).find('span').html();

            if (shortName.toUpperCase().indexOf(input) > -1) {
                $(element).css('display', "block");
            } else {
                $(element).css('display', "none");
            }
        });
    }
});