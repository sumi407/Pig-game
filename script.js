const score0 = document.getElementById('score-0');
const score1 = document.getElementById('score-1');
const current0El = document.getElementById('score--0');
const current1El = document.getElementById('score--1');
const player0El = document.querySelector('.player-0');
const player1El = document.querySelector('.player-1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn-new');
const btnroll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');


let scores, currentScore, active, playing;

const init = function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;


    score0.textContent = 0;
    score1.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;


    diceEl.classList.add('hidden');
    player0El.classList.remove('player-winner');
    player1El.classList.remove('player-winner');
    player0El.classList.add('player-active');
    player1El.classList.remove('player-active');


};

init();

const switchPlayer = function() {

    document.getElementById(`score--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player-active');
    player1El.classList.toggle('player-active');
};

//rolling dice functionality
btnroll.addEventListener('click', function() {
    if (playing) {
        //1.generating random number
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2.display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        //3.if dice 1 switch player
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`score--${activePlayer}`).textContent = currentScore;
            //current0El.textContent = currentScore;


        } else {
            switchPlayer();

        }
    }
});
//hold btn functionality
btnHold.addEventListener('click', function() {
    if (playing) {
        //add current score to total score
        scores[activePlayer] += currentScore;
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

        //if >=100 win 
        if (scores[activePlayer] >= 100) {
            //finish the game
            playing = false;
            document.querySelector(`.player-${activePlayer}`).classList.add('player-winner');
            document.querySelector(`.player-${activePlayer}`).classList.remove('player-active');
            diceEl.classList.add('hidden');

        } else {
            //switch player
            switchPlayer();
        }

    }
});
btnNew.addEventListener('click', init);