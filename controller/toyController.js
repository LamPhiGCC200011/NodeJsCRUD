const express = require('express');
const mongoose = require('mongoose');
const Toy = mongoose.model('Toy');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("toyshop/addOrEdit", {
        viewTitle: "Insert Employee"
    })
})

router.post("/", (req, res) => {
    if (req.body._id == "") {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
})

function insertRecord(req, res) {
    var toy = new Toy();
    toy.ToyName = req.body.ToyName;
    toy.ImagePath = req.body.ImagePath;
    toy.Price = req.body.Price;
    toy.Quantity = req.body.Quantity;
    toy.Description = req.body.Description;
    toy.Category = req.body.Category;

    toy.save((err, doc) => {
        if (!err) {
            res.redirect('toyshop/list');
        } else {
            res.render("toyshop/addOrEdit", {
                viewTitle: "Insert Toy",
                toy: req.body
            })
        }
    })
}

function updateRecord(req, res) {
    Toy.findOneAndUpdate({ _id: req.body._id, }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('toyshop/list');
        } else {
            if (err.name == "ValidationError") {
                res.render("toyshop/addOrEdit", {
                    viewTitle: 'Update Employee',
                    toy: req.body
                });
            } else {
                console.log("Error occured in Updating the records" + err);
            }
        }
    })
}

router.get('/list', (req, res) => {
    Toy.find((err, docs) => {
        if (!err) {
            res.render("toyshop/list", {
                list: docs
            })
        }
    })
})

router.get('/:id', (req, res) => {
    Toy.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("toyshop/addOrEdit", {
                viewTitle: "Update Employee",
                toy: doc
            })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Toy.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/toyshop/list');
        } else {
            console.log("An error occured during the Delete Process" + err);
        }
    })
})


module.exports = router;