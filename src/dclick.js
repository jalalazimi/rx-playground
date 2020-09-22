import { fromEvent } from "rxjs";
import { map, filter, bufferWhen, delay, debounceTime } from "rxjs/operators";

var button = document.querySelector(".button");
var label = document.querySelector("h4");

var clickStream = fromEvent(button, "click");

var doubleClickStream = clickStream.pipe(
  bufferWhen(() => clickStream.pipe(debounceTime(250))),
  map((arr) => arr.length),
  filter((len) => len === 2)
);

doubleClickStream.subscribe((event) => {
  label.textContent = "double click";
});

doubleClickStream.pipe(delay(1000)).subscribe((suggestion) => {
  label.textContent = "-";
});
