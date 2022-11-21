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

class CheckedResult {
  static gameCombination = new Map([['column', 0], ['row', 1], ['leftDiagonal', 2], ['rightDiagonal', 3]]);
  constructor() {
    this._arrSelectedCells = [],
    this._arrUnselectedCells = [],
    this._combination = null;
    this._checkResult = false
  }

  get arrSelectedCells() {
    return this._arrSelectedCells;
  }

  addSelectedCell(cell) {
    this._arrSelectedCells.push(cell);
  }

  get arrUnelectedCells() {
    return this._arrUnselectedCells;
  }

  resetSelectedCells() {
    this._arrSelectedCells = [];
  }

  addUnselectedCell(cell) {
    this._arrUnselectedCells.push(cell);
  }

  resetUnselectedCells() {
    this._arrUnselectedCells = [];
  }

  get combination() {
    return this._combination;
  }

  set combination(comb) {
    this._combination = comb;
  }

  get checkResult() {
    return this._checkResult;
  }

  set checkResult(res) {
    this._checkResult = res;
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

    if (this._activePlayer._type === Player.playerType('Computer')) this.computerPlayerStep();
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

  checkColumn(col, player, checkedResult) {
    checkedResult.resetSelectedCells();
    checkedResult.resetUnselectedCells();    
    for (let row = 0; row < this._gamePlaceSize; row++) {
      if (this._gameCells[col][row].owner === player) {
        checkedResult.addSelectedCell([col, row]);
      } else {
        checkedResult.addUnselectedCell([col, row]);
      }
    }
    //return sum;
  }

  checkRow(row, player, checkedResult) {
    checkedResult.resetSelectedCells();
    checkedResult.resetUnselectedCells();    
    for (let col = 0; col < this._gamePlaceSize; col++) {
      if (this._gameCells[col][row].owner === player) { 
        checkedResult.addSelectedCell([col, row]);
      } else {
        checkedResult.addUnselectedCell([col, row]);
      }
    }
    //return sum;
  }

  checkLeftDiagonal(player, checkedResult) {
    checkedResult.resetSelectedCells();
    checkedResult.resetUnselectedCells();    
    for (let i = 0; i < this._gamePlaceSize; i++) {
      if (this._gameCells[i][i].owner === player) {
        checkedResult.addSelectedCell([i, i]);
      } else {
        checkedResult.addUnselectedCell([i, i]);
      }
    }
    //return sum;
  }

  checkRightDiagonal(player, checkedResult) {
    checkedResult.resetSelectedCells();
    checkedResult.resetUnselectedCells();    
    let col = 3;
    for (let i = 0; i < this._gamePlaceSize; i++) {
      if (this._gameCells[--col][i].owner === player) {
        checkedResult.addSelectedCell([col, i]);
      } else {
        checkedResult.addUnselectedCell([col, i]);
      }
    }
    //return sum;
  }
/*
  checkCombination(col, row, maxSelectedCells, player) {
    const formatCombinationResult = (func, strGameCombination) => {
      func(player, checkedResult);
      if (checkedResult.arrSelectedCells.length === maxSelectedCells) 
        checkedResult.combination = CheckedResult.gameCombination(strGameCombination);
    };
    col = Number.parseInt(col);
    row = Number.parseInt(row);
    const checkedResult = new CheckedResult();
    if (col === row) {
      formatCombinationResult(this.checkLeftDiagonal, 'leftDiagonal');
    }
    if (((col === 2) && (row === 0)) || ((col === 0) && (row === 2)) || ((col === 1) && (row === 1))) {
      formatCombinationResult(this.checkRightDiagonal, 'rightDiagonal');
    }


    if (this.checkColumn(col, player, checkedResult) === maxSelectedCells) return checkedResult;
    if (this.checkRow(row, player, checkedResult) === maxSelectedCells) return checkedResult;
    return checkedResult;
  }
*/
  checkCombination(col, row, maxSelectedCells, player) {
    col = Number.parseInt(col);
    row = Number.parseInt(row);
    const checkedResult = new CheckedResult();
    if (col === row) {
      this.checkLeftDiagonal(player, checkedResult);
      if (checkedResult.arrSelectedCells.length === maxSelectedCells){
        checkedResult.checkResult = true;
        checkedResult.combination = CheckedResult.gameCombination.get('leftDiagonal');
        return checkedResult;
      } 
    }
    if (((col === 2) && (row === 0)) || ((col === 0) && (row === 2)) || ((col === 1) && (row === 1))) {
      this.checkRightDiagonal(player, checkedResult);
      if (checkedResult.arrSelectedCells.length === maxSelectedCells){
        checkedResult.checkResult = true;
        checkedResult.combination = CheckedResult.gameCombination.get('rightDiagonal');
        return checkedResult;
      }
    }
    this.checkColumn(col, player, checkedResult)
    if (checkedResult.arrSelectedCells.length === maxSelectedCells){
      checkedResult.checkResult = true;
      checkedResult.combination = CheckedResult.gameCombination.get('column');
      return checkedResult;
    }
    this.checkRow(row, player, checkedResult)
    if (checkedResult.arrSelectedCells.length === maxSelectedCells){
      checkedResult.checkResult = true;
      checkedResult.combination = CheckedResult.gameCombination.get('row');
      return checkedResult;
    }
    checkedResult.checkResult = false;
    checkedResult.combination = null;
    return checkedResult;
}

  changeActivePlayer() {
    (this._activePlayer === this._player1) ? this._activePlayer = this._player2 : this._activePlayer = this._player1;
  }

  cellClick = (event) => {
    let [, col, row] = [...event.target.id.split('-')];
    this.nextStep(col, row);  
  }
  
  nextStep(col, row) {
    if ((col === undefined) || (!row === undefined) || (this._gameCells[col][row].owner !== Player.playerType('Nobody'))) return;
    this._gameCells[col][row].setSign(this._activePlayer);
    const checkedResult = this.checkCombination(col, row, this._gamePlaceSize, this._activePlayer.sign);
    console.dir(checkedResult);
    if (checkedResult.checkResult) {
      console.log(`${this._activePlayer.name} win!`);
      alert(`${this._activePlayer.name} win!`);
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

    if ((this._activePlayer._type === Player.playerType('Computer')) && (this._currentStep < 3)) this.computerPlayerStep();
  }

  offGameplaceListener = () => {
    this._visualGameplaceBlock.removeEventListener('click', this.cellClick);
  }

  computerPlayerStep() {
    const cornerCells = [[0, 0], [2, 0], [0, 2], [2, 2]];
    if (this._currentStep < 3) {
      if (this.isCellEmpty(1,1)){
        this.nextStep(1, 1);
      } else {
        this.nextStep(...cornerCells[Math.floor(Math.random() * 4)]);
      }
    } else if (this._currentStep === 3) {
      const fullCornerCell = cornerCells.filter(cell => !this.isCellEmpty(...cell));
      if(this.getGameCell(1 , 1).owner === this._activePlayer.sign) {
        if(fullCornerCell) {
          let arr = [];
          if(fullCornerCell[0]['0'] !== fullCornerCell[0]['1']) {
            arr = [0, 3];
          } else {
            arr = [1, 2];
          }  
          this.nextStep(...cornerCells[arr[Math.floor(Math.random() * 2)]]);
        }
      }
    } else {
      // Check is adversary has two sign in diagonals, rows or columns
      const adversaryPlayer = (this._activePlayer === this._player1) ? this._player2 : this._player1;
      //this.ch
    }
    console.log('Computer step!')
    //this.nextStep(col, row);
  }

  getGameCell(col, row) {
    return this._gameCells[col][row];
  }

  isCellEmpty(col, row) {
    return (this.getGameCell(col, row).owner === 0 ) ? true : false;
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
    type: Player.playerType('Human'),
    sign: 'X',
    name: 'Player 1',
    color: 'colorPlayer1',
    active: true
  },
  {
    type: Player.playerType('Human'),
    sign: 'O',
    name: 'Player 2',
    color: 'colorPlayer2'
  }
);



