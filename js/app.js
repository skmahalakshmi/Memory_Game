// strict is used for detecting undeclared variables and code should be run in strict mode.
'use strict';
// creating the variables which helps us to do project
var elem = document.querySelectorAll('li');
const timerContainer = document.querySelector('.timer');
var clickedElem = [];
var allClassnames = [];
var movesCount = 0;
var matchCount = 0;
let initialClick = false;
/*
 * Create a list that holds all of your cards
 */
elem.forEach(item => {
  allClassnames.push(item.children[0].className);
})
var movesElem = document.getElementsByClassName('moves');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  //after shuffing getting all cards into an array
  for (var i in array) {
    elem[i].children[0].className = array[i]
  }
  return array;
}

//adding event listener

elem.forEach(item => {

  item.addEventListener('click', () => {
    // startTimer();
    if (initialClick === false) {
      initialClick = true;
      startTimer();
    }

    item.classList.add('open', 'show', 'disable');
    verify(item);
  })

})

// function which is used to perform whether the current card and previous card  match or not

function verify(e) {
  setTimeout(() => {
    clickedElem.push(e);

    if (clickedElem.length == 2) {

      if (clickedElem[0].children[0].className === clickedElem[1].children[0].className) {
        clickedElem.map(i => {
          i.classList.add('match');
          i.classList.remove('open', 'show')
        })
        gameCompletion();

      } else {
        clickedElem.map(i => {
          i.classList.remove('open', 'show', 'match', 'disable')
        })
      }
      movesInc();

      clickedElem = [];
    }
  }, 500)

}

//logic to get the moves count and rating for the game game Completion
function movesInc() {
  var starElem = []
  starElem = document.getElementsByClassName('fa-star');
  let i = starElem.length;

  movesCount += 1;
  movesElem[0].textContent = movesCount;
  if (movesCount == 16) {
    starElem[i - 1].className = 'fa fa-star-o'

  } else if (movesCount == 20) {
    starElem[i - 1].className = 'fa fa-star-o'
  }

}


//all cards are matched we will end the game with sweat alert
var stars = document.getElementsByClassName('stars')

function gameCompletion() {
  matchCount += 1;
  if (matchCount == 8) {
    console.log(movesCount);
    clearInterval(timer);
    // sweat alert for displaying moves,time,rating of the game
    swal({
      allowEscapeKey: false,
      allowOutsideClick: false,
      html: true,
      title: 'superb You have won the game!',
      text: 'With ' + movesCount + ' Moves ' + minutes + ":" + seconds + " secs " + stars[0].innerHTML + '\n Woooooo!',
      type: 'success',
      confirmButtonColor: '#02ccba',
      confirmButtonText: 'are you want to play again!'
    }, function() {
      location.reload();

    })




  }
}


function restart() {
  location.reload();
}
// timer code........ starts
let hour = 0;
let minutes = 0;
let seconds = 0;

let timer;

function startTimer() {
  timer = setInterval(function() {
    seconds++;
    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }

    timerContainer.innerHTML = minutes + ":" + seconds;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}


function resetTimer() {
  location.reload();

}
//timer code ends

function startGame() {

  shuffle(allClassnames);

}
window.onload = startGame();


// card
// open
// show
// disable
// match
// fa-star
// fa-star-o
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
