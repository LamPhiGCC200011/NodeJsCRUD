const express = require('express');
const mongoose = require('mongoose');
const Toy = mongoose.model('Toy');
const router = express.Router();


// router.get('/doSearch', async(req, res) => {
//     let query = Toy.find()
//     if (req.query.Name == null && req.query.Name == '') {
//         query = query.regex('Name', new RegExp('req.query.Name', 'i'))
//     }
//     try {
//         const toys = await query.exec()
//         res.render('shops/index', {
//             toys: toys,
//             searchOptions: req.query
//         })
//     } catch {
//         res.render('/')
//     }

// })
router.post('/doSearch', async(req, res) => {
    let client = await MongoClient.connect(url, {
        useUnifiedTopology: true
    });
    let db = client.db('Toy');
    let collection = db.collection('toys');
    let name = new RegExp(req.body.search);

    var condition = {
        'Name': Name
    };
    var products = await collection.find(condition).toArray();

    const template = handlebars.compile(fs.readFileSync('views/shops/index', 'utf-8'));
    const results = template({
        products3: products
    }, {
        allowProtoMethodsByDefault: false,
        allowProtoPropertiesByDefault: false
    })

    res.render('/', {
        content: results
    })
})


router.get('/', (req, res) => {
    Toy.find((err, docs) => {
        if (!err) {
            res.render("shops/index", {
                list: docs
            })
        }
    })
})


module.exports = router;