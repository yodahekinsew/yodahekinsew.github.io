let typewriterLines = document.getElementsByClassName("typewriter");
let lines = [];
for (let i = 0; i < typewriterLines.length; i++) {
  lines.push(typewriterLines[i].firstElementChild.innerText);
  typewriterLines[i].firstElementChild.innerText = "";
}
let currentLineIndex = 0;
let currentCharIndex = 0;
let typing = false;

const finishTypingEvent = new Event("finishTyping");

window.addEventListener("DOMContentLoaded", () =>
  setTimeout(startTyping, 1000)
);

function startTyping() {
  typing = true;
  currentLineIndex = 0;
  currentCharIndex = 0;
  typewriterLines[0].classList.add("typing");
  typeOutNextCharacter();
}

function typeOutNextCharacter() {
  // Add character to current line
  typewriterLines[currentLineIndex].firstElementChild.innerHTML +=
    lines[currentLineIndex][currentCharIndex];
  currentCharIndex++;

  // If we reach the end of the current line, move on to the next one
  if (currentCharIndex >= lines[currentLineIndex].length) {
    currentCharIndex = 0;
    currentLineIndex++;

    // If we finished typing all the texts, break the loop
    if (currentLineIndex >= lines.length) {
      typing = false;
      currentLineIndex = 0;
      document.dispatchEvent(finishTypingEvent);
      return;
    }

    setTimeout(() => {
      // Move the caret to the next line
      typewriterLines[currentLineIndex - 1].classList.remove("typing");
      typewriterLines[currentLineIndex].classList.add("typing");

      // Display the return symbol
      typewriterLines[currentLineIndex].children[1].style.display = "block";

      setTimeout(typeOutNextCharacter, 500 + Math.random() * 250);
    }, 100 + Math.random() * 50);
    return;
  }

  // Make another call to typeOutNextCharacter to create a loop
  setTimeout(typeOutNextCharacter, 15 + Math.random() * 85);
}
