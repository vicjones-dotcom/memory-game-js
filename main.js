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
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
  }, 1500);
}
// Looping through the cards and attaching event listener
// when clicking on a card the flipCard function will be invoked
// this. -> used for the clicked card
cards.forEach((card) => card.addEventListener("click", flipCard));
