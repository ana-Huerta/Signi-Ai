const express = require("express");
const router = express.Router();
const Expression = require("../models/expressions");

//Obtener todas las expresiones
router.get('/', async (req, res) =>{
    try{
        const expressions = await Expression.find();
        res.json(expressions);
    } catch (err){
        res.status(500).json({message: err.message});
    }
});

//Buscar expresion
router.get('/search/:term', async (req, res)=>{
    try{
        const expression = await Expression.findOne({
            expresion: { $regex: req.params.term, $options: 'i' }
        });
        res.json(expression);
    } catch (err){
        res.status(500).json({message :err.message});
    }
});

module.exports = router;