function shortenURL() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tab = tabs[0];
      var url = tab.url;
      var apiUrl = "https://tinyurl.com/api-create.php?url=" + encodeURIComponent(url);
      fetch(apiUrl)
        .then(response => response.text())
        .then(shortUrl => {
          var resultDiv = document.getElementById("result");
          resultDiv.innerHTML = "<p>Short URL:</p><a href='" + shortUrl + "' target='_blank'>" + shortUrl + "</a>";
          resultDiv.style.display = "block";
          var notificationOptions = {
            type: "basic",
            iconUrl: "icon-48.png",
            title: "Shorten Link One",
            message: "URL has been shortened!"
          };
          chrome.notifications.create(notificationOptions);
        })
        .catch(error => {
          var resultDiv = document.getElementById("result");
          resultDiv.innerHTML = "<p>Error:</p><p>" + error.message + "</p>";
          resultDiv.style.display = "block";
        });
    });
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("shortenButton").addEventListener("click", shortenURL);
  });
  