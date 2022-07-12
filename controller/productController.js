const express = require('express');
const mongoose = require('mongoose');
const Toy = mongoose.model('Toy');
const router = express.Router();

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
    let client = await MongoClient.connect(uri, {
        useUnifiedTopology: true
    });
    let db = client.db('Toy');
    let collection = db.collection('toys');

    let name = new RegExp(req.body.search);

    var condition = {
        'toys': name
    };
    var products = await collection.find(condition).toArray();

    const template = handlebars.compile(fs.readFileSync('shops/index', 'utf-8'));
    const result = template({
        toys: products
    }, {
        allowProtoMethodsByDefault: false,
        allowProtoPropertiesByDefault: false

    })

    res.render('shop/index', {
        content: result
    })

})


module.exports = router;