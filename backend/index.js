const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const connectDb = require('./configs/dbConnection');

connectDb()


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/teams', require('./routes/teams'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));