const mongoose = require("mongoose");

const historialSchema = new mongoose.Schema({
    mensaje: {type: String, required: true},
    respuesta: {type: String},
    fecha: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Historial", historialSchema);