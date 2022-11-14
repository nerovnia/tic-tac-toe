const paintSign = (col, row, targetCell) => {
  gameplace[col][row] = activePlayer.sign;
  targetCell.textContent = activePlayer.visualSign;
  targetCell.classList.add(activePlayer.colorClass);
}

const cellClick = (event) => {
  const target = event.target;
  let col = 0;
  let row = 0;

  {
    const t_arr = target.id.split('-');
    col = Number.parseInt(t_arr[1]);
    row = Number.parseInt(t_arr[2]);
  }
  if((col === undefined) || (!row === undefined) || (gameplace[col][row] !== 0)) return;
  paintSign(col, row, target);
  if(checkCombination(col, row, activePlayer.sign))  {
    console.log(`Player with id ${activePlayer.id} are win!`);
    offGameplaceListener();
    return;
  }
  if(currentStep === maxSteps) {
    console.log(`It's a dead heat. Game over!`);
    offGameplaceListener()
    return;
  } 
  changeActivePlayer();
  currentStep++;
}

const visualGameplace = document.querySelector("#gameplace");
visualGameplace.addEventListener('click', cellClick);

allCellsOperations(gamePlaceInit);

const offGameplaceListener = () => {
  visualGameplace.removeEventListener('click', cellClick);  
}
