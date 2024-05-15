/* WORD LIST */
let wordlists = [["porto", "habet"], ["canis", "cibus"], ["laborat", "caudex"]];

/* VARIABLES */
let wordlist = [];
let stagesSelected = [];
let currentWordlist = [];
let currentWords = [];

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