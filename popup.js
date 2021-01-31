'use strict';

const btn = document.querySelector('button');

var cur_url;
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  cur_url = tabs[0].url;
});

async function sendData(data) {
  await fetch('https://summarizr1.pythonanywhere.com/extensionResult/', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => {
    console.log("Request complete! Response: ", res);
  });

  await fetch('https://summarizr1.pythonanywhere.com/extensionResult/', {
    method: "GET",
    mode: 'cors',
  }).then(response => response.json())
  .then(data => {
    document.getElementById('summary-result').innerHTML = data['summary'];
  });
}

btn.addEventListener('click', function() {
  var json = {"url" : cur_url}
  sendData(json);
});