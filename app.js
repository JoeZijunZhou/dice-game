/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

// init dice game
init();

// event handler for roll button
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) { // game still on
      // random dice
      var dice = Math.floor(Math.random() * 6) + 1;

      // display dice
      var diceDOM = document.querySelector('.dice');
      diceDOM.style.display = 'block';
      diceDOM.src = 'dice-' + dice + '.png';

      // if not 1, add round score
      if (dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      } else {
        // add 0 to round score and next player
        nextPlayer();
      }
    }
});


// event handler for hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) { // game still on
      // add round score to global score
      scores[activePlayer] += roundScore;

      // display updated global score
      document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

      // check if won
      if (scores[activePlayer] >= 100) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
      } else {
        // next player
        nextPlayer();
      }
    }
});

// new game event handler
document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    // update activePlayer
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    // clear round score
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // toggle active player panel
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // clear dice
    document.querySelector('.dice').style.display = 'none';
}


function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    // round scores
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    // global scores
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // player name
    document.getElementById('name-0').textContent = 'Player 1: Naruto';
    document.getElementById('name-1').textContent = 'Player 2: Sasuke';
    // if new game, clear Winner
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
