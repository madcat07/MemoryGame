/*
 * Create a list that holds all of your cards
 */

const iconsList = ["fa fa-diamond","fa fa-diamond",
               "fa fa-paper-plane-o","fa fa-paper-plane-o",
               "fa fa-bomb","fa fa-bomb",
               "fa fa-leaf","fa fa-leaf",
               "fa fa-bicycle","fa fa-bicycle",
               "fa fa-cube","fa fa-cube",
               "fa fa-anchor","fa fa-anchor",
               "fa fa-bolt","fa fa-bolt"];

               
const cardsContainer = document.querySelector(".deck");

/*
 * Set Defaults for openCards & matchedCards
 */

let openedCards = [];
let matchedCards = [];

/*
 * Initialize Game
 */

function init() {

    const icons = shuffle(iconsList)
    
    for(let i = 0; i < iconsList.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${iconsList[i]}"></i>`;
        cardsContainer.appendChild(card);

        //Add Click Event to each card
        click(card);
    }
}

/*
 *Click Event Monitor
 */

let isFirstClick = true;

function click(card) {
        //Card Click
        card.addEventListener("click", function() {
            
            //Checks if is first click
            if(isFirstClick) {
                //If is first then starts timer
                startTimer();

                isFirstClick = false;
                //If it's not the first the does nothing
            }
            
            //Creates currentCard and previousCard to disquish from rest of the deck
            const currentCard = this;
            const previousCard = openedCards[0];
    
            //If cards are already open will compare cards
            if(openedCards.length === 1)  {
    
                card.classList.add("open", "show", "disabled");
                openedCards.push(this);
    
                //Compare Cards
                compare(currentCard, previousCard);
            
            //If no cards are open will wait for next card
            } else {
            
                //No open cards
                card.classList.add("open", "show", "disabled");
                openedCards.push(this);
    
            }
    
        });
}

/*
 * Compare Cards
 */

//Function compares the two open cards
function compare(currentCard, previousCard) {
    //Determines if the cards are a match or not
    if(currentCard.innerHTML === previousCard.innerHTML) {
            
        //If the cards match then attributes change
        currentCard.classList.add("match");
        previousCard.classList.add("match");
            
        matchedCards.push(currentCard,previousCard);
            
        openedCards = [];

        //Checks to see if all cards have been flipped and if the game is over - added delay so all cards would show on screen as flipped and matched
        setTimeout(function() {
            isOver();
        }, 100);
    //If the cards are not a match
    } else {
    
        //Delay to wait half a second before resetting so have a moment to see cards displayed
        setTimeout(function() {
            currentCard.classList.remove("open", "show", "disabled");
            previousCard.classList.remove("open", "show", "disabled");
            
        }, 500);
        //Resets opened card count
        openedCards = [];
    }
    //Adds move after compares cards
    addMove();
    //Updates Rating
    rating();
}

/*
 * Add moves
 */
//Creates the ability to count moves within the container
const movesContainer = document.querySelector(".moves");
//Sets the counter to 0
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
    //Increases the move count by 1
     moves++;
     movesContainer.innerHTML = moves;
}

/*
 * Rating System
 */
//Creates ability to track stars for rating system starting with 3 stars
const starsContainer = document.querySelector(".stars");
starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>`;
function rating() {
    //Monitors the move count to decrease at certain points
    switch(moves) {
        //Sets stars to 2 stars when reach 18 moves
        case 18:
            starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>`;
        break;
        //Sets stars to 1 star when reach 26 moves
        case 26:
            starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
        break;
    }
}
/*
 * Timer
 */
//Creates timer to track the number of seconds playing the game
const timerContainer = document.querySelector(".timer");
//Sets timer to 0 at start
let liveTimer,
    totalSeconds = 0;
timerContainer.innerHTML = totalSeconds + "s";
//Instructs how timer will function by icreasing the value by 1 every 1 second
function startTimer() {
    liveTimer = setInterval(function() {
        totalSeconds++;
        timerContainer.innerHTML = totalSeconds + "s";
    }, 1000);
}
//Instructs to stop timer increase
function stopTimer() {
    clearInterval(liveTimer);
}

/*
 * Restart Game
 */
//Creates a functio with the reset icon is clicked
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
    //Clears the card container 
    cardsContainer.innerHTML = "";

    //Call `init` to create game and shuffle cards
    init();
    
    //Resets all game variables
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;

    stopTimer();
    isFirstClick = true;
    totalSeconds = 0;
    timerContainer.innerHTML = totalSeconds + "s";
});

/*
 * Game Over
 */
//Sets the action to take of the game is over by comparing how many cards are matched with how many were created at the start of the game
function isOver() {
    if(matchedCards.length === iconsList.length) {
        //Displays popup that shows game is over with moves and time
        alert("Game Over! " + moves + " Moves - Finished in " + totalSeconds + " Seconds");     
        //Stops the timer when the game ends
        stopTimer();
    }
}

//////Start Game for first time
init();


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

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