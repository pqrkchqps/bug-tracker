const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const config = require('dotenv').config()

app.use(jsonParser)

const port = process.env.PORT || 5000;

const publicPath = path.join(__dirname, '../react-frontend', 'build');

app.use(express.static(publicPath));
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/bugs', require('./routes/api/bugs'))
app.use('/api/projects', require('./routes/api/projects'))

app.listen(port, () => {
  console.log('server running');
});
