// for dropdown menu

let noteDrop,
  typeDrop,
  noteButton,
  typeButton,
  noteIcon,
  typeIcon,
  closeButton,
  typeNote,
  notes;
noteDrop = document.querySelector("#dropNotes");
typeDrop = document.querySelector("#dropTypes");
noteButton = document.querySelector(".iconNote");
typeButton = document.querySelector(".iconType");
closeButton = document.querySelector(".close-button");
noteIcon = document.querySelector(".noteIcon");
typeIcon = document.querySelector(".typeIcon");
typeNote = document.querySelectorAll("#dropTypes > div");
noteType = document.querySelectorAll("#dropNotes > div");
notes = document.querySelector("#notes");
fingers = document.querySelector("#fingers");

closeButton.addEventListener("click", () => {
  typeDrop.classList.remove("dropdown-open");
  noteDrop.classList.remove("dropdown-open");
  closeButton.classList.toggle("close-button-active");
  noteIcon.classList.remove("note-type-active-icons");
  typeIcon.classList.remove("note-type-active-icons");
});

noteButton.addEventListener("click", () => {
  typeDrop.classList.remove("dropdown-open");
  noteDrop.classList.toggle("dropdown-open");

  noteIcon.classList.toggle("note-type-active-icons");
  typeIcon.classList.remove("note-type-active-icons");

  if (noteDrop.classList.contains("dropdown-open")) {
    closeButton.classList.add("close-button-active");
  } else {
    closeButton.classList.remove("close-button-active");
  }
});

typeButton.addEventListener("click", () => {
  noteDrop.classList.remove("dropdown-open");
  typeDrop.classList.toggle("dropdown-open");
  noteIcon.classList.remove("note-type-active-icons");
  typeIcon.classList.toggle("note-type-active-icons");
  if (typeDrop.classList.contains("dropdown-open")) {
    closeButton.classList.add("close-button-active");
  } else {
    closeButton.classList.remove("close-button-active");
  }
});

// for chord functionality
let noteText, chordTypeText;
noteText = document.querySelector("#yourNoteIs");
chordTypeText = document.querySelector("#yourChordTypeIs");
let showNote, showChordType;
showNote = document.querySelector("#showNote");
showChordType = document.querySelector("#showChordType");

let notesItem = document.querySelectorAll("#dropNotes > div");
notesItem.forEach((theNote) => {
  theNote.addEventListener("click", () => {
    noteIcon.classList.remove("note-type-active-icons");
    noteDrop.classList.remove("dropdown-open");
    closeButton.classList.remove("close-button-active");
  });
});
function selectedNote(yourNote) {
  noteForGenerateChordByJson.innerHTML = yourNote;
  setTimeout(() => {
    noteText.innerHTML = yourNote;
  }, 300);
  setTimeout(() => {
    showNote.innerHTML = yourNote;
  }, 600);
  chordIndex = 0;
  previousButton.classList.add("buttonsDeactive");
  nextButton.classList.remove("buttonsDeactive");
  generateChordByJson();
}

