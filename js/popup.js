console.log('Popup.js is running!');

$(function () {

    /* Chrome Management */

    chrome.management.getAll(function (info) {
        // Set Search Box Placeholder 
        $('#myInput').attr('placeholder', `Search ${info.length} extensions`);

        // Operate DOM and Append Elements Dynamically 
        info.forEach(element => {

            // Get Each Extension's Info 
            let shortName = element.shortName;
            let id = element.id;
            let enabled = element.enabled ? "checked" : "";
            let description = element.description;
            let homepageUrl = element.homepageUrl;
            let icons = "/assets/images/null.jpg";
            if (typeof (element.icons) !== "undefined") {
                icons = element.icons[0].url;
            }

            $('.container')
                .append(`<div class="extension">          
                            <input type="checkbox" class="isEnabled" id="${id}" ${enabled}>
                            <img class="icons" id="${shortName}_icon" src=${icons}>
                            <span class="shortName_${enabled} mySpan" href="${homepageUrl}">${shortName}</span>  
                            <button class="uninstall">btn</button>
                        </div>`);
        });
        // console.log(info);
    });



    /* Events */

    // Click span Event 
    $('.container').on('click', 'span', function () {
        let url = $(this).attr('href');
        window.open(url);
    });

    // Checkbox Change Event
    $('.container').on('change', '.isEnabled', function () {
        if ($(this).is(':checked')) {
            // console.log("false->true: " + $(this).attr('id'));

            $(this).next().next().removeClass('shortName_').addClass('shortName_checked');
            chrome.management.setEnabled($(this).attr('id'), true, function () {
                console.log('false -> true');
            });
        } else {
            // console.log("true->false: " + $(this).attr('id'));

            $(this).next().next().removeClass('shortName_checked').addClass('shortName_');
            chrome.management.setEnabled($(this).attr('id'), false, function () {
                console.log('true -> false');
            });
        }
    });

    // Keyup Event 
    $('#myInput').keyup(searchExtensions);

    // Search Extension  
    function searchExtensions() {
        let keyword = $(this).val();
        let input = $(this).val().toUpperCase();
        let cnt = $('.container');
        let extensions = $('div.extension');
        let shortName = "";

        extensions.each(function (index, element) {
            shortName = $(element).find('span.mySpan').text();

            // Clear highlight span 
            if($(element).find('.highlight').length !== 0){
                $(element)
                    .find('.highlight')
                    .replaceWith($(element).find('.highlight').html());
            }

            // Highlight keyword and Change diplay
            if (shortName.toUpperCase().indexOf(input) > -1) {
                $(element).css('display', "block");
                
                var regex = RegExp(`${keyword}`, "i");
                $(element)
                    .find('span.mySpan')
                    .html(
                        $(element).find('span.mySpan').html()
                        .replace(regex, `<span class=\"highlight\">$&</span>`)
                    );
            } else {
                $(element).css('display', "none");
            }
        });
    }
});