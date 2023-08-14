// Create an empty board
const createBoard = (size) => {
    return Array(size).fill(null).map(() => Array(size).fill({ type: 'water', shipId: null }));
};

// Check if a coordinate hits a ship
const checkHit = (board, row, col) => {
    return board[row][col].type === 'ship';
};

// Mark a position as hit
const markHit = (board, row, col) => {
    board[row][col].type = 'hit';
};

// Mark a position as miss
const markMiss = (board, row, col) => {
    board[row][col].type = 'miss';
};

// Check if a ship is sunk
const isShipSunk = (board, shipId) => {
    for (let row of board) {
        for (let cell of row) {
            if (cell.shipId === shipId && cell.type !== 'hit') {
                return false;
            }
        }
    }
    return true;
};

module.exports = { createBoard, checkHit, markHit, markMiss, isShipSunk };
