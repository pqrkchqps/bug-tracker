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
  .catch(error => {
    console.log(error)
    return res.status(500).json({msg: "Database error in looking up users"})
  })
})

router.post('/:projectId', auth, (req, res) => {
  const bug = req.body;
  console.log("user object:", req.user)
  db.one('SELECT * from users WHERE id = '+req.user.id)
  .then(user => {
    console.log("user:", user)
    let values = [
      bug.assigned_to,
      bug.bug_name,
      user.name,
      user.id,
      bug.deadline,
      bug.hours_worked,
      Math.round(bug.hours_worked / bug.time_estimate * 100) || null,
      bug.severity,
      bug.status,
      bug.summary,
      bug.time_estimate,
      bug.version,
    ];
    var insertString = 'INSERT INTO bugs_'+req.params.projectId+' (assigned_to, bug_name, created_by, created_by_id, deadline, hours_worked, percent_complete, severity, status, summary, time_estimate, version, created_on) '
      +'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, current_timestamp) RETURNING *;'
  
    db.one('SELECT * from projects_users WHERE project_id = $1 AND user_id = $2', [req.params.projectId, req.user.id])
    .then(current_project_user => {
      if (current_project_user.add_bugs) {
        console.log("project user:", current_project_user)
  
        console.log("insertString:", insertString)
        console.log("values:", values)
        db.one(insertString, values)
        .then( newBug => {
          console.log("newbug:",newBug)
          res.json(newBug);
        })
        .catch(error => {
          console.log(error);
        })
      } else {
        return res.status(401).json({msg: "Current user doesn't have required permission"})
      }
    })
    .catch(error => {
      console.log(error)
      return res.status(401).json({msg: "User is not a member of resource"})
    })  
  })
  .catch (error => {
    console.log(error)
    return res.status(401).json({msg: "User is not logged in or unknown to system"})
  })
});

router.patch('/:projectId', auth, (req, res) => {
  const bug = req.body;
  console.log("user object:", req.user)
  let values = [
    bug.assigned_to,
    bug.bug_name,
    bug.created_by,
    bug.deadline,
    bug.hours_worked,
    Math.round(bug.hours_worked / bug.time_estimate * 100) || null,
    bug.severity,
    bug.status,
    bug.summary,
    bug.time_estimate,
    bug.version,
    bug.id
  ];
  var insertString = 'INSERT INTO bugs_'+req.params.projectId+' (assigned_to, bug_name, deadline, hours_worked, percent_complete, severity, status, summary, time_estimate, version, id, created_on) '
      +'VALUES ($1, $2, $4, $5, $6, $7, $8, $9, $10, $11, $12, current_timestamp) '
      +'ON CONFLICT (id) DO UPDATE '
      +'SET assigned_to = $1, bug_name = $2, deadline = $4, hours_worked = $5, percent_complete = $6, severity = $7, status = $8, summary = $9, time_estimate = $10, version = $11 RETURNING *;'

  db.one('SELECT * from projects_users WHERE project_id = $1 AND user_id = $2', [req.params.projectId, req.user.id])
  .then(current_project_user => {
    if (current_project_user.edit_bugs) {
      console.log("project user:", current_project_user)

      console.log("insertString:", insertString)
      console.log("values:", values)
      updateBugInDatabase(insertString, values, res)
    } else if (current_project_user.edit_own_bugs) {
      db.one('SELECT * from bugs_'+req.params.projectId+' WHERE created_by_id = $1 AND id = $2', [req.user.id, bug.id])
      .then(bug => {
        updateBugInDatabase(insertString, values, res)
      }).catch(error => {
        console.log(error)
        return res.status(401).json({msg: "Current user didn't create resource and doesn't have required permission"})
      })
    } else {
      return res.status(401).json({msg: "Current user doesn't have required permission"})
    }
  })
  .catch(error => {
    console.log(error)
    return res.status(401).json({msg: "User is not a member of resource"})
  })
});

function updateBugInDatabase(insertString, values, res){
  db.one(insertString, values)
  .then( newBug => {
    console.log("newbug:",newBug)
    res.json(newBug);
  })
  .catch(error => {
    console.log(error);
    return res.status(500).json({msg: "Error inserting bug into database"})
  })
}

router.delete('/:id/:projectId', auth, (req, res) => {
  console.log("reached delete for bug api")
  console.log("user object:", req.user)
  db.one('SELECT * from projects_users WHERE project_id = $1 AND user_id = $2', [req.params.projectId, req.user.id])
  .then(current_project_user => {
    if (current_project_user.remove_bugs) {
      console.log("project user:", current_project_user)
      db.none('DELETE from bugs_'+req.params.projectId+' WHERE id = '+req.params.id)
      .then(t =>{
        res.send(`Deleted bug with id=${req.params.id}`);
      }).catch(error => res.status(404).send('bug id not found'))
    }  else {
      return res.status(401).json({msg: "Current user doesn't have required permission"})
    }
  })
  .catch(error => {
    console.log(error)
    return res.status(401).json({msg: "User is not a member of resource"})
  })
})



module.exports = router
