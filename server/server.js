const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '../react-frontend', 'build');

const port = process.env.PORT || 5000;

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log('server running');
});
