const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')
const db = require('../../db/db')

router.get('/:projectId', (req, res) => {
  db.any('SELECT * from bugs_'+req.params.projectId)
  .then(bugs => {
    console.log(bugs)
    res.json(bugs);
  })
})

router.get('/', (req, res) => {
  db.any('SELECT * from bugs')
  .then(bugs => {
    console.log(bugs)
    res.json(bugs);
  })
})

router.post('/:projectId', auth, (req, res) => {
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
    'INSERT INTO bugs_'+req.params.projectId+' (assigned_to, bug_name, created_by, deadline, hours_worked, percent_complete, severity, status, summary, time_estimate, version, created_on) '
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


router.delete('/:id/:projectId', auth, (req, res) => {
  db.none('DELETE from bugs_'+req.params.projectId+' WHERE id = '+req.params.id)
  .then(t =>{
    res.send(`Deleted bug with id=${req.params.id}`);
  }).catch(error => res.status(404).send('bug id not found'))
})

router.post('/', auth, (req, res) => {
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

router.delete('/:id', auth, (req, res) => {
  db.none('DELETE from bugs WHERE id = '+req.params.id)
  .then(t =>{
    res.send(`Deleted bug with id=${req.params.id}`);
  }).catch(error => res.status(404).send('bug id not found'))
})


module.exports = router
