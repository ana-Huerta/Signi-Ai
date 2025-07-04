const express = require("express");
const router = express.Router();
const Story = require("../models/story");

//Obtener todo lo relacionado a la historia
router.get('/', async (req, res) =>{
    try{
        const stories = await Story.find();
        res.json(stories);
    } catch (err){
        res.status(500).json({message: err.message});
    }
});

//Buscar algo especifico
router.get('/search/:term', async (req, res)=>{
    try{
        const story = await Story.findOne({
            concepto: { $regex: req.params.term, $options: 'i' }
        });
        res.json(story);
    } catch (err){
        res.status(500).json({message :err.message});
    }
});

module.exports = router;