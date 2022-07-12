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


module.exports = router;