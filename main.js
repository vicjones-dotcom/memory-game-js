const cards = document.querySelectorAll(".memory-card");
// Variables to ensure that when first card is clicked, it will wait until another one is flipped
let hasFlippedCard = false;

let firstCard, secondCard;
// Variable to avoid two sets of cards being turned at the same time
let lockMemoryGame = false;

function flipCard() {
  // If a second card is clicked, lockMemoryGame === false
  if (lockMemoryGame) return;
  this.classList.add("flip");
  // When no card is flipped -> hasFlippedCard = true & firstCard is set to clicked
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  hasFlippedCard = false;
}

function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
    return;
  }

  unflipCards();
}
//  When cards match event listeners are removed -> to prevent flipping
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
}
// To turn both cards back by removing "flip" class in 1500ms
function unflipCards() {
  // variable set to true->preventing any cards from flipping before the cards match or are hidden
  lockMemoryGame = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockMemoryGame = false;
  }, 1500);
}
function shuffle() {
  cards.forEach((card) => {
    //   Math.floor -> rounds a number downwards to the nearest integer
    // Looping through the cards -> generates a random number 0-12 -> assigns it to flex-item:order
    let ramdom = Math.floor(Math.random() * 12);
    card.style.order = ramdom;
  });
}
// Looping through the cards and attaching event listener
// when clicking on a card the flipCard function will be invoked
// this. -> used for the clicked card
cards.forEach((card) => card.addEventListener("click", flipCard));
