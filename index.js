const gamePlaceSize = 3;
const gameplace = new Array(3);

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

console.log(player2);

const allCellsOperations = (action) => {
  for(let c = 0; c < gamePlaceSize; c++) {
    for(let r = 0; r < gamePlaceSize; r++) {
      action(c, r);
    }
  }
}

const gamePlaceInit = (c, r) => {
  if(r === 0) gameplace[c] = [];
  gameplace[c].push(0);
}

const gamePlaceShow = (c, r) => {
  console.log(gameplace[c][r]);
}

const checkColumn = (col, player) => {
  let sum = 0;
  for(let i = 0; i < gamePlaceSize; i++) {
    if(gameplace[col][i] === player) sum++;
  }
  return sum === gamePlaceSize;
}

const checkRow = (row, player) => {
  let sum = 0;
  for(let i = 0; i < gamePlaceSize; i++) {
    if(gameplace[i][row] === player) sum++;
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

const setSign = (player) => {

}

allCellsOperations(gamePlaceInit);
//allCellsOperations(gamePlaceShow);

console.log(gameplace);