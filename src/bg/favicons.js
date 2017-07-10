/**
 * Script to automatically add a favicon to QA and to Dev environments.
 * Does this by detecting a 'dev' or 'qa' suffix on the SNOW domain name.
 * 
 * @author Zach Bloomquist <snow@chary.us>
 */

var devIcon = chrome.runtime.getURL('icons/dev.png')
var qaIcon = chrome.runtime.getURL('icons/qa.png')
var envRegex = /https:\/\/[A-z0-9\-]+(qa|dev)\.service-now\.com.*/g

var updateFavicon = function(tabId, icon) {
    chrome.tabs.executeScript(tabId, {
        'code': 'var icon = "' + icon + '"; ' +
                //'document.querySelector("link[rel=\'shortcut icon\']").href = icon; ' +
                'document.querySelector("link[rel*=\'icon\']").href = icon;',
        'allFrames': true,
        'runAt': 'document_end'
    })
}

var faviconListener = (tabId, changeInfo, tab) => {
    if (!tab)
        return
    var res = envRegex.exec(tab.url)
    if (tab.favIconUrl != devIcon && res && res.length > 1) {
        switch(res[1]) {
            case 'qa':
                updateFavicon(tabId, qaIcon);
                break;
            case 'dev':
                updateFavicon(tabId, devIcon);
        }
    }
}

chrome.tabs.onUpdated.addListener(faviconListener);
chrome.tabs.onCreated.addListener(faviconListener);