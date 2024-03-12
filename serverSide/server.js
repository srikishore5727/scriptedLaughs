const express = require('express');
const routes = require('./router');
const { startDatabase } = require('./db');
const cors = require('cors');
const morgan = require('morgan')
require('dotenv').config();


const app = express();
const PORT = 8000;


app.use(express.json());
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use("/prankscripts", routes);

startDatabase((err, db) => {
    if (err) {
        console.log("Error connecting to MongoDB:", err);
        return;
    }
    console.log("Connected to MongoDB");
});

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
