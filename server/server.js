const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const config = require('dotenv').config()

const pgp = require('pg-promise')();
var db = pgp(process.env.DATABASE_URL);
db.none('CREATE TABLE IF NOT EXISTS bugs  (id SERIAL PRIMARY KEY,  assigned_to VARCHAR(100), bug_name VARCHAR(100) UNIQUE,  created_by VARCHAR(100),  deadline VARCHAR(100),  hours_worked VARCHAR(100),  percent_complete VARCHAR(100),  severity VARCHAR(100),  status VARCHAR(100),  summary VARCHAR(100),  time_estimate VARCHAR(100),  version VARCHAR(100),  created_on DATE NOT NULL);');

const port = process.env.PORT || 5000;

const publicPath = path.join(__dirname, '../react-frontend', 'build');

app.use(express.static(publicPath));

app.get('/api/bugs', (req, res) => {
  db.any('SELECT * from bugs')
  .then(bugs => {
    console.log(bugs)
    res.json(bugs);
  })
})

app.post('/api/bugs', jsonParser, (req, res) => {
  const bug = req.body;
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
  db.one(
    'INSERT INTO bugs (assigned_to, bug_name, created_by, deadline, hours_worked, percent_complete, severity, status, summary, time_estimate, version, created_on) '
    +'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, current_timestamp) '
    +'ON CONFLICT (bug_name) DO UPDATE '
    +'SET assigned_to = $1, bug_name = $2, created_by = $3, deadline = $4, hours_worked = $5, percent_complete = $6, severity = $7, status = $8, summary = $9, time_estimate = $10, version = $11 RETURNING *;',
    values
  ).then( newBug => {
    res.json(newBug);
  })
  .catch(error => {
    console.log(error);
  })
});

app.delete('/api/bugs/:id', (req, res) => {
  db.none('DELETE from bugs WHERE id = '+req.params.id)
  .then(t =>{
    res.send(`Deleted bug with id=${req.params.id}`);
  }).catch(error => res.status(404).send('bug id not found'))
})

app.listen(port, () => {
  console.log('server running');
});
