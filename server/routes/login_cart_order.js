const express = require('express');
const mysql = require('mysql');
const { check, validationResult } = require('express-validator');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const creditCardRegex = require('credit-card-regex');
const router = express.Router();
const fs = require('fs');

// create jwt token to be used as object
let userToken = {};

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

module.exports = { router, userToken };
//create jwt with user payload
const createToken = user => {
  return jwt.sign(user, 'my_secret_key', { expiresIn: 86400 * 1000 })
}


//retrieve payload from jwt
const decodeToken = (token, callback) => {
  jwt.verify(token, 'my_secret_key', callback)

}

router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//check if id exists in db
router.post('/customer/id', (req, res, next) => {
  //prevent sql injection
  var sql = 'SELECT id FROM customer where id =' + conn.escape(req.body.id);
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

//check if username exists in db
router.post('/customer/name', (req, res, next) => {
  //prevent sql injection
  var sql = 'SELECT username FROM customer where username =' + conn.escape(req.body.username);
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
//validate cutomer before login
const validateCustomer = (req, res, next) => {
  var passre = "(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}";
  var namere = "[a-zA-Z ]*";
  check('username').not().isEmpty();
  check('username').matches(namere).withMessage('Must be alphabetical characters only');
  check('password').not().isEmpty();
  check('password').matches(passre).withMessage('must contain a number');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  return next();
}
//validate customer before register
const validateNewCustomer = (req, res, next) => {
  var namere = "[a-zA-Z]*";
  check('id').not().isEmpty();
  check('id').isLength({ min: 1, max: 9 });
  check('username').not().isEmpty();
  check('username').matches(namere);
  check('email').not().isEmpty();
  check('email').isEmail();
  check('password').not().isEmpty();
  check('city').not().isEmpty();
  check('streetaddress').not().isEmpty();
  check('name').not().isEmpty();
  check('name').matches(namere);
  check('surname').not().isEmpty();
  check('surname').matches(namere);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  return next();
}


//register new customer , put payload in cookie
router.post('/register', validateNewCustomer, (req, res) => {
  var post = {
    id: req.body.id, username: req.body.username, email: req.body.email, password: req.body.password,
    city: req.body.city, streetaddress: req.body.streetaddress, name: req.body.name, surname: req.body.surname, role: req.body.role
  }
  //prevent sql injection
  conn.query(`INSERT INTO customer SET ?`, post, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send({ success: false, msg: 'Customer was not created' });
    } else {
      res.cookie('tokenid', createToken({ username: req.body.username, createdAt: new Date() }), { maxAge: 86400 * 1000 });
      res.send({ success: true, redirectToUrl: '/customer' });
    }
  });
})


//customer login
router.post('/login', validateCustomer, (req, res) => {
  //prevent sql injection
  var sql = "SELECT * FROM ?? WHERE ?? = ? and ?? =?  ";
  var username = req.body.username;
  var password = req.body.password;
  var inserts = ['customer', 'username', username, 'password', password]
  sql = mysql.format(sql, inserts)
  conn.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(rows);

      var isAuthenticated = rows.length > 0;
      if (isAuthenticated) {
        const data = JSON.stringify(rows);
        if (rows[0].role === "customer") {
          res.cookie('tokenid', createToken({ username: rows[0].username }), { maxAge: 86400 * 1000 })
          console.log(createToken({ username: rows[0].username }), { maxAge: 86400 * 1000 });
          res.status(200).send({ success: true, role: rows[0].role, toUrl: '/customer' });
        }
        else if (rows[0].role === "manager") {
          console.log(createToken({ username: rows[0].username }), { maxAge: 86400 * 1000 });

          res.cookie('tokenid', createToken({ username: rows[0].username }), { maxAge: 86400 * 1000 })
          res.status(200).send({ success: true, role: rows[0].role, toUrl: '/admin' });
        }
      } else {
        return res.status(401).send({ success: false, msg: 'Customer not found, please register first !' })

      }
    }

  });

})

//router middleware to verify and create token
router.use((req, res, next) => {
  let userName = '';
  userToken.username = '';
  if (req.cookies.tokenid) {
    decodeToken(req.cookies.tokenid, (err, decoded) => {
      if (err) {
        console.log(err)
      } else {
        userToken.username = decoded.username;
        userToken.createdAt = decoded.createdAt;
        userName = userToken.username;
        res.cookie('tokenid', req.cookies.tokenid, { maxAge: 86400 * 1000 })
      }
    });
  }
  next();
});


