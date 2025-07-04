const mongoose = require("mongoose");

const functionalitySchema = new mongoose.Schema({
    concepto: {type: String, required: true},
    descripcion: {type: String}
});

module.exports = mongoose.model("Functionality", functionalitySchema);