console.log('background running!');

// Enabled
chrome.management.onEnabled.addListener(function (info) {
    let msg = {
        'shortname': info.name,
        'enabled': info.enabled
    }
    console.log(msg);   
});

// Disabled
chrome.management.onDisabled.addListener(function (info) {  
    let msg = {
        'shortname': info.name,
        'enabled': info.enabled
    }
    console.log(msg);
});
