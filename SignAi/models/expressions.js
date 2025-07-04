const mongoose = require("mongoose");

const expressionSchema = new mongoose.Schema({
    expresion: {type: String, required: true},
    como_se_hace: {type: String},
    imagen_referencia: {type: String}
});

module.exports = mongoose.model("Expression", expressionSchema);