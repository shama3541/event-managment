const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const router = require('./Routes/Routes');

app.use(express.json());
mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Could not connect to MongoDB", err));

app.use('/', router);
app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app;