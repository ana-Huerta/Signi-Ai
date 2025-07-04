const express = require("express");
const router = express.Router();
const Functionality = require("../models/functionality");

//Obtener todas las funcionalidades
router.get('/', async (req, res) =>{
    try{
        const functionalities = await Functionality.find();
        res.json(functionalities);
    } catch (err){
        res.status(500).json({message: err.message});
    }
});

//Buscar funcionalidad
router.get('/search/:term', async (req, res)=>{
    try{
        const functionality = await Functionality.findOne({
            concepto: { $regex: req.params.term, $options: 'i' }
        });
        res.json(functionality);
    } catch (err){
        res.status(500).json({message :err.message});
    }
});

module.exports = router;