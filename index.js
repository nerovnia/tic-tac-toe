const gamePlaceSize = 3;
const gameplace = new Array(3);
const maxSteps = 9;

class Player {
  static _id = 0;
  constructor (type) {
    this._id = ++Player._id;
    this._type = type;
    this._sign = Player._id;
  }

  get type() {
    return this._type;
  }

  get id() {
    return this._id;
  }

  get sign() {
    return this._sign;
  }

}

// Player types
// 0 - computer
// 1 - human
const player1 = new Player(0);
const player2 = new Player(0);

let activePlayer = player1;
let currentStep = 1;

const allCellsOperations = (action) => {
  for(let col = 0; col < gamePlaceSize; col++) {
    for(let row = 0; row < gamePlaceSize; row++) {
      action(col, row);
    }
  }
}

const gamePlaceInit = (col, row) => {
  if(row === 0) gameplace[col] = [];
  gameplace[col].push(0);
}

const gamePlaceShow = (col, row) => {
  console.log(gameplace[col][row]);
}

const checkColumn = (col, player) => {
  let sum = 0;
  for(let row = 0; row < gamePlaceSize; row++) {
    if(gameplace[col][row] === player) sum++;
  }
  return sum === gamePlaceSize;
}

const checkRow = (row, player) => {
  let sum = 0;
  for(let col = 0; col < gamePlaceSize; col++) {
    if(gameplace[col][row] === player) sum++;
  }
  return sum === gamePlaceSize;
}

const checkLeftDiagonal = (player) => {
  let sum = 0;
  for(let i = 0; i < gamePlaceSize; i++) {
    if(gameplace[i][i] === player) sum++;
  }
  return sum === gamePlaceSize;
}

const checkRightDiagonal = (player) => {
  let sum = 0;
  let col = 3;
  for(let i = 0; i < gamePlaceSize; i++) {
    if(gameplace[--col][i] === player) sum++;
  }
  return sum === gamePlaceSize;
}

const checkCombination = (col, row, player) => {
  if(col === row) {
    if (checkLeftDiagonal(player)) return true;
  }
  if (((col === 2)&&(row === 0))||((col === 0)&&(row === 2))||((col === 1)&&(row === 1))) {
    if(checkRightDiagonal(player)) return true;
  }
  if(checkColumn(col, player)) return true;
  if(checkRow(row, player)) return true;
  return false;
}

const setSign = (col, row, player) => {
  if(gameplace[col][row] !== 0) return;
  gameplace[col][row] = player;
  if(checkCombination(col, row, player)) {
    console.log(`Player with id ${activePlayer.id} are win!`);
    return;
  }
  if(currentStep === maxSteps) {
    console.log(`It's a dead heat. Game over!`);
    return;
  } 
  changeActivePlayer();
  currentStep++;
}

const changeActivePlayer = () => {
  (activePlayer === player1) ? activePlayer = player2 : activePlayer = player1;
}

allCellsOperations(gamePlaceInit);
//allCellsOperations(gamePlaceShow);
//allCellsOperations(gamePlaceShow);
/*
console.dir(gameplace);
console.dir(activePlayer);
setSign(0,2,activePlayer.sign);
console.dir(gameplace);
console.dir(activePlayer);

setSign(0,2,activePlayer.sign);
console.dir(gameplace);
console.dir(activePlayer);

setSign(1,2,activePlayer.sign);
console.dir(gameplace);
console.dir(activePlayer);

setSign(1,0,activePlayer.sign);
console.dir(gameplace);
console.dir(activePlayer);
console.log(currentStep);
*/

setSign(0,0,activePlayer.sign);
console.log(currentStep);
setSign(1,1,activePlayer.sign);
console.log(currentStep);
setSign(1,0,activePlayer.sign);
console.log(currentStep);
setSign(1,2,activePlayer.sign);
console.log(currentStep);
setSign(2,0,activePlayer.sign);
console.log(currentStep);
setSign(1,3,activePlayer.sign);
console.log(currentStep);
setSign(1,0,activePlayer.sign);
console.log(currentStep);