typeNote.forEach((theType) => {
  theType.addEventListener("click", () => {
    typeNote.forEach(child => child.className = "color-of-type")
    theType.className = "clicked-type-note";
    typeIcon.classList.remove("note-type-active-icons");
    typeDrop.classList.remove("dropdown-open");
    closeButton.classList.remove("close-button-active");
    setTimeout(() => {
      chordTypeText.innerHTML = theType.innerText;
    }, 300);
    setTimeout(() => {
      showChordType.innerHTML = theType.innerText;
    }, 600);
    typeForGenerateChordByJson.innerHTML = theType.innerText;
    chordIndex = 0;
    previousButton.classList.add("buttonsDeactive");
    nextButton.classList.remove("buttonsDeactive");
    generateChordByJson();
  });
});
noteType.forEach((theNote)=>{
  theNote.addEventListener("click",()=>{
    noteType.forEach(child => child.className = "color-of-note")
    theNote.className = "clicked-type-note";
  })
})
//notes and fingers buttons
notes.addEventListener("click", chordNotes);
async function chordNotes() {
  notes.className = "note-finger-buttons-active";
  fingers.classList.remove("note-finger-buttons-active");
  let chordData = await chordsData();
  let userNote = noteForGenerateChordByJson.innerText;
  let userType = typeForGenerateChordByJson.innerText;
  // fingers
  E2.innerHTML = chordData[`${userNote} ${userType}`][chordIndex]["notes"][0];
  A2.innerHTML = chordData[`${userNote} ${userType}`][chordIndex]["notes"][1];
  D3.innerHTML = chordData[`${userNote} ${userType}`][chordIndex]["notes"][2];
  G3.innerHTML = chordData[`${userNote} ${userType}`][chordIndex]["notes"][3];
  B3.innerHTML = chordData[`${userNote} ${userType}`][chordIndex]["notes"][4];
  E4.innerHTML = chordData[`${userNote} ${userType}`][chordIndex]["notes"][5];
}
fingers.addEventListener("click", async () => {
  fingers.className = "note-finger-buttons-active";
  notes.classList.remove("note-finger-buttons-active");
  let chordData = await chordsData();
  let userNote = noteForGenerateChordByJson.innerText;
  let userType = typeForGenerateChordByJson.innerText;
  // fingers
  E2.innerHTML = chordData[`${userNote} ${userType}`][chordIndex]["fingers"][0];
  A2.innerHTML = chordData[`${userNote} ${userType}`][chordIndex]["fingers"][1];
  D3.innerHTML = chordData[`${userNote} ${userType}`][chordIndex]["fingers"][2];
  G3.innerHTML = chordData[`${userNote} ${userType}`][chordIndex]["fingers"][3];
  B3.innerHTML = chordData[`${userNote} ${userType}`][chordIndex]["fingers"][4];
  E4.innerHTML = chordData[`${userNote} ${userType}`][chordIndex]["fingers"][5];
});
// import frets for the numbers of the fretBoard
let firstFret, secondFret, thirdFret, fourthFret;
firstFret = document.querySelector("#firstF");
secondFret = document.querySelector("#secondF");
thirdFret = document.querySelector("#thirdF");
fourthFret = document.querySelector("#fourthF");
// import guitar strings to show on a custom fret and to change note of the string
let E2, A2, D3, G3, B3, E4;
E2 = document.querySelector("#E2");
A2 = document.querySelector("#A2");
D3 = document.querySelector("#D3");
G3 = document.querySelector("#G3");
B3 = document.querySelector("#B3");
E4 = document.querySelector("#E4");

//the default chord setting
// notes
E2.innerHTML = "&times;";
A2.innerHTML = "C";
D3.innerHTML = "E";
G3.innerHTML = "";
B3.innerHTML = "C";
E4.innerHTML = "";

// frets number
firstFret.innerText = "1";
secondFret.innerText = "2";
thirdFret.innerText = "3";
fourthFret.innerText = "4";
// place on a specific fret
E2.classList.toggle("muted");
A2.classList.toggle("third-fret-NOTE");
D3.classList.toggle("second-fret");
G3.classList.toggle("play-open");
B3.classList.toggle("first-fret-NOTE");
E4.classList.toggle("play-open");

let chordIndex = 0;
let noteForGenerateChordByJson = document.querySelector(
  ".noteForGenerateChordByJson"
);
let typeForGenerateChordByJson = document.querySelector(
  ".typeForGenerateChordByJson"
);
let previousButton = document.querySelector("#previousButton");
// previousButton desabled
previousButton.classList.add("buttonsDeactive");
let play = document.querySelector("#play");
let pause = document.querySelector("#pause");
let nextButton = document.querySelector("#nextButton");

nextButton.addEventListener("click", async () => {
  chordNotes();
  hidePauseIcon();
  let chordDataForLrngthOfChords = await chordsData();
  let chordsLength =
    chordDataForLrngthOfChords[
      `${noteForGenerateChordByJson.innerText} ${typeForGenerateChordByJson.innerText}`
    ].length;

  if (chordIndex == chordsLength - 2) {
    nextButton.classList.add("buttonsDeactive");
  }
  if (chordIndex == chordsLength - 1) {
    return true;
  } else if (chordIndex >= chordsLength - 1) {
    chordIndex = 0;
  } else {
    chordIndex++;
    // previousButton desabled
    previousButton.className = "buttonsActive";
  }
  generateChordByJson();
});

previousButton.addEventListener("click", () => {
  chordNotes();
  hidePauseIcon();
  if (chordIndex > 0) {
    nextButton.classList.remove("buttonsDeactive");
    chordIndex--;
  }
  if (chordIndex == 0) {
    previousButton.classList.add("buttonsDeactive");
  }
  generateChordByJson();
});

