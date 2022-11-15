class Player {
  static _id = 0;
  constructor (type, name, visualSign, colorClass) {
    this._id = ++Player._id;
    this._type = type;
    this._name = name;
    this._sign = Player._id;
    this._visualSign = visualSign;
    this._colorClass = colorClass;
  }

  get type() {
    return this._type;
  }

  get name() {
    return this.name;
  }

  get id() {
    return this._id;
  }

  get sign() {
    return this._sign;
  }

  get visualSign() {
    return this._visualSign;
  }

  get colorClass() {
    return this._colorClass;
  }

}

class GamePlace {
  constructor(visualGameplaceBlock, player1, player2) {
    this.a = 0;

    this._visualGameplaceBlock = document.querySelector(visualGameplaceBlock);
    this._gamePlaceSize = 3;
    this._currentStep = 1;
    this._maxSteps = 9;
    this._gameplace = new Array(3);
    this._colorPlayer1Class = 'colorPlayer1';
    this._colorPlayer2Class = 'colorPlayer2';

    this._player1 = new Player(player1.type, 'Player1', player1.sign, player1.color);
    this._player2 = new Player(player2.type, 'Player2', player2.sign, player2.color);

    this._activePlayer = (player1.active) ? this._player1 : this._player2;

    this.allCellsOperations();
  }

  gamePlaceInit(col, row) {
    this.a = 6; 
    if(row === 0) this._gameplace[col] = [];
    this._gameplace[col].push(0);
    this._visualGameplaceBlock.addEventListener('click', this.cellClick);
  }

  allCellsOperations() {
    for(let col = 0; col < this._gamePlaceSize; col++) {
      for(let row = 0; row < this._gamePlaceSize; row++) {
        this.gamePlaceInit(col, row);
      }
    }
  }
  
  checkColumn(col, player) {
    let sum = 0;
    for(let row = 0; row < this._gamePlaceSize; row++) {
      if(this._gameplace[col][row] === player) sum++;
    }
    return sum === this._gamePlaceSize;
  }
  
  checkRow(row, player) {
    let sum = 0;
    for(let col = 0; col < this._gamePlaceSize; col++) {
      if(this._gameplace[col][row] === player) sum++;
    }
    return sum === this._gamePlaceSize;
  }
  
  checkLeftDiagonal(player) {
    let sum = 0;
    for(let i = 0; i < this._gamePlaceSize; i++) {
      if(this._gameplace[i][i] === player) sum++;
    }
    return sum === this._gamePlaceSize;
  }
  
  checkRightDiagonal(player) {
    let sum = 0;
    let col = 3;
    for(let i = 0; i < this._gamePlaceSize; i++) {
      if(this._gameplace[--col][i] === player) sum++;
    }
    return sum === this._gamePlaceSize;
  }
  
  checkCombination(col, row, player) {
    if(col === row) {
      if (this.checkLeftDiagonal(player)) return true;
    }
    if (((col === 2) && (row === 0)) || ((col === 0) && (row === 2)) || ((col === 1) && (row === 1))) {
      if(this.checkRightDiagonal(player)) return true;
    }
    if(this.checkColumn(col, player)) return true;
    if(this.checkRow(row, player)) return true;
    return false;
  }
  
  changeActivePlayer() {
    (this._activePlayer === this._player1) ? this._activePlayer = this._player2 : this._activePlayer = this._player1;
    this._activePlayer
  }

  cellClick = (event) => {
    const target = event.target;
    let col = 0;
    let row = 0;
  
    {
      const t_arr = target.id.split('-');
      col = Number.parseInt(t_arr[1]);
      row = Number.parseInt(t_arr[2]);
    }

    if((col === undefined) || (!row === undefined) || (this._gameplace[col][row] !== 0)) return;
    this.paintSign(col, row, target);
    if(this.checkCombination(col, row, this._activePlayer.sign))  {
      console.log(`Player with id ${this._activePlayer.id} are win!`);
      this.offGameplaceListener();
      return;
    }
    if(this._currentStep === this._maxSteps) {
      console.log(`It's a dead heat. Game over!`);
      this.offGameplaceListener()
      return;
    } 
    this.changeActivePlayer();
    this._currentStep++;
  }

  offGameplaceListener = () => {
    this._visualGameplaceBlock.removeEventListener('click', this.cellClick);  
  }
  
  paintSign(col, row, targetCell) {
    this._gameplace[col][row] = this._activePlayer.sign;
    targetCell.textContent = this._activePlayer.visualSign;
    targetCell.classList.add(this._activePlayer.colorClass);
  }
}

const gamePlace = new GamePlace('#gameplace',
  {
    type: 0,
    sign: 'X',
    color: 'colorPlayer1',
    active: true
  },
  {
    type: 0,
    sign: 'O',
    color: 'colorPlayer2'
  }
);


// Player types
// 0 - computer
// 1 - human
//const player1 = new Player(0, 'X', 'colorPlayer1');
//const player2 = new Player(0, 'O', 'colorPlayer2');

//let activePlayer = player1;
//let currentStep = 1;


/*
const gamePlaceShow = (col, row) => {
  console.log(gameplace[col][row]);
}
*/


