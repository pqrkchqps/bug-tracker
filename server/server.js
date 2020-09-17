const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const config = require('dotenv').config()

const pgp = require('pg-promise')();
console.log(process.env.DATABASE_URL);
var db = pgp(process.env.DATABASE_URL);

const port = process.env.PORT || 5000;

const publicPath = path.join(__dirname, '../react-frontend', 'build');

app.use(express.static(publicPath));

app.post('/api/bug', jsonParser, (req, res) => {
  console.log(req.body)
  const bug = req.body.bug;
  const values = [
    bug.assignedTo,
    bug.bugName,
    bug.createdBy,
    bug.deadline,
    bug.hoursWorked,
    bug.percentComplete,
    bug.severity,
    bug.status,
    bug.summary,
    bug.timeEstimate,
    bug.version
  ];
  db.none(
    //'INSERT INTO bugs(assignedto, bugname, createdby, deadline, hoursworked, percentcomplete, severity, status, summary, timeestimate, version, created_on) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, current_timestamp)',
    'INSERT INTO bugs(assignedto, bugname, createdby, deadline, hoursworked, percentcomplete, severity, status, summary, timeestimate, version, created_on) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, current_timestamp)',
    values
  ).then( t => {
    res.send(`Your Post request was recieved. Here is what you sent: ${req.body}`);
  })
  .catch(error => {
    console.log(error);
  })
});

app.listen(port, () => {
  console.log('server running');
});
