// lol
chrome.history.search(
  { text: "jpg", startTime: 0, maxResults: 99999 },
  jpg_items =>
    chrome.history.search(
      { text: "png", startTime: 0, maxResults: 99999 },
      png_items =>
        chrome.history.search(
          { text: "gif", startTime: 0, maxResults: 99999 },
          gif_items =>
            chrome.history.search(
              { text: "gifv", startTime: 0, maxResults: 99999 },
              gifv_items =>
                chrome.history.search(
                  { text: "webm", startTime: 0, maxResults: 99999 },
                  webm_items => {
                    // merge all the item search results and clean up false positives
                    let items = jpg_items
                      .concat(png_items)
                      // gif_items covers both .gif and .gifv search results
                      .concat(gif_items)
                      .concat(webm_items)
                      .filter(i => {
                        let is_match =
                          /.*jpg$/.test(i.url) ||
                          /.*png$/.test(i.url) ||
                          /.*gif$/.test(i.url) ||
                          /.*gifv$/.test(i.url) ||
                          /.*webm$/.test(i.url);

                        return is_match;
                      })
                      .sort((a, b) => b.lastVisitTime - a.lastVisitTime);

                    // attach children img elements to #id using data from items
                    items.forEach(i => {
                      let ele = document.createElement("img");
                      // gifv -> gif extension hack to fix embedding
                      let re = /.*gifv$/;
                      if (i.url.match(re)) {
                        console.log(i.url);
                        i.url = i.url.substring(0, i.url.length - 1);
                      }
                      ele.setAttribute("src", i.url);
                      ele.setAttribute("width", "500px");
                      ele.setAttribute("height", "500px");
                      document.getElementById("container").appendChild(ele);
                    });
                  }
                )
            )
        )
    )
);
