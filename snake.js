// pure functions

function nextPos(col, row, dir) {
    let nextCol = col;
    let nextRow = row;
    switch (dir) {
        case "right": {
            nextCol += 1;
            break;
        }
        case "left": {
            nextCol -= 1;
            break;
        }
        case "up": {
            nextRow -= 1;
            break;
        }
        case "down": {
            nextRow += 1;
            break;
        }
    }
    return {col: nextCol, row: nextRow};
}

function step(positions, dir) {
    const lastPos = positions[positions.length - 1];
    const { col, row } = lastPos;
    const next = nextPos(col, row, dir);

    // check if game is over
    if (next.col >= nbCols
        || next.col < 0
        || next.row >= nbRows
        || next.row < 0) {
        return positions;
    }
    if (positions.findIndex(p => p.col === next.col && p.row === next.row) !== -1) {
        return positions;
    }
    return [...positions, next];
}

// drawing stuff

const nbCols = 40;
const nbRows = 40;
const squareSize = 5;
const canvas = document.createElement("canvas");
const height = nbRows * squareSize;
const width = nbCols * squareSize;
canvas.setAttribute("height", height + "px");
canvas.setAttribute("width", width + "px");
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
const gameOver = document.getElementById("game-over");
gameOver.style.height = height + "px";
gameOver.style.width = width + "px";

function drawSnake(positions) {
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'green';
    for (let pos of positions) {
        let { col, row } = pos;
        ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
    }
}

// global state

const startCol = Math.round(nbCols / 2);
const startRow = Math.round(nbRows / 2);

let dir = "right";
let positions = [{col:startCol, row: startRow}];

// keyboard handling

const keyMap = {
    "ArrowUp": "up",
    "ArrowDown": "down",
    "ArrowLeft": "left",
    "ArrowRight": "right",
};

document.addEventListener('keydown', e => {
    const d = keyMap[e.key];
    if (d) {
        dir = d;
    }
});

// let's go

function tick() {
    const newPositions = step(positions, dir);
    if (newPositions === positions) {
        console.log("GAME OVER");
        gameOver.style.display = "flex";
    } else {
        drawSnake(newPositions);
        positions = newPositions;
        setTimeout(tick, 100);
    }
}

tick();

