import { fromEvent, Observable } from "rxjs";
import { map, filter, bufferWhen, delay, debounceTime } from "rxjs/operators";

var refreshButton = document.querySelector(".refresh");

var refreshClickStream = fromEvent(refreshButton, "click");

var startupRequestStream = Observable.of("https://api.github.com/users");

var requestOnRefreshStream = refreshClickStream.map((ev) => {
  var randomOffset = Math.floor(Math.random() * 500);
  return "https://api.github.com/users?since=" + randomOffset;
});

// flatMap is now an alias for mergeMap
// but will work just the same.
var responseStream = startupRequestStream
  .merge(requestOnRefreshStream)
  .flatMap((requestUrl) =>
    Rx.Observable.fromPromise(jQuery.getJSON(requestUrl))
  );

function createSuggestionStream(responseStream) {
  return responseStream
    .map((listUser) => listUser[Math.floor(Math.random() * listUser.length)])
    .startWith(null)
    .merge(refreshClickStream.map((ev) => null));
}

var suggestion1Stream = createSuggestionStream(responseStream);
var suggestion2Stream = createSuggestionStream(responseStream);
var suggestion3Stream = createSuggestionStream(responseStream);

// Rendering ---------------------------------------------------
function renderSuggestion(suggestedUser, selector) {
  var suggestionEl = document.querySelector(selector);
  if (suggestedUser === null) {
    suggestionEl.style.visibility = "hidden";
  } else {
    suggestionEl.style.visibility = "visible";
    var usernameEl = suggestionEl.querySelector(".username");
    usernameEl.href = suggestedUser.html_url;
    usernameEl.textContent = suggestedUser.login;
    var imgEl = suggestionEl.querySelector("img");
    imgEl.src = "";
    imgEl.src = suggestedUser.avatar_url;
  }
}

suggestion1Stream.subscribe((user) => {
  renderSuggestion(user, ".suggestion1");
});

suggestion2Stream.subscribe((user) => {
  renderSuggestion(user, ".suggestion2");
});

suggestion3Stream.subscribe((user) => {
  renderSuggestion(user, ".suggestion3");
});
