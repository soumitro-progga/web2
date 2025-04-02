// for dropdown menu
let noteDrop,
  typeDrop,
  noteButton,
  typeButton,
  noteIcon,
  typeIcon,
  closeButton,
  typeNote;
noteDrop = document.querySelector("#dropNotes");
typeDrop = document.querySelector("#dropTypes");
noteButton = document.querySelector(".iconNote");
typeButton = document.querySelector(".iconType");
closeButton = document.querySelector(".close-button");
noteIcon = document.querySelector(".noteIcon");
typeIcon = document.querySelector(".typeIcon");
typeNote = document.querySelectorAll("#dropTypes > div");

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
  //  closeButton.classList.remove("close-button-active");
  if (typeDrop.classList.contains("dropdown-open")) {
    closeButton.classList.add("close-button-active");
  } else {
    closeButton.classList.remove("close-button-active");
  }
});

// for chord functionality
let noteText, chordTypeText, noteByClick, typeByClick;
noteText = document.querySelector("#yourNoteIs");
chordTypeText = document.querySelector("#yourChordTypeIs");
noteByClick = document.querySelector(".noteByClick");
typeByClick = document.querySelector(".typeByClick");
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
  noteByClick.innerText = yourNote;
  scaleParent.replaceChildren();
  setTimeout(() => {
    noteText.innerHTML = yourNote;
  }, 300);
  setTimeout(() => {
    showNote.innerHTML = yourNote;
  }, 600);
  playScale();
}

typeNote.forEach((theType) => {
  theType.addEventListener("click", () => {
    typeByClick.innerText = theType.innerText;
    typeIcon.classList.remove("note-type-active-icons");
    typeDrop.classList.remove("dropdown-open");
    closeButton.classList.remove("close-button-active");
    setTimeout(() => {
      chordTypeText.innerHTML = theType.innerText;
    }, 300);
    setTimeout(() => {
      showChordType.innerHTML = theType.innerText;
    }, 600);
    playScale();
  });
});

let scaleParent = document.querySelector(".notes-by-frets");

let playButton = document.getElementById("play");
let pauseButton = document.getElementById("pause");
function hidePlayIconActive(){
  playButton.style.color = "rgb(80, 76, 76)";
};
function hidePlayIconActive(){
  playButton.style.color = "rgb(80, 76, 76)";
};
function hidePlayIcon() {
  playButton.style.display = "none";
  pauseButton.style.display = "inline-block";
}
function hidePauseIcon() {
  playButton.style.display = "inline-block";
  pauseButton.style.display = "none";
}
async function data() {
  playButton.style.color = "rgb(155, 152, 152)";
  let fetchData = await fetch("/assets/scales.json");
  let data = await fetchData.json();
  hidePlayIconActive();
  return data;
}
let scaleSound;
async function playScale() {
  let scaleData = await data();
  hidePauseIcon();
  scaleSound = new Audio(`/assets/notes/${scaleData[`${noteByClick.innerText} ${typeByClick.innerText}`][(scaleData[`${noteByClick.innerText} ${typeByClick.innerText}`].length - 1)]}`);
  playButton.addEventListener("click",()=>{
    scaleSound.currentTime = 0;
    scaleSound.pause();
    scaleSound.play();
      hidePlayIcon(); 
      scaleSound.onended = hidePauseIcon;
      pauseButton.addEventListener("click",()=>{
        scaleSound.pause();
        hidePauseIcon();
      })
  });

  for (let num = 0; num < scaleData[`${noteByClick.innerText} ${typeByClick.innerText}`].length - 1; num++) {
    let el = document.createElement("div");
    el.innerHTML = scaleData[`${noteByClick.innerText} ${typeByClick.innerText}`][num].slice(2, 5);
    el.className = scaleData[`${noteByClick.innerText} ${typeByClick.innerText}`][num].slice(5);
    el.classList.add(scaleData[`${noteByClick.innerText} ${typeByClick.innerText}`][num].slice(0, 2));
    scaleParent.appendChild(el);
  }
}
window.onload = playScale();