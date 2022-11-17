class Player {
  static _id = 0;
  static #playerType = new Map([['Nobody', 0],['Computer', 1],['Human', 2]]);
  static playerType(key) {
    return Player.#playerType.get(key);
  }
  constructor(type, name, visualSign, colorClass) {
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
    return this._name;
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

class GameCell {
  constructor(htmlElement, owner) {
    this._htmlElement = htmlElement;
    this.owner = owner;
  }

  setSign(player) {
    this.owner = player.sign;
    
    this._htmlElement.textContent = player.visualSign;
    this._htmlElement.classList.add(player.colorClass);
  }

}

class GamePlace {
  constructor(visualGameplaceBlock, playerNobody, player1, player2) {
    this.a = 0;

    this._visualGameplaceBlock = document.querySelector(visualGameplaceBlock);
    this._gamePlaceSize = 3;
    this._currentStep = 1;
    this._maxSteps = 9;
    this._gameCells = new Array(3);

    this._colorPlayer1Class = 'colorPlayer1';
    this._colorPlayer2Class = 'colorPlayer2';

    this._player1 = new Player(player1.type, player1.name, player1.sign, player1.color);
    this._player2 = new Player(player2.type, player2.name, player2.sign, player2.color);

    this._activePlayer = (player1.active) ? this._player1 : this._player2;

    this.allCellsOperations();
  }

  gamePlaceInit(col, row) {
    if (row === 0) this._gameCells[col] = [];
    this._gameCells[col].push(new GameCell(document.querySelector(`#cell-${col}-${row}`), Player.playerType('Nobody')));
    this._visualGameplaceBlock.addEventListener('click', this.cellClick);
  }

  allCellsOperations() {
    for (let col = 0; col < this._gamePlaceSize; col++) {
      for (let row = 0; row < this._gamePlaceSize; row++) {
        this.gamePlaceInit(col, row);
      }
    }
  }

  checkColumn(col, player) {
    let sum = 0;
    for (let row = 0; row < this._gamePlaceSize; row++) {
      if (this._gameCells[col][row].owner === player) sum++;
    }
    return sum === this._gamePlaceSize;
  }

  checkRow(row, player) {
    let sum = 0;
    for (let col = 0; col < this._gamePlaceSize; col++) {
      if (this._gameCells[col][row].owner === player) sum++;
    }
    return sum === this._gamePlaceSize;
  }

  checkLeftDiagonal(player) {
    let sum = 0;
    for (let i = 0; i < this._gamePlaceSize; i++) {
      if (this._gameCells[i][i].owner === player) sum++;
    }
    return sum === this._gamePlaceSize;
  }

  checkRightDiagonal(player) {
    let sum = 0;
    let col = 3;
    for (let i = 0; i < this._gamePlaceSize; i++) {
      if (this._gameCells[--col][i].owner === player) sum++;
    }
    return sum === this._gamePlaceSize;
  }

  checkCombination(col, row, player) {
    col = Number.parseInt(col);
    row = Number.parseInt(row);
    if (col === row) {
      if (this.checkLeftDiagonal(player)) return true;
    }
    if (((col === 2) && (row === 0)) || ((col === 0) && (row === 2)) || ((col === 1) && (row === 1))) {
      if (this.checkRightDiagonal(player)) return true;
    }
    if (this.checkColumn(col, player)) return true;
    if (this.checkRow(row, player)) return true;
    return false;
  }

  changeActivePlayer() {
    (this._activePlayer === this._player1) ? this._activePlayer = this._player2 : this._activePlayer = this._player1;
    this._activePlayer
  }

  cellClick = (event) => {
    const target = event.target;

    let [, col, row] = [...target.id.split('-')];
    
    if ((col === undefined) || (!row === undefined) || (this._gameCells[col][row].owner !== Player.playerType('Nobody'))) return;
    this._gameCells[col][row].setSign(this._activePlayer);
    if (this.checkCombination(col, row, this._activePlayer.sign)) {
      console.log(`${this._activePlayer.name} win!`);
      this.offGameplaceListener();
      return;
    }
    if (this._currentStep === this._maxSteps) {
      console.log(`It's a dead heat. Game over!`);
      this.offGameplaceListener()
      return;
    }
    this.changeActivePlayer();
    this._currentStep++;
  }

  nextStep() {

  }

  offGameplaceListener = () => {
    this._visualGameplaceBlock.removeEventListener('click', this.cellClick);
  }
}

const gamePlace = new GamePlace('#gameplace',
  {
    type: Player.playerType('Nobody'),
    sign: '',
    name: 'Nobody',
    color: 'transparent'
  },
  {
    type: Player.playerType('Computer'),
    sign: 'X',
    name: 'Player 1',
    color: 'colorPlayer1',
    active: true
  },
  {
    type: Player.playerType('Computer'),
    sign: 'O',
    name: 'Player 2',
    color: 'colorPlayer2'
  }
);



