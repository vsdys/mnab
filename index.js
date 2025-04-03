const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/articles', require('./routes/articles'));
app.use('/quiz', require('./routes/quiz'));

app.listen(5000, () => console.log('Backend running on port 5000'));