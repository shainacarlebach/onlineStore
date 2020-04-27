const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const path = require('path')
const fs = require('fs');
const async = require('async');

// bring in jwt object from login_cart_order
const { userToken } = require('./login_cart_order');


const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'supermarket',
    multipleStatements: true
});

conn.connect((err) => {
    if (err) {
        console.log("Cannot connect to Database" + err);
        return;
    }
    console.log('Connected');
});
// keep customer logged in system
let customerID;

module.exports = router;

router.use((req, res, next) => {
    customerID = userToken.username;
    next();
});
// get all products
router.get('/allProducts', (req, res) => {

    conn.query(`SELECT * FROM products`, (err, rows) => {
        if (err) {
            res.status(500).send(err);

        } else {
            res.send(JSON.stringify(rows));
        }

    })
});



//get  names of  product categories
router.get('/getCategory', (req, res) => {
    conn.query(`SELECT * FROM category`, (err, categories) => {
        if (err) {
            res.status(500).send(err);

        } else {
            res.send(categories);
        }
    });
});
//show products in category
router.get('/products/category/:category', (req, res) => {
    const category = req.params.category;
    conn.query(`SELECT * FROM products INNER JOIN categoriestoproducts ON code=product WHERE category =` + category,
        (err, product) => {
            if (err) {
                // res.status(500).send(err);
               console.log(err);
            } else {
                res.send(product);
            }
        }
    )
});




//get product by search text bar
router.get('/products/search/:text', (req, res) => {
    const text = req.params.text;
    conn.query(`SELECT DISTINCT code, products.name,price, details,image FROM products
  INNER JOIN categoriestoproducts ON code=product INNER JOIN category ON category.id = categoriestoproducts.category
  WHERE products.name LIKE '%${text}%' OR category.name LIKE '%${text}%'`, (err, product) => {
            if (err) {
                res.status(500).send({ message: "We don't have this product in stock" });
            } else {
                res.send(product);
            }
        })
});

//get product by code
router.get('/product/:code', (req, res) => {
    const code = req.params.code;
    var sql = `SELECT DISTINCT code FROM products  WHERE products.code =` + code
    conn.query(sql, (err, code) => {
        if (err) {
            res.status(500).send({ message: "We don't have this product in stock" });
        }
        else {

            res.send(code);
        }
    })
});
//update product by code
router.put('/updateProduct/:code', (req, res) => {
    const category = req.body.category.id;
    var return_data = {};
    var sql1 = `UPDATE products SET name ='${req.body.name}',category_id =${req.body.category.id}, details='${req.body.details}', price ='${req.body.price}',
       image ='${req.body.image}' WHERE products.code =${req.body.code}`

    var sql2 = `UPDATE categoriestoproducts SET product =${req.body.code},category = ${req.body.category.id} WHERE categoriestoproducts.product= ${req.body.code}`

    var sql3 = `SELECT * FROM products INNER JOIN categoriestoproducts ON code=product WHERE category =` + category

    async.parallel([
        function (callback) {
            conn.query(sql1, {}, (err, result) => {
                if (err) return callback(err);
                return_data.products = result;
                callback();
            });
        },
        function (callback) {
            conn.query(sql2, {}, (err, result) => {
                if (err) return callback(err);
                return_data.categoriestoproducts = result;
                callback();
            });

        },
        function (callback) {
            conn.query(sql3, {}, (err, result) => {
                if (err) return callback(err);
                return_data.rows = result;
                callback();
            });

        }
    ], function (err) {
        if (err) console.log(err);

        res.send((return_data));

    })
});

//check if code exists in db
router.post('/products/code', (req, res, next) => {
    //prevent sql injection
    var sql = 'SELECT code FROM products where code =' + conn.escape(req.body.code);
    conn.query(sql, (err, rows) => {
        if (rows.length > 0) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                console.log(rows);
                return res.send(rows);
            }
        } else {
            return res.send(null);
        }
    })
})

//insert new product
router.post('/addProduct', (req, res) => {
    var code = req.body.code;
    var name = req.body.name;
    var category_id = req.body.category.id;
    var details = req.body.details;
    var price = req.body.price;
    var image = req.body.image;
    var return_data = {};

    var sql1 = "INSERT INTO products(code,name,category_id,details,price,image)VALUES('" + code + "','" + name + "','" + category_id + "','"
        + details + "','" + price + "','" + image + "')"

    sql2 = `INSERT INTO categoriestoproducts(product, category) SELECT p.code ,p.category_id
        FROM products as p WHERE p.code =${req.body.code} LIMIT 1`

    sql3 = `SELECT category_id FROM products INNER JOIN categoriestoproducts ON products.code=categoriestoproducts.product WHERE categoriestoproducts.category =` + category_id,

        async.parallel([
            function (callback) {
                conn.query(sql1, {}, (err, result) => {
                    if (err) return callback(err);
                    return_data.products = result;
                    callback();
                });
            },
            function (callback) {
                conn.query(sql2, {}, (err, result) => {
                    if (err) return callback(err);
                    return_data.categoriestoproducts = result;
                    callback();
                });

             },
            function (callback) {
                conn.query(sql3, {}, (err, result) => {
                 if (err) return callback(err);
                 return_data.id = result;
                callback();
                });
 }],
        function (err) {
            if (err) console.log(err);
             res.send((return_data));

        })
    });



