const express = require('express');
const mongoose = require('mongoose');
const Toy = mongoose.model('Toy');
const router = express.Router();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://lamphi:Phi01273333943@cluster0.hbmss.mongodb.net/Toy?retryWrites=true&w=majority";
const fs = require('fs');
var flash = require('connect-flash');

router.get("/", (req, res) => {
    res.render("toyshop/addOrEdit", {
        viewTitle: "Insert Employee"
    })
})

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage })

router.post("/", upload.single("ImagePath"), (req, res) => {
    if (req.body._id == "") {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
})

function insertRecord(req, res) {
    var toy = new Toy();
    toy.ToyName = req.body.ToyName;
    toy.ImagePath = req.file.filename;
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
    // Toy.findOneAndUpdate({ _id: req.body._id, }, req.body, { new: true }, (err, doc) => {
    //     if (!err) {
    //         res.redirect('toyshop/list');
    //     } else {
    //         if (err.name == "ValidationError") {
    //             res.render("toyshop/addOrEdit", {
    //                 viewTitle: 'Update Employee',
    //                 toy: req.body
    //             });
    //         } else {
    //             console.log("Error occured in Updating the records" + err);
    //         }
    //     }
    // })
    const id = req.params.id;
    const body = req.body;

    const ToyName = body.ToyName;
    const Price = body.Price;
    const Quantity = body.Quantity;
    const Description = body.Description;
    const Category = body.Category;

    const updates = {
        ToyName,
        Price,
        Quantity,
        Description,
        Category
    };

    if (req.file) {
        const ImagePath = req.file.filename;
        updates.ImagePath = ImagePath;
    }


    Toy.findOneAndUpdate(id, {
            $set: updates
        }, {
            new: true
        }).then(post => {
            res.redirect('toyshop/list');
        })
        .catch(err => {
            return req.flash('error', 'Unable to edit article');
            res.render("toyshop/addOrEdit", {
                viewTitle: 'Update Employee',
                toy: req.body
            });
        });
};

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
router.get('/detail/:id', (req, res) => {
    Toy.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.render("details/detail", {
                toy: docs
            })
        }
    })
})



router.get('/delete/:id', async(req, res) => {
    Toy.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/toyshop/list');
        } else {
            console.log("An error occured during the Delete Process" + err);
        }
    })
})


module.exports = router;