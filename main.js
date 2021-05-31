const button = document.querySelector("#start-game-btn");

const restartClick = document.querySelector("#winning-message");

const cards = document.querySelectorAll("#memory-card");
// Variables to ensure that when first card is clicked, it will wait until another one is flipped
let cardsArr = [cards];
console.log(cardsArr);
let hasFlippedCard = false;

let firstCard, secondCard;
// Variable to avoid two sets of cards being turned at the same time
let lockBoard = false;

let matchedCards = document.querySelectorAll(".matched");

function flipCard() {
  // If a second card is clicked, lockBoard is set to false
  if (lockBoard) return;
  this.classList.add("flip");
  // When no card is flipped hasFlippedCard is set to true & firstCard is set to clicked
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  //   hasFlippedCard = false;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();

    winner();
    return;
  }

  unflipCards();
}
// if all cards are flipped:
// reset cards
// randomise them again

//  When cards match event listeners are removed -> to prevent flipping
function disableCards() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}
// To turn both cards back by removing "flip" class in 1500ms
function unflipCards() {
  // variable set to true->preventing any cards from flipping before the cards match or are hidden
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
    resetBoard();
  }, 1500);
}
//  Resetting firstCard, secondCard variables after each round
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Immediately Invoked Function Expression (IIFE) -> function will execute itself right after its declaration
(function shuffle() {
  cards.forEach((card) => {
    //   Math.floor -> rounds a number downwards to the nearest integer
    // Looping through the cards -> generates a random number 0-12 -> assigns it to flex-item:order
    // flex-items have their order property set to 0 by default
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})();

function winner() {
  if (document.querySelectorAll(".matched").length === 12) {
    document.querySelector("#win-message").style.visibility = "visible";
    document.querySelector("#winning-message").style.visibility = "visible";
  }
}

// Looping through the cards and attaching event listener
// when clicking on a card the flipCard function will be invoked
// this. -> used for the clicked card
cards.forEach((card) => card.addEventListener("click", flipCard));
restartClick.addEventListener("click", () => {
  flipCard();
});
