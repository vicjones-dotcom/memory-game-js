const cards = document.querySelectorAll(".memory-card");
// Variables to ensure that when first card is clicked, it will wait until another one is flipped
let hasFlippedCard = false;

let firstCard, secondCard;

function flipCard() {
  this.classList.add("flip");
  // When no card is flipped -> hasFlippedCard = true & firstCard is set to clicked
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  }
}
// Looping through the cards and attaching event listener
// when clicking on a card the flipCard function will be invoked
// this. -> used for the clicked card
cards.forEach((card) => card.addEventListener("click", flipCard));
