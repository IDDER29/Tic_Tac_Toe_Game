let game = (function () {
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

    let playTurnUI = function () {
        let gameUI = [];

        for (let i = 0; i < gameBoard.length; i++) {
            console.log(gameBoard[i].join("|"));
            console.log("\n");
        }

        console.log(gameUI);
    };
    return { gameBoard, player1, player2, playTurnUI };
})();



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

function playTurn(el) {


    if (el.textContent == "") {
        let gameBoard = game.gameBoard;


        updateTheBoard(el, game);
        displayBoard(game);

        if ((checkTheWinner(gameBoard)) == true) {
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

let checkTheWinner = function (gameBoard) {
    let firstDiagonalCondition =
        gameBoard[0][0] !== null &&
        gameBoard[1][1] !== null &&
        gameBoard[2][2] !== null &&
        gameBoard[1][1] === gameBoard[0][0] &&
        gameBoard[1][1] === gameBoard[2][2];

    let secondDiagonalCondition =
        gameBoard[0][2] !== null &&
        gameBoard[1][1] !== null &&
        gameBoard[2][0] !== null &&
        gameBoard[1][1] === gameBoard[0][2] &&
        gameBoard[1][1] === gameBoard[2][0];

    let drawCondition = gameBoard[0].find((el) => el == null) === null || gameBoard[1].find((el) => el == null) === null || gameBoard[2].find((el) => el == null) === null;


    if (firstDiagonalCondition || secondDiagonalCondition) {

        firstDiagonalCondition ? changeColor(0, 'cross', gameBoard[1][1]) : changeColor(2, 'cross', gameBoard[1][1]);

        return true;
    } else if (!drawCondition) {
        resultMessage('Draw');
        return true ; 
    } else {
        for (let i = 0; i < gameBoard.length; i++) {
            let rowsCheck =
                gameBoard[i][0] !== null &&
                gameBoard[i][1] !== null &&
                gameBoard[i][2] !== null &&
                gameBoard[i][0] === gameBoard[i][1] &&

                gameBoard[i][0] === gameBoard[i][2];

            let columnsCheck =
                gameBoard[0][i] !== null &&
                gameBoard[1][i] !== null &&
                gameBoard[2][i] !== null &&
                gameBoard[0][i] === gameBoard[1][i] &&

                gameBoard[0][i] === gameBoard[2][i];



            if (rowsCheck) {
                changeColor(i, 'row', gameBoard[i][0]);
                return true;
            } else if (columnsCheck) {
                changeColor(i, 'column', gameBoard[0][i]);
                return true;
            }
        }
    }
};
function changeColor(index, direction, code) {
    let indexS;
    let element;
    if (direction == 'row') {
        for (let i = 1; i <= 3; i++) {
            indexS = `${index + 1}-${i}`;

            element = document.querySelector(`[data-index="${indexS}"]`);

            if (code == 'X') {
                element.classList.add('bc_X_color');


                // element.id = '';
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
                    // element.id = '';
                } else if (code == 'O') {
                    element.classList.add('bc_O_color');
                }
            }
        }
    }
    countScore(code)
    setTimeout(() => resultMessage(code), 600);
}
function clearBoard() {
    game.gameBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    displayBoard(game);

    item = 'X';
}

function countScore(code) {

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

let boxes = document.querySelectorAll(".box");
let restartBtn = document.querySelector(".restart_btn");

boxes.forEach((box) => box.addEventListener("click", () => playTurn(box)));



restartBtn.addEventListener('click', () => clearBoard())
const MsgBtn = document.querySelector('.btn-two');
MsgBtn.addEventListener('click', () => {
    resultMessage(); clearBoard();
});
