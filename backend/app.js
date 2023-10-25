const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());

const qrcodesRoute = require('./routes/qrcodes');
app.use('/qrcodes', qrcodesRoute);

const loginRoute = require('./routes/login');
app.use('/users',loginRoute)

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
