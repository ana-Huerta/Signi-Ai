const mongoose = require("mongoose");

const otherSchema = new mongoose.Schema({
    entrada: {type: String, required: true},
    salida: {type: String}
});

module.exports = mongoose.model("Other", otherSchema);