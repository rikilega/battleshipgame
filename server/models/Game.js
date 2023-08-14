const mongoose = require('mongoose');
const { createBoard } = require('../utils/gameUtils');

const gameSchema = new mongoose.Schema({
    players: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        board: {
            type: Array,
            default: createBoard(10)  // Default board size of 10x10
        }
    }],
    currentTurn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: null
    },
    gameStatus: {
        type: String,
        enum: ['waiting', 'ongoing', 'finished'],
        default: 'waiting'
    }
});

module.exports = mongoose.model('Game', gameSchema);