let soundE2, soundA2, soundD3, soundG3, soundB3, soundE4;
function hidePlayIconActive() {
  play.style.color = "rgb(80, 76, 76)";
}
function hidePlayIcon() {
  play.style.display = "none";
  pause.style.display = "inline-block";
}
function hidePauseIcon() {
  play.style.display = "inline-block";
  pause.style.display = "none";
}
async function playChord() {
  play.style.color = "rgb(155, 152, 152)";
  let userNote = noteForGenerateChordByJson.innerHTML;
  let userType = typeForGenerateChordByJson.innerHTML;
  notes.classList.add("note-finger-buttons-active");
  chordNotes();
  chordData = await chordsData();
  soundE2 = new Audio(
    chordData[`${userNote} ${userType}`][chordIndex]["sounds"][0]
  );
  soundA2 = new Audio(
    chordData[`${userNote} ${userType}`][chordIndex]["sounds"][1]
  );
  soundD3 = new Audio(
    chordData[`${userNote} ${userType}`][chordIndex]["sounds"][2]
  );
  soundG3 = new Audio(
    chordData[`${userNote} ${userType}`][chordIndex]["sounds"][3]
  );
  soundB3 = new Audio(
    chordData[`${userNote} ${userType}`][chordIndex]["sounds"][4]
  );
  soundE4 = new Audio(
    chordData[`${userNote} ${userType}`][chordIndex]["sounds"][5]
  );

  // play button settings
  play.addEventListener("click", () => {
    soundE2.currentTime = "0";
    soundA2.currentTime = "0";
    soundD3.currentTime = "0";
    soundG3.currentTime = "0";
    soundB3.currentTime = "0";
    soundE4.currentTime = "0";
    soundE2.play();
    soundA2.play();
    soundD3.play();
    soundG3.play();
    soundB3.play();
    soundE4.play();

    soundE2.onplay = () => {
      hidePlayIcon();
      playChord();
      setTimeout(() => {
        hidePauseIcon();
      }, 1000);
    };
  });
}
window.onload = async () => {
  playChord();
  // Register the Service Worker
  let deferredPrompt;

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/serviceworker.js")
        .then((reg) => console.log("Service Worker Registered", reg))
        .catch((err) => console.log("Service Worker Registration Failed", err));
    });
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    document.getElementById("install-popup").style.display = "block";
    document
      .getElementById("notNow-button")
      .addEventListener("click", () => {
        document.getElementById("install-popup").style.display = "none";
      });
  });

  //install app by clicking on install button
  document.getElementById("install-button").addEventListener("click", () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted install");
        } else {
          console.log("User canceled install");
        }
        deferredPrompt = null;
        document.getElementById("install-popup").style.display = "none";
      });
    }
  });
};
// fetch json data for specific chord
async function chordsData() {
  let loadData = await fetch("/assets/chords.json");
  let loadedData = await loadData.json();
  hidePlayIconActive();
  return loadedData;
}

async function generateChordByJson() {
  playChord();
  let userNote = noteForGenerateChordByJson.innerHTML;
  let userType = typeForGenerateChordByJson.innerHTML;
  let chordData = await chordsData();

  // notes is called in another function

  //frets number
  firstFret.innerText =
    chordData[`${userNote} ${userType}`][chordIndex]["frets"][0];
  secondFret.innerText =
    chordData[`${userNote} ${userType}`][chordIndex]["frets"][1];
  thirdFret.innerText =
    chordData[`${userNote} ${userType}`][chordIndex]["frets"][2];
  fourthFret.innerText =
    chordData[`${userNote} ${userType}`][chordIndex]["frets"][3];

  // place on a specific fret
  E2.className =
    chordData[`${userNote} ${userType}`][chordIndex]["open mute"][0];
  A2.className =
    chordData[`${userNote} ${userType}`][chordIndex]["open mute"][1];
  D3.className =
    chordData[`${userNote} ${userType}`][chordIndex]["open mute"][2];
  G3.className =
    chordData[`${userNote} ${userType}`][chordIndex]["open mute"][3];
  B3.className =
    chordData[`${userNote} ${userType}`][chordIndex]["open mute"][4];
  E4.className =
    chordData[`${userNote} ${userType}`][chordIndex]["open mute"][5];
}
