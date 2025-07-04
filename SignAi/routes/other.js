const express = require("express");
const router = express.Router();
const Other = require("../models/other");

//Obtener todas las expresiones
router.get('/', async (req, res) =>{
    try{
        const others = await Other.find();
        res.json(others);
    } catch (err){
        res.status(500).json({message: err.message});
    }
});

//Buscar expresion en coleccion other
router.get('/search/:term', async (req, res)=>{
    try{
        const other = await Other.findOne({
            entrada: { $regex: req.params.term, $options: 'i' }
        });
        res.json(other);
    } catch (err){
        res.status(500).json({message :err.message});
    }
});

module.exports = router;