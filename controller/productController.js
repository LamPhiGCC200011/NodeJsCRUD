const express = require('express');
const mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;
const Toy = mongoose.model('Toy');
const fs = require('fs');
const handlebars = require('handlebars');
require('../models/db');
const router = express.Router();
const url = "mongodb+srv://lamphi:Phi01273333943@cluster0.hbmss.mongodb.net/Toy?retryWrites=true&w=majority";

router.get('/', (req, res) => {
    Toy.find((err, docs) => {
        if (!err) {
            res.render("shops/index", {
                list: docs
            })
        }
    })
})

router.post('/doSearch', async(req, res) => {
    let client = await MongoClient.connect(url, {
        useUnifiedTopology: true
    });
    let db = client.db('Toy');
    let collection = db.collection('toys');

    let name = new RegExp(req.body.search);

    var condition = {
        'ToyName': name
    };
    var toys = await collection.find(condition).toArray();

    const template = handlebars.compile(fs.readFileSync('views/shops/index.hbs', 'utf-8'));
    const result = template({
        list: toys
    }, {
        allowProtoMethodsByDefault: false,
        allowProtoPropertiesByDefault: false

    })

    res.render('layouts/mainLayout', {
        content: result
    })

})


module.exports = router;