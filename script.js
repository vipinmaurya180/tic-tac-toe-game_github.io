let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks').trim(); // Trim to remove any extra whitespace

console.log(boxes);

const O_TEXT = "O";
const X_TEXT = "X";

let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}

function boxClicked(e) {
    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        const winningBlocks = playerHasWon();
        if (winningBlocks !== false) {
            playerText.innerText = `${currentPlayer} has won !!`;

            // Highlight the winning blocks
            winningBlocks.forEach(index => boxes[index].style.backgroundColor = winnerIndicator);
            
            // Remove the click event listeners to prevent further moves
            boxes.forEach(box => box.removeEventListener('click', boxClicked));
            
            return;
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    }
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c];
        }
    }
    return false;
}

restartBtn.addEventListener('click', restart);

function restart() {
    spaces.fill(null);

    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = ''; // Clear the background color
    });

    playerText.innerText = 'Tic Tac Toe';
    currentPlayer = X_TEXT;
    boxes.forEach(box => box.addEventListener('click', boxClicked)); // Add back click event listeners
}

startGame();
