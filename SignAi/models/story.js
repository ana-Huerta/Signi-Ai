const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    concepto: {type: String, required: true},
    descripcion: {type: String}
});

module.exports = mongoose.model("Story", storySchema);