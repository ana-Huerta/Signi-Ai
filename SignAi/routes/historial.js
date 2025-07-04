const express = require("express");
const router = express.Router();
const Historial = require("../models/historial");

//Obtener el historial
router.get('/', async (req, res) =>{
    try{
        const historials = await Historial.find().sort({ fecha: -1 });
        res.json(historials);
    } catch (err){
        res.status(500).json({message: err.message});
    }
});

//Agregar al historial
router.post('/', async (req, res)=>{
    const historial = new Historial({
        mensaje: req.body.mensaje,
        respuesta: req.body.respuesta,
    });

    try{
        const newHistorial = await historial.save();
        res.status(201).json(newHistorial);
    }catch (err){
        res.status(400).json({message: err.message});
    }
});

module.exports = router;