router.use(['/customer', '/admin'], (req, res, next) => {
  if (!userToken.username) {
    res.redirect('/login');
    return;
  }
  next();
});

router.use((req, res, next) => {
  userName = userToken.username;
  next();
});

//get customer details
router.get('/user', (req, res) => {
  var sql = 'SELECT * FROM customer WHERE username =' + conn.escape(userName);
  conn.query(sql, (err, rows) => {
    if (err || !rows[0].username) {
      console.log(err);
      res.status(500).send(err);
    }
    else {
      let user = rows[0];
      delete user.password;
      user.isNew = userToken.createdAt ? true : false;
      console.log(user);
      res.send(user);

    }
  })
});


//insert products and amount into cart, get cart details and update the cart
router.post('/addToCart', (req, res) => {

  var code = req.body.code;
  var amount = req.body.amount;

  var post = { customer_name: userName, product_id: code, amount: amount }
  //prevent sql injection

  conn.query(`INSERT INTO cart SET?`, post, (err, result) => {
    if (!err) {
      getCart(res);
    } else {
      updateCart(res, { code, amount });
    }
  })
})



//get cart data from logged in customer
router.get('/getCart', (req, res) => {
  var sql = "SELECT image,products.name, amount, price,code, details , amount * price AS total FROM cart INNER JOIN products ON code = cart.product_id WHERE cart.customer_name = '" + userName + "'";
  conn.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows)
    }
  })
})


//get cart, join tables to display cart to client
function getCart(res) {
  var sql = "SELECT image,products.name, amount, price,code, details , amount * price AS total  FROM cart INNER JOIN products ON code = cart.product_id WHERE cart.customer_name= '" + userName + "'";
  conn.query(sql, (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(rows);
      res.send(rows);
    }
  });
}
//update cart when adding new item
function updateCart(res, { code, amount }) {

  var sql = `UPDATE cart SET amount= '${amount}'  WHERE product_id ='${code}' AND customer_name ='${userName}'`;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      getCart(res);
    }
  })
}
//delete one item from list
router.delete('/deleteCartItem/:code', (req, res) => {

  var sql = `DELETE FROM cart WHERE product_id ='${req.params.code}' AND customer_name ='${userName}'`;
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      getCart(res)
    }
  });
})
// update amount of an item in cart
router.put('/updateCart', (req, res) => {
  var amount = req.body.amount;
  var code = conn.escape(req.body.code);
  var userName = conn.escape(userToken.username);
  var sql = `UPDATE cart SET amount=${amount}  WHERE product_id ='${code}' AND customer_name ='${userName}'`;
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      getCart(res);
    }
  })
})

//delete cart and then call get cart on callback to empty cart for client display
function emptyCart(errCallback, successCallback) {
  var userName = conn.escape(userToken.username);
  var sql = `DELETE FROM cart WHERE customer_name ='${userName}'`;
  conn.query(sql, (err, data) => {
    if (err && typeof errCallback == "function") {
      errCallback(err);
    }
    else if (!err && typeof successCallback == "function") {
      successCallback(data);
    }
  });
}


router.delete('/deleteCart', (req, res) => {
  emptyCart(
    err => res.status(500).send(err),
    () => getCart(res)
  );
});


//get list of cities for address
router.get('/cities', (req, res) => {
  conn.query(`SELECT * FROM cities ORDER BY name`, (err, cities) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    else {
      console.log(cities)
      res.send(cities);
    }
  });
});

//get city of customer
router.get('/customercity/:username', (req, res) => {
  conn.query(`SELECT cities.name,cities.value FROM cities
    INNER JOIN customer ON customer.city =cities.value WHERE username ='${userName}'`, (err, city) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    else {
      console.log(city);
      res.send(city)
    }
  })
})


//get name and street address of customer
router.get('/customer/:username', (req, res) => {

  conn.query(`SELECT * FROM customer where username = '${userName}'`, (err, customerdetails) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    else {
      console.log(customerdetails);
      res.send(customerdetails)
    }
  })
})
//get unavailable dates
router.get('/getUnavailableDates', (req, res, next) => {
  conn.query(`SELECT DATE_FORMAT(delivery_date,'%Y-%m-%d')delivery_date FROM orders WHERE delivery_date> CURDATE() GROUP BY delivery_date HAVING COUNT(delivery_date)>2`, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    else {
      console.log(rows);
      return res.send(rows);

    }
  })
});
// validate address , dates and credit card
const validateOrder = (req, res, next) => {
  var pattern = /^\d{4}-\d{2}-\d{2}$/;
  check('city').not().isEmpty();
 check('street').not().isEmpty();
 check('creditcard').not().isEmpty();
  check('deliverydate').not().isEmpty();
  check('deliverydate').matches(pattern);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  return next();

}

