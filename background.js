chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({ url: chrome.extension.getURL("meme-finder.html") }, function(
    tab
  ) {
    // Tab opened.
  });
});
