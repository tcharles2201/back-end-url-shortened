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
const port = 8125;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
       
    })
  );
  
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
 
autoloading(app);

app.listen(port);

/*app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`The server in ${process.env.HOSTNAME}:${process.env.PORT} is up.`);    
});*/
