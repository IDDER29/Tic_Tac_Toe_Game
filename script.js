function updateTheBoard(el, game) {
  switch (el.dataset.index) {
    case "1-1":
      game.gameBoard[0][0] = item;
      break;
    case "1-2":
      game.gameBoard[0][1] = item;
      break;
    case "1-3":
      game.gameBoard[0][2] = item;
      break;
    case "2-1":
      game.gameBoard[1][0] = item;
      break;
    case "2-2":
      game.gameBoard[1][1] = item;
      break;
    case "2-3":
      game.gameBoard[1][2] = item;
      break;
    case "3-1":
      game.gameBoard[2][0] = item;
      break;
    case "3-2":
      game.gameBoard[2][1] = item;
      break;
    case "3-3":
      game.gameBoard[2][2] = item;
      break;
  }
}

let item = "X";
let result_msg = document.querySelector('.alert_result_msg');

let winner = document.querySelector('#winner_name');

function resultMessage(winnerN) {
  result_msg.classList.toggle('display');
  winner.textContent = winnerN;
}

function playTurn(game, el) {
  const index = el.dataset.index.split("-")
  const x = parseInt(index[1] - 1)
  const y = parseInt(index[0] - 1)
  const cell = game.gameBoard[y][x]

  if (cell === null) {
    let gameBoard = game.gameBoard;

    updateTheBoard(el, game);
    displayBoard(game);

    if ((checkTheWinner(game)) == true) {
      game.gameBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ];

      item = "O";
    }


    if (item == "X") {
      item = "O";
    } else if (item == "O") {
      item = "X";
    }

  }
}

function displayBoard(game) {
  for (let i = 0; i < game.gameBoard.length; i++) {
    for (let j = 0; j < game.gameBoard[i].length; j++) {

      let index = `${i + 1}-${j + 1}`;

      let element = document.querySelector(`[data-index="${index}"]`);

      switch (`${index}`) {
        case "1-1":
          element.textContent = game.gameBoard[i][j];
          element.classList.remove('bc_X_color');
          element.classList.remove('bc_O_color');

          break;
        case "1-2":
          element.textContent = game.gameBoard[i][j];

          break;
        case "1-3":
          element.textContent = game.gameBoard[i][j];
          break;
        case "2-1":
          element.textContent = game.gameBoard[i][j];
          break;
        case "2-2":
          element.textContent = game.gameBoard[i][j];
          break;
        case "2-3":
          element.textContent = game.gameBoard[i][j];
          break;
        case "3-1":
          element.textContent = game.gameBoard[i][j];
          break;
        case "3-2":
          element.textContent = game.gameBoard[i][j];
          break;
        case "3-3":
          element.textContent = game.gameBoard[i][j];
          break;
        default:
          element.classList.remove('bc_X_color');
          element.classList.remove('bc_O_color');

      }
      element.classList.remove('bc_X_color');
      element.classList.remove('bc_O_color');
    }
  }
}

const checkTheWinner = function (game) {
  const firstDiagonalCondition =
    game.gameBoard[0][0] !== null &&
    game.gameBoard[1][1] !== null &&
    game.gameBoard[2][2] !== null &&
    game.gameBoard[1][1] === game.gameBoard[0][0] &&
    game.gameBoard[1][1] === game.gameBoard[2][2];

  const secondDiagonalCondition =
    game.gameBoard[0][2] !== null &&
    game.gameBoard[1][1] !== null &&
    game.gameBoard[2][0] !== null &&
    game.gameBoard[1][1] === game.gameBoard[0][2] &&
    game.gameBoard[1][1] === game.gameBoard[2][0];

  if (firstDiagonalCondition || secondDiagonalCondition) {
    firstDiagonalCondition 
      ? changeColor(game, 0, 'cross', game.gameBoard[1][1])
      : changeColor(game, 2, 'cross', game.gameBoard[1][1]);

    return true;
  } 

  for (let i = 0; i < game.gameBoard.length; i++) {
    const rowsCheck =
      game.gameBoard[i][0] !== null &&
      game.gameBoard[i][1] !== null &&
      game.gameBoard[i][2] !== null &&
      game.gameBoard[i][0] === game.gameBoard[i][1] &&
      game.gameBoard[i][0] === game.gameBoard[i][2];

    const columnsCheck =
      game.gameBoard[0][i] !== null &&
      game.gameBoard[1][i] !== null &&
      game.gameBoard[2][i] !== null &&
      game.gameBoard[0][i] === game.gameBoard[1][i] &&
      game.gameBoard[0][i] === game.gameBoard[2][i];

    if (rowsCheck) {
      changeColor(game, i, 'row', game.gameBoard[i][0]);
      return true;
    } else if (columnsCheck) {
      changeColor(game, i, 'column', game.gameBoard[0][i]);
      return true;
    }
  }

  const drawCondition = game.gameBoard.every(row => {
    return row.every(sign => sign !== null)
  })

  if (drawCondition) {
    resultMessage('Draw');
    return true;
  }
};

