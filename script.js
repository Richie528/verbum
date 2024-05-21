/* WORD LIST */
let wordlists = [["porto", "porto", "porto"], ["canis", "canis", "canis"], ["laborat", "laborat", "laborat"]];

/* VARIABLES */
let cycles = 0;
let cyclePercentage = 50;
let wordsTested = 10;
let wordsCorrect = 9;
let wordlist = [];
let stagesSelected = []; for (let i = 0; i < 40; i++) {stagesSelected.push(false);}
let currentWordlist = [];
let currentWords = [];
let previousInput = "";
let normalWordState = ["word-small", "word-big", "word-small", "word-gone"];
let animatedWordState = ["word-gone", "word-small", "word-big", "word-small"];

/* ELEMENTS */
let root = document.querySelector(":root");
let stageButtons = document.querySelectorAll(".stage-button");
let testProgressText = document.querySelector(".test-progress-text");
let cycleProgressText = document.querySelector(".cycle-progress-text");
let scoreCount = document.querySelector(".score-count");
let words = [];
words.push(document.getElementById("p"));
words.push(document.getElementById("c"));
words.push(document.getElementById("n"));
words.push(document.getElementById("m"));
previousInputElement = document.getElementById("p-input");
currentInputElement = document.getElementById("c-input");

/* DISPLAY WORDS */
function displayWords() {
  for (let i = 0; i < 4; i++) {
    words[i].querySelector(".prompt").textContent = currentWords[i];
  }
  previousInputElement.value = previousInput;
  testProgressText.textContent = Math.floor((wordsCorrect / wordsTested) * 100).toString() + "%";
  root.style.setProperty("--test-progress-percentage", Math.floor((wordsCorrect / wordsTested) * 100));
  cycleProgressText.textContent = cycles;
  root.style.setProperty("--cycle-progress-percentage", cyclePercentage);
  scoreCount.textContent = wordsCorrect.toString() + "/" + wordsTested.toString();
}

/* INITIALISE CURRENT WORDLIST AND WORLISTS */
function initialise() {
  cycles = 0;
  wordlist = [];
  for (let i = 0; i < 40; i++) {
    if (stagesSelected[i]) {
      for (let j = 0; j < wordlists[i].length; j++) {
        wordlist.push(wordlists[i][j]);
      }
    }
  }
  currentWords = [];
  currentWordlist = [...wordlist];
  for (let i = 0; i < 4; i++) {
    let random = Math.floor(Math.random() * currentWordlist.length);
    currentWords.push(currentWordlist[random]);
    currentWordlist.splice(random, 1);

    if (currentWordlist.length === 0) {
      currentWordlist = [...wordlist];
      cycles += 1;
    }
  }
  displayWords();
}

/* GET NEW WORD */
function getNewWord() {
  previousInput = currentInputElement.value;
  currentInputElement.value = "";
  currentWords.splice(0, 1);
  let random = Math.floor(Math.random() * currentWordlist.length);
  currentWords.push(currentWordlist[random]);
  currentWordlist.splice(random, 1);

  if (currentWordlist.length === 0) {
    currentWordlist = [...wordlist];
    cycles += 1;
  }
}

/* SHUFFLE WORDS */
function shuffleWords() {
  for (let i = 0; i < 4; i++) {words[i].classList.remove(normalWordState[i]);}
  for (let i = 0; i < 4; i++) {words[i].classList.add(animatedWordState[i]);}
  setTimeout(function() {
    for (let i = 0; i < 4; i++) {words[i].classList.add("dont-animate");}
    getNewWord();
    displayWords();
    for (let i = 0; i < 4; i++) {words[i].classList.add(normalWordState[i]);}
    for (let i = 0; i < 4; i++) {words[i].classList.remove(animatedWordState[i]);}
    for (let i = 0; i < 4; i++) {words[i].offsetHeight}
    for (let i = 0; i < 4; i++) {words[i].classList.remove("dont-animate");}
  }, 750);
}

/* STAGE SELECTION */
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
    initialise();
  }
}

document.body.addEventListener('keydown', function (event) {
  const key = event.key;
  switch (key) {
    case "Enter":
      shuffleWords();
  }
});