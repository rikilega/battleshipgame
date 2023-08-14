// const express = require('express');
// const router = express.Router();
// const { checkJwtToken } = require('../../middleware/auth');
// const Game = require('../../models/Game');

// const {
//     createBoard,
//     checkHit,
//     markHit,
//     markMiss,
//     checkAllShipsSunk
// } = require('../../utils/gameLogic');

// router.post('/create', checkJwtToken, async (req, res) => {
//     try {
//         const game = new Game({
//             player1: req.user.id
//         });
//         await game.save();
//         res.json(game);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// //join game
// router.post('/join/:gameId', checkJwtToken, async (req, res) => {
//     try {
//         const game = await Game.findById(req.params.gameId);
//         if (!game) {
//             return res.status(404).send('Game not found');
//         }
//         game.player2 = req.user.id;
//         game.status = 'in_progress';
//         await game.save();
//         res.json(game);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// //make a move
// router.post('/:gameId/move', checkJwtToken, async (req, res) => {
//     const { row, col } = req.body;
    
//     try {
//         const game = await Game.findById(req.params.gameId);
//         if (!game) {
//             return res.status(404).send('Game not found');
//         }

//         const board = game.currentPlayer === 1 ? game.board2 : game.board1;

//         if (checkHit(board, row, col)) {
//             // ... handle the hit logic, marking the cell, checking for sunk ships, etc.
//             // Update the game's board state
//         } else {
//             // ... handle the miss logic
//         }

//         if (checkAllShipsSunk(board)) {
//             game.status = 'ended';
//             game.winner = req.user.id;
//         } else {
//             game.currentPlayer = game.currentPlayer === 1 ? 2 : 1; // toggle player
//         }

//         await game.save();
//         res.json(game);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// //get game status

// router.get('/:gameId', async (req, res) => {
//     try {
//         const game = await Game.findById(req.params.gameId);
//         if (!game) {
//             return res.status(404).send('Game not found');
//         }
//         res.json(game);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// //end game manually

// router.post('/:gameId/end', checkJwtToken, async (req, res) => {
//     try {
//         const game = await Game.findById(req.params.gameId);
//         if (!game) {
//             return res.status(404).send('Game not found');
//         }

//         game.status = 'ended';
//         await game.save();
//         res.json(game);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// module.exports = router;
