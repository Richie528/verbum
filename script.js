/* WORD LIST */
let wordlists = [["porto", "habet"], ["canis", "cibus"], ["laborat", "caudex"]];

/* VARIABLES */
let wordlist = [];
let stagesSelected = [];
let currentWordlist = [];
let currentWords = [];
let words = [];

/* UPDATING WORD LIST */
function updateWordList() {
  wordlist = [];
  for (let i = 0; i < 40; i++) {
    if (stagesSelected[i]) {
      for (let j = 0; j < wordlists[i].length; j++) {
        wordlist.push(wordlists[i][j]);
      }
    }
  }
}

/* STAGE SELECTION */
for (let i = 0; i < 40; i++) {stagesSelected.push(false);}
let stageButtons = document.querySelectorAll(".stage-button");
for (let i = 0; i < 40; i++) {
  stageButtons[i].onclick = function(event) {
    if (event.shiftKey) {
      for (let j = 0; j <= i; j++) {
        if (stagesSelected[i]) {stageButtons[j].style.backgroundColor = "#313244";}
        else {stageButtons[j].style.backgroundColor = "#11111b";}
        stagesSelected[j] = !stagesSelected[i];
      }
    }
    else {
      if (stagesSelected[i]) {stageButtons[i].style.backgroundColor = "#313244";}
      else {stageButtons[i].style.backgroundColor = "#11111b";}
      stagesSelected[i] = !stagesSelected[i];
    }
    updateWordList();
  }
}

/* SHUFFLE WORDS */
let normalWordState = ["word-small", "word-big", "word-small", "word-gone"];
let animatedWordState = ["word-gone", "word-small", "word-big", "word-small"];
words.push(document.getElementById("p"));
words.push(document.getElementById("c"));
words.push(document.getElementById("n"));
words.push(document.getElementById("m"));
function shuffleWords() {
  for (let i = 0; i < 4; i++) {words[i].classList.remove(normalWordState[i]);}
  for (let i = 0; i < 4; i++) {words[i].classList.add(animatedWordState[i]);}
  setTimeout(function() {
    for (let i = 0; i < 4; i++) {words[i].classList.add("dont-animate");}
    for (let i = 0; i < 4; i++) {words[i].classList.add(normalWordState[i]);}
    for (let i = 0; i < 4; i++) {words[i].classList.remove(animatedWordState[i]);}
    for (let i = 0; i < 4; i++) {words[i].offsetHeight}
    for (let i = 0; i < 4; i++) {words[i].classList.remove("dont-animate");}
  }, 750);
}

/* FETCH WORD INFORMATION */
function wordInformation(word) {
  let Httpreq = new XMLHttpRequest();
  Httpreq.open("GET", "https://www.latin-is-simple.com/api/vocabulary/search/?query=" + word + "&forms_only=false", false);
  Httpreq.send(null);
  let json = JSON.parse(Httpreq.responseText);
  console.log(json);
}
wordInformation("porto");




document.body.addEventListener('keydown', function (event) {
  const key = event.key;
  switch (key) {
    case "Enter":
      shuffleWords();
      console.log("ANIMATE!!");
  }
});