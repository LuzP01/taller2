const mongoose = require('mongoose');
const { Schema } = mongoose;

const Tarea = new Schema({
    tittle: String,
    description: String
});

module.exports = mongoose.model('Tarea', Tarea);