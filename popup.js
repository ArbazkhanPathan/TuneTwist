document.addEventListener('DOMContentLoaded', function() {
  var predicttitle = document.getElementById('predicttitle');
  predicttitle.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(tabs[0].id, {code: 'var inputText = document.querySelector("h1").innerText; inputText;'}, function(results) {
        var inputText = results[0];
        console.log(inputText);
        predictTitle(inputText);
      });
    });
  });
  var predictButton = document.getElementById('predictButton');
  predictButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(tabs[0].id, {code: 'var inputText = document.querySelector("p").innerText; inputText;'}, function(results) {
        var inputText = results[0];
        console.log(inputText);
        predictNextWord(inputText);
      });
    });
  });
});


// loading the model with Flask
function predictTitle(seedText) {
  var xhr = new XMLHttpRequest();
  // xhr.open('POST', 'http://127.0.0.1:90//predictname', true);
  xhr.open('POST', 'http://107.21.81.53:80//predictname', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      displayPredictionTitle(response.predicted_word);
    }
  };
  var data = JSON.stringify({ seed_text: seedText, next_words: 1 });
  xhr.send(data);
}

function predictNextWord(seedText) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://107.21.81.53:80//predict', true);
  // xhr.open('POST', 'http://127.0.0.1:90//predict', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      displayPrediction(response.predicted_word);
    }
  };
  var data = JSON.stringify({ seed_text: seedText, next_words: 1 });
  xhr.send(data);
}

// Displaying the model response 

function displayPredictionTitle(prediction) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: 'var inputText = document.querySelector("h1"); inputText.textContent = "' + prediction + '"; console.log("' + prediction + '"); inputText.style.backgroundColor = "red";'
    });
  });
}


function displayPrediction(prediction) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: 'var inputText = document.querySelector("p"); inputText.textContent = "' + prediction + '"; console.log("' + prediction + '"); inputText.style.backgroundColor = "red";'
    });
  });
}

