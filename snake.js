const nbCols = 20;
const nbRows = 20;
const squareSize = 10;

const canvas = document.createElement("canvas");
const height = nbRows * squareSize;
const width = nbCols * squareSize;
canvas.setAttribute("height", height + "px");
canvas.setAttribute("width", width + "px");
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

function drawSnake(positions) {
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'green';
    for (let pos of positions) {
        let { col, row } = pos;
        ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
    }
}

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

let dir = "right";
let positions = [{col:0, row: 0}];

function step() {
    const lastPos = positions[positions.length - 1];
    const { col, row } = lastPos;
    const next = nextPos(col, row, dir);

    // check if game is over
    if (next.col >= nbCols
        || next.col < 0
        || next.row >= nbRows
        || next.row < 0) {
        return false;
    }
    if (positions.findIndex(p => p.col === next.col && p.row === next.row) !== -1) {
        return false;
    }

    positions.push(next);
    drawSnake(positions);
    return true;
}

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

function tick() {
    if (step()) {
        setTimeout(tick, 1000);
    } else {
        console.log("GAME OVER");
    }
}

tick();

