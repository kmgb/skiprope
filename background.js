'use strict';

importScripts("localforage.min.js");

// Our command handler was accepted in the omnibox
chrome.omnibox.onInputEntered.addListener((text) => {
    localforage.getItem("commands").then(function (storedCommands) {
        if (storedCommands) {
            var commands = JSON.parse(storedCommands);

            // for (cmd in commands) {
            for (var i = 0; i < commands.length; i++) {
                var cmd = commands[i];

                if (cmd[0] === text) {
                    goToURL(cmd[2]);
                }
            }
        }
    });
});

function goToURL(url) {
    // Get the current tab (the one the address bar was submitted from) and update its URL to the command selection
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function (tabs) {
        if (tabs && tabs[0]) {
            chrome.tabs.update(tabs[0].id, {
                'url': url
            });
        }
    });
}

// TODO: Implement suggestions
// Currently blocked by https://bugs.chromium.org/p/chromium/issues/detail?id=1186804
// The following code should work as expected once the issue is resolved.

// chrome.omnibox.onInputChanged.addListener((text, suggest) => {
//     suggest([{
//         content: "text",
//         description: "Sample command"
//     }]);
// });
