
// Initial DATA
let square = {
  a1: '', a2:  '', a3:  '',
  b1: '', b2:  '', b3:  '',
  c1: '', c2:  '', c3:  '',
};

let playerTurn = '';
let warning = '';
let playing = false;

reset();

// Events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', itemClick);
});

function itemClick(event) {
  let item = event.target.getAttribute('data-item');
  if(playing && square[item] === '') {
    square[item] = playerTurn;
    renderSquare();
    togglePlayerTurn();
  }
}

// Functions
function reset() {
  warning = '';

  let random = Math.floor(Math.random() * 2);
  playerTurn = (random === 0) ? 'x' : 'o';

  for(let i in square) {
    square[i] = '';
  }

  playing = true;
  renderSquare();
  renderInfo();
}

function renderSquare() {
  for(let i in square) {
    let item = document.querySelector(`div[data-item=${i}]`);
    item.innerHTML = square[i];
  }

  checkGame();
}

function renderInfo() {
  document.querySelector('.vez').innerHTML = playerTurn;
  document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayerTurn() {
  playerTurn = (playerTurn === 'x') ? 'o' : 'x';
  renderInfo();
}

function checkGame() {
  if(checkWinnerFor('x')) {
    warning = 'O "x" venceu!';
    playing = false;
  }else if(checkWinnerFor('o')) {
    warning = 'O "o" venceu!';
    playing = false;
  }else if(isFull()) {
    warning = 'Deu empate';
    playing = false;
  }
}

function checkWinnerFor(playerTurn) {
  let possibilities = [
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',

    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',
    
    'a1,b2,c3',
    'a3,b2,c1'
  ];

  for(let w in possibilities) {
    let pArray = possibilities[w].split(',');
    let hasWon = pArray.every(option => square[option] === playerTurn);
    if(hasWon) {
      return true;
    }
  }
  return false;
}

function isFull() {
  for(let i in square) {
    if(square[i] === '') {
      return false;
    }
  }
  return true;
}