const ValidateCreditCardNumber = (req, res, next) => {

  var ccNum = req.body.creditcard.value;
  var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
  var amexpRegEx = /^(?:3[47][0-9]{13})$/;
  var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
  var isValid = false;

  if (visaRegEx.test(ccNum)) {
    isValid = true;
  } else if (mastercardRegEx.test(ccNum)) {
    isValid = true;
  } else if (amexpRegEx.test(ccNum)) {
    isValid = true;
  } else if (discovRegEx.test(ccNum)) {
    isValid = true;
  }

  if (isValid) {
    return res.send("Thank You!");
  }
  return next();
}

router.use((req, res, next) => {
  userName = userToken.username;
  next();
});

//insert new order
router.post('/placeOrder', validateOrder, ValidateCreditCardNumber, (req, res, next) => {

  var city = req.body.city;
  var street = req.body.street;
  var deliverydate = req.body.deliverydate;
  var order_date = req.body.order_date;
  var creditcard = req.body.creditcard;
  var cvv = req.body.cvv;
  var expirationdate = req.body.expirationdate;
  var userName = userToken.username;

  var sql = "INSERT INTO orders(customer_name,city,street,delivery_date,order_date,creditcard,cvv,expirationdate) VALUES ('" + userName + "','" + city + "','" + street + "','" + deliverydate + "',NOW(),'" + creditcard + "','" + cvv + "','" + expirationdate + "')"
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      insertIntoOrdersProducts(res);// insert into new table to join cart
    }
  })
})

function insertIntoOrdersProducts(res) {
  var sql = `INSERT INTO orders_products(order_id,product_id,amount,customer_name)
         SELECT o.id_order, c.product_id, c.amount, c.customer_name FROM orders as o
        left outer join cart as c ON c.customer_name =o.customer_name WHERE c.customer_name='${userName}' `
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send({ success: true })
    }
  })
}

//get last order customer details

router.get('/lastOrderCustomer', (req, res) => {
  var sql = `SELECT orders.customer_name,orders.city,orders.street, DATE_FORMAT(delivery_date, '%Y-%m-%d')delivery_date,
    DATE_FORMAT(order_date, '%Y-%m-%d')order_date,creditcard,cvv,expirationdate FROM orders_products
     INNER JOIN orders ON orders.id_order = orders_products.order_id ORDER BY orders.id_order DESC LIMIT 1 `
  conn.query(sql, (err, rows) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.send(rows)
    }
  })
})

//get last order products

router.get('/lastOrderProducts', (req, res) => {

  getLastOrderProducts(res)
});
function getLastOrderProducts(res) {

  var sql1 = `SELECT orders.id_order FROM orders_products
    INNER JOIN orders ON orders.id_order = orders_products.order_id ORDER BY orders.id_order DESC LIMIT 1 `
  conn.query(sql1, (err, order) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      orders = order[0];

      var sql2 = `SELECT p.code, op.amount, p.name, p.price, p.code,op.amount * p.price as total FROM orders_products op
          INNER JOIN products p ON p.code =op.product_id WHERE op.order_id=${orders.id_order}`;
      conn.query(sql2, (err, rows) => {
        if (err) {
          res.status(500).send(err);
        }
        else {
          console.log(rows);
          res.send(rows);
        }
      })
    }
  })
}

//empty cart after session
router.delete('/deleteCartafterReciept', (req, res) => {
  emptyCart(
    err => res.status(500).send(err),
    () => res.send({ success: true })
  );
});


//get All Orders
router.get('/allOrders', (req, res) => {
  var sql = `SELECT count(id_order)count FROM orders`;
  conn.query(sql, (err, count) => {
    if (err) {
      console.log(err)
    }
    else {
      res.send(count[0])
    }
  })
})
//customer logout
router.get('/logout', (req, res, next) => {
  res.cookie('token', '', { expires: new Date(1), path: '/' });
  console.log('logging out')
  res.send('logged out');
});
