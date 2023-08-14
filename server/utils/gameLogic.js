// // utils/gameLogic.js

// const BOARD_SIZE = 10;  // 10x10 board
// const SHIP = 1;         // Using simple numerical representation for the ship.
// const EMPTY = 0;

// const createBoard = () => {
//     const board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(EMPTY));

//     // For simplicity, let's place ships randomly on the board.
//     // Assuming a single ship occupying a single cell for demonstration purposes.
//     for (let i = 0; i < 5; i++) {  // Place 5 ships
//         const x = Math.floor(Math.random() * BOARD_SIZE);
//         const y = Math.floor(Math.random() * BOARD_SIZE);
//         if (board[y][x] === EMPTY) {
//             board[y][x] = SHIP;
//         } else {
//             i--; // Retry if a ship is already there.
//         }
//     }
//     return board;
// }

// const checkHit = (board, x, y) => {
//     return board[y][x] === SHIP;
// }

// const markHit = (board, x, y) => {
//     board[y][x] = -SHIP;  // Mark as hit
// }

// const markMiss = (board, x, y) => {
//     board[y][x] = -EMPTY;  // Mark as miss
// }

// const checkAllShipsSunk = (board) => {
//     for (let y = 0; y < BOARD_SIZE; y++) {
//         for (let x = 0; x < BOARD_SIZE; x++) {
//             if (board[y][x] === SHIP) {
//                 return false; // If we find a ship that's not hit, game is not over.
//             }
//         }
//     }
//     return true;
// }

// module.exports = {
//     createBoard,
//     checkHit,
//     markHit,
//     markMiss,
//     checkAllShipsSunk
// };
