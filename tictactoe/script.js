
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
  if(square[item] === '') {
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
}

function renderInfo() {
  document.querySelector('.vez').innerHTML = playerTurn;
  document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayerTurn() {
  playerTurn = (playerTurn === 'x') ? 'o' : 'x';
  renderInfo();
}