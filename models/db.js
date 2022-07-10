const mongoose = require('mongoose');
const url = "mongodb+srv://lamphi:Phi01273333943@cluster0.hbmss.mongodb.net/Toy?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true }, (err) => {
    if (!err) { console.log("MongoDB Connection Succeeded"); } else {
        console.log("An Error Occured");
    }
})

require('./toy.model');