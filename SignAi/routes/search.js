const express = require("express");
const router = express.Router();
const axios = require("axios");

// Importar los modelos de MongoDB
const Expression = require("../models/expressions");
const Functionality = require("../models/functionality");
const Other = require("../models/other");
const Story = require("../models/story");

// Función para normalizar texto: minúsculas y sin tildes
function normalize(text) {
  return text
  .normalize("NFD")
  .replace(/(?!\u0303)[\u0300-\u036f]/g, "") //no elimina ~ de la ñ
  .normalize("NFC")
  .toLowerCase();
}

// Ruta principal de búsqueda
router.get("/", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ message: "Escriba una duda" });
  }

  const low = normalize(query);
  let collection = [];

  // Determinar a qué colección buscar
  const expressionKeys = ["como se hace", "como es", "como hacer", "como se dice", "expresion", "letra", "ñ", "n"].map(normalize);
  const functionalityKeys = ["como funciona", "que hace", "funcionamiento"].map(normalize);
  const storyKeys = ["que es", "lsm", "lenguaje", "historia", "mexicano"].map(normalize);
  const otherKeys = ["hola", "adios", "gracias por", "quien eres"].map(normalize);

  console.log("Texto normalizado:", low);
  console.log("Coincide con alguna palabra clave:", expressionKeys.some(k => low.includes(k)));


if (expressionKeys.some(k => low.includes(k))) {
  collection = ["expression"];
} else if (functionalityKeys.some(k => low.includes(k))) {
  collection = ["functionality"];
} else if (storyKeys.some(k => low.includes(k))) {
  collection = ["story"];
} else if (otherKeys.some(k => low.includes(k))) {
  collection = ["other"];
}


  try {
    const result = {};

    for (const col of collection) {
      let model;

      switch (col) {
        case "expression":
          model = Expression;
          break;

        case "functionality":
          model = Functionality;
          break;

        case "story":
          model = Story;
          break;

        case "other":
          model = Other;
          break;
      }

      if (col === "expression") {
        data = await model.findOne({
          $or: [
            { expresion: { $regex: query, $options: "i" } }
          ]
        });
      } else {
        data = await model.findOne({ $text: { $search: query } });
      }

      if (data) {
        result[col] = data;
      }

      console.log("Que busca: ", low);
      console.log("Buscando en:", col);
      console.log("Resultado:", data);
    }

    if (Object.keys(result).length === 0) {
      return res.status(404).json({ message: "No se encontró nada relacionado con tu pregunta." });
    }

    res.json(result);

    //Guardar en el historial
    await axios.post('http://localhost:2414/chat/historial', {
      mensaje: query,
      respuesta: JSON.stringify(result, null, 2)
    });



  } catch (err) {
    console.error("Error searching:", err);
    res.status(500).json({ message: "Error interno del servidor al buscar." });
  }
});



module.exports = router;
