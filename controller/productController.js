const express = require('express');
const mongoose = require('mongoose');
const Toy = mongoose.model('Toy');
const router = express.Router();


router.get('/doSearch', async(req, res) => {
    let query = Toy.find()
    if (req.query.Name == null && req.query.Name == '') {
        query = query.regex('Name', new RegExp('req.query.Name', 'i'))
    }
    try {
        const toys = await query.exec()
        res.render('shops/index', {
            toys: toys,
            searchOptions: req.query
        })
    } catch {
        res.render('/')
    }

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