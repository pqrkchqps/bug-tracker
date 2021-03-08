const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')
const db = require('../../db/db')

router.get('/:projectId', (req, res) => {
  db.any('SELECT * from bugs_'+req.params.projectId)
  .then(bugs => {
    console.log(bugs)
    db.any('SELECT user_id from projects_users WHERE project_id = $1', [req.params.projectId])
    .then(project_users => {
      console.log("project users:", project_users)
      var project_users_array = project_users.map(i => i.user_id)
      res.json({bugs, project_users: project_users_array});
    })
    .catch(error => {
      console.log(error)
      return res.status(500).json({msg: "Database error in looking up users"})
    })
  })
})

router.post('/:projectId', auth, (req, res) => {
  const bug = req.body;
  console.log("user object:", req.user)
  let values = [
    bug.assigned_to,
    bug.bug_name,
    bug.created_by,
    bug.deadline,
    bug.hours_worked,
    bug.percent_complete,
    bug.severity,
    bug.status,
    bug.summary,
    bug.time_estimate,
    bug.version,
  ];
  var insertString = 'INSERT INTO bugs_'+req.params.projectId+' (assigned_to, bug_name, created_by, deadline, hours_worked, percent_complete, severity, status, summary, time_estimate, version, created_on) '
    +'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, current_timestamp) RETURNING *;'
  
  if (bug.id !== "null"){
    insertString = 'INSERT INTO bugs_'+req.params.projectId+' (assigned_to, bug_name, created_by, deadline, hours_worked, percent_complete, severity, status, summary, time_estimate, version, id, created_on) '
      +'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, current_timestamp) '
      +'ON CONFLICT (id) DO UPDATE '
      +'SET assigned_to = $1, bug_name = $2, created_by = $3, deadline = $4, hours_worked = $5, percent_complete = $6, severity = $7, status = $8, summary = $9, time_estimate = $10, version = $11 RETURNING *;'
    values = [...values, bug.id]
  }

  db.one('SELECT * from projects_users WHERE project_id = $1 AND user_id = $2', [req.params.projectId, req.user.id])
  .then(project_user => {
    console.log("project user:", project_user)

    console.log("insertString:", insertString)
    console.log("values:", values)
    db.one(insertString, values)
    .then( newBug => {
      console.log("newbug:",newbug)
      res.json(newBug);
    })
    .catch(error => {
      console.log(error);
    })
  })
  .catch(error => {
    console.log(error)
    return res.status(401).json({msg: "User does not own resource"})
  })
});


router.delete('/:id/:projectId', auth, (req, res) => {
  console.log("reached delete for bug api")
  console.log("user object:", req.user)
  db.one('SELECT * from projects_users WHERE project_id = $1 AND user_id = $2', [req.params.projectId, req.user.id])
  .then(project_user => {
    console.log("project user:", project_user)
    db.none('DELETE from bugs_'+req.params.projectId+' WHERE id = '+req.params.id)
    .then(t =>{
      res.send(`Deleted bug with id=${req.params.id}`);
    }).catch(error => res.status(404).send('bug id not found'))
  })
  .catch(error => {
    console.log(error)
    return res.status(401).json({msg: "User does not own resource"})
  })
})


router.delete('/:id', auth, (req, res) => {
  db.none('DELETE from bugs WHERE id = '+req.params.id)
  .then(t =>{
    res.send(`Deleted bug with id=${req.params.id}`);
  }).catch(error => res.status(404).send('bug id not found'))
})


module.exports = router