function changeColor(game, index, direction, code) {
  let indexS;
  let element;

  if (direction == 'row') {
    for (let i = 1; i <= 3; i++) {
      indexS = `${index + 1}-${i}`;
      element = document.querySelector(`[data-index="${indexS}"]`);

      if (code == 'X') {
        element.classList.add('bc_X_color');
      } else if (code == 'O') {
        element.classList.add('bc_O_color');
      }
    }
  } else if (direction == 'column') {
    for (let i = 1; i <= 3; i++) {
      indexS = `${i}-${index + 1}`;
      element = document.querySelector(`[data-index="${indexS}"]`);

      if (code == 'X') {
        element.classList.add('bc_X_color');
        // element.id = '';
      } else if (code == 'O') {
        element.classList.add('bc_O_color');
      }
    }
  } else if (direction == 'cross') {
    if (index == 0) {
      for (let i = 0; i < 3; i++) {
        indexS = `${i + 1}-${i + 1}`;

        element = document.querySelector(`[data-index="${indexS}"]`);


        if (code == 'X') {
          element.classList.add('bc_X_color');
          // element.id = '';
        } else if (code == 'O') {
          element.classList.add('bc_O_color');
        }
      }
    } else if (index == 2) {
      for (let i = 0; i < 3; i++) {
        indexS = `${1 + i}-${3 - i}`;
        element = document.querySelector(`[data-index="${indexS}"]`);

        if (code == 'X') {
          element.classList.add('bc_X_color');
        } else if (code == 'O') {
          element.classList.add('bc_O_color');
        }
      }
    }
  }

  countScore(game, code)
  setTimeout(() => resultMessage(code), 600);
}

function clearBoard(game) {
  game.gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  displayBoard(game);

  item = 'X';
}

function countScore(game, code) {
  if (code == 'X') {
    if (game.player1.sing == code) {
      game.player1.score += 1;
    } else if (game.player2.sing == code) {
      game.player2.score += 1;
    }

  } else if (code == 'O') {
    if (game.player1.sing == code) {
      game.player1.score += 1;
    } else if (game.player2.sing == code) {
      game.player2.score += 1;
    }
  }
  let player1Score = game.player1.score;
  let player2Score = game.player2.score;

  const PointesBoard1 = document.querySelector('.pointes_player1');
  const PointesBoard2 = document.querySelector('.pointes_player2');

  let scratches1Arr = [];

  let scratches1 = document.createElement('div');
  scratches1.classList.add('scratches');



  let scratches2Arr = [];
  let scratches2 = document.createElement('div');
  scratches2.classList.add('scratches');

  PointesBoard1.textContent = ' ';
  PointesBoard2.textContent = ' ';
  for (let i = 1; i <= player1Score; i++) {
    let scratch = document.createElement('div');
    scratch.classList.add('scratch');
    let devImage = new Image();
    devImage.src = "./images/scratch.png";

    if (i % 5 == 0 && i != 1) {
      devImage.src = "./images/scratch2.png";
      scratch.classList.add('last_scratch');
    }
    scratch.appendChild(devImage);
    scratches1.appendChild(scratch);

    if (i % 5 == 0 && i != 1) {
      scratches1Arr.push(scratches1);
      scratches1 = document.createElement('div');
      scratches1.classList.add('scratches');
    }



  }
  scratches1Arr.push(scratches1);
  scratches1Arr.forEach(scratches => PointesBoard1.appendChild(scratches));




  for (let i = 1; i <= player2Score; i++) {
    let scratch = document.createElement('div');
    scratch.classList.add('scratch');
    let devImage = new Image();
    devImage.src = "./images/scratch.png";

    if (i % 5 == 0 && i != 1) {
      devImage.src = "./images/scratch2.png";
      scratch.classList.add('last_scratch');
    }
    scratch.appendChild(devImage);
    scratches2.appendChild(scratch);

    if (i % 5 == 0 && i != 1) {
      scratches2Arr.push(scratches2);
      scratches2 = document.createElement('div');
      scratches2.classList.add('scratches');
    }
  }

  scratches2Arr.push(scratches2);
  scratches2Arr.forEach(scratches => PointesBoard2.appendChild(scratches));
}

const main = () => {
  const game = (function () {
    let gameBoard = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];

    let player1 = {
      name: "Idder",
      sing: "X",
      score: 0,
    };

    let player2 = {
      name: "Bot",
      sing: "O",
      score: 0,
    };

    return { gameBoard, player1, player2 };
  })();

  let boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => box.addEventListener("click", () => playTurn(game, box)));

  let restartBtn = document.querySelector(".restart_btn");
  restartBtn.addEventListener('click', () => clearBoard(game))

  const MsgBtn = document.querySelector('.btn-two');
  MsgBtn.addEventListener('click', () => {
    resultMessage(); 
    clearBoard(game);
  });
}

main()
