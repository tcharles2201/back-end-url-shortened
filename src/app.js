const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const autoloading = require("./lib/services/autoloading").autoloading;
// Init express
const app = express();

// Import connection
const db = require("./db/db-connection"); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Testing database connection 
try {
    db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
 


autoloading(app);

app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`The server in ${process.env.HOSTNAME}:${process.env.PORT} is up.`);    
});







