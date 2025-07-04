const mongoose = require('mongoose');
const uri = "mongodb+srv://lalahago14:D%40nHeng@anasaurus.uhas0fj.mongodb.net/signiai"

mongoose.connect(uri,{
    useNewUrlParser: true,                  //Analizador de URLs para MongoDB Atlas
    useUnifiedTopology: true                //tlizar nuevo sistema de manejo de conexiones
})
.then(()=> console.log("Ya me conecte"))
.catch(err => console.error("Que paso master?", err));