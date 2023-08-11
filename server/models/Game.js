// models/Game.js
const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    player1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    player2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    boardState: { type: Array, required: true },
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' }
});

module.exports = mongoose.model('Game', GameSchema);
