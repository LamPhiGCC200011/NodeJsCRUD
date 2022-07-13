require('./models/db');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const expressHandlebars = require('express-handlebars');
const toyController = require('./controller/toyController');
const productController = require('./controller/productController');
const url = "mongodb+srv://lamphi:Phi01273333943@cluster0.hbmss.mongodb.net/Toy?retryWrites=true&w=majority";
const fs = require('fs');
const handlebars = require('handlebars');

var app = express();


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static('public'))

app.use('/css', express.static(__dirname + 'public'))



app.set('views', path.join(__dirname, '/views/'))

app.engine('hbs', expressHandlebars({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))

app.set('view engine', 'hbs');

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server is listening on Port 3000");
})


app.get("/doSearch", async(req, res) => {
    let client = await MongoClient.connect(url, {
        useUnifiedTopology: true
    });
    let db = client.db('Toy');
    let collection = db.collection('toys');

    let products = await collection.find({}).toArray();


    const template = handlebars.compile(fs.readFileSync('views/shops/index.hbs', 'utf-8'));
    console.log(products);
    const result = template({
        list: products
    }, {

        allowProtoMethodsByDefault: false,
        allowProtoPropertiesByDefault: false
    })
    res.render('shops/doSearch', {
        content: result
    })
})




app.use('/', productController);

app.use('/toyshop', toyController);