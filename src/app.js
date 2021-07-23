const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require('mysql');
const autoloading = require("./lib/services/autoloading").autoloading;
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const path = require('path');
const dotenv = require("dotenv");
const ENV = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

dotenv.config({
  path: ENV
});

app.use(
    cors({
      origin: [`${process.env.SCHEME}://${process.env.HOST}`],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
       
    })
  );
  
  /*
  app.use(
    session({
      key: "userId",
      secret: "subscribe",
      resave: false,
      saveUnitialized: false,
      cookie: {
        expires: 60 * 60 * 24,
      }
    })
  );
*/ 
autoloading(app);

app.listen(parseInt(process.env.PORT));

/*app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`The server in ${process.env.HOSTNAME}:${process.env.PORT} is up.`);    
});*/
