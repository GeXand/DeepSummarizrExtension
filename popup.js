'use strict';

const btn = document.querySelector('button');

var url;
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  url = tabs[0].url;
});

function sendData(data) {
  fetch('https://summarizr1.pythonanywhere.com/extensionResult/', {
    method: "POST",
    body: JSON.stringify(data)
  }).then(res => {
    console.log("Request complete! Response: ", res);
  });
}

btn.addEventListener('click', function() {
  sendData(url);
});