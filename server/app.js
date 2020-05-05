const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const login_cart_order = require('./routes/login_cart_order');
const products = require('./routes/products');
const uploadImage = require('./routes/imageUpload')

const app = express();
const root = path.join(__dirname,'../client/dist/onlineStore/')

 var corsOptions ={
  origin:'http://localhost:8080',
     credentials: true
};


app.use(cors(corsOptions));
app.options('*',cors(corsOptions));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use (express.static(root));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(products);

app.use(uploadImage);
app.use(login_cart_order.router);


//in general fall back
  app.get('/',(req, res) => {
     res.sendFile('index.html', { root })
 });

app.listen(8080,() => {
    console.log('8080 is ready')
});
