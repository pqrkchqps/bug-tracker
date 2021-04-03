const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')
const db = require('../../db/db')

router.get('/:projectId', (req, res) => {
  sendAllProjectUsers(req.params.projectId, res)
})

router.patch('/update/:projectId', auth, (req, res) => {
  console.log("/api/project_users/update")
  console.log("user object:", req.user)

  var permissionsById = req.body
  db.one('SELECT * from projects_users WHERE project_id = $1 AND user_id = $2', [req.params.projectId, req.user.id])
  .then(current_project_user => {
    console.log("logged in project user:", current_project_user)
    if (current_project_user.edit_users){
      console.log("edit permission present")
      for (const projectUserId in permissionsById){
        updateProjectUserInDatabaseForCurrentUser(permissionsById, projectUserId, current_project_user)
      }
      sendAllProjectUsers(req.params.projectId, res)
    } else if (current_project_user.edit_own_bugs) {
      console.log("edit own permisssion present")
      for (const projectUserId in permissionsById){
        db.one('SELECT * from projects_users WHERE id = $1 AND created_by_id = $2', [projectUserId, req.user.id])
        .then(foundProjectUser => {
          updateProjectUserInDatabaseForCurrentUser(permissionsById, projectUserId, current_project_user)
        }).catch(error => {
          console.log(error)
          //return res.status(401).json({msg: "Current user didn't create resource and doesn't have required permission"})
        })
      }
      sendAllProjectUsers(req.params.projectId, res)
    } else {
      console.log("edit permisssion not present")
      return res.status(401).json({msg: "Current user doesn't have required permission"})
    }
  })
  .catch(error => {
    console.log(error)
    return res.status(401).json({msg: "Current user not member of project"})
  })
});

function sendAllProjectUsers(projectId, res){
  db.any('SELECT projects_users.id as project_user_id, users.id, users.name, users.email, projects_users.created_by_id, projects_users.delete_project, projects_users.edit_project_page, projects_users.add_users, projects_users.remove_users, projects_users.edit_users, projects_users.edit_own_users, projects_users.add_bugs, projects_users.remove_bugs, projects_users.edit_bugs, projects_users.edit_own_bugs from projects_users INNER JOIN users ON users.id = projects_users.user_id WHERE project_id = $1', [projectId])
  .then(project_users => {
    console.log("project users:", project_users)
    return res.json(project_users);
  })
  .catch(error => {
    console.log(error)
    return res.status(500).json({msg: "Database error in looking up project users"})
  })
}

function updateProjectUserInDatabaseForCurrentUser(permissionsById, projectUserId, current_project_user){
  var updateString = 'UPDATE projects_users SET '
  var setFieldsString = ''
  for (let fieldName in permissionsById[projectUserId]){
    console.log(fieldName)
    if (current_project_user[fieldName]) {
      setFieldsString += fieldName + " = " + permissionsById[projectUserId][fieldName] + ", ";
    }
  }
  if (setFieldsString !== '') {
    setFieldsString = setFieldsString.slice(0, -2)
    updateString += setFieldsString
    updateString += " WHERE id = " + projectUserId + ";"
    console.log(updateString)
    db.none(updateString)
  }
}

router.post('/:projectId/add/:userId', auth, (req, res) => {
  console.log("/api/project_users/:projectId/add/:userId")
  console.log("user object:", req.user)

  db.one('SELECT * from projects_users WHERE project_id = $1 AND user_id = $2', [req.params.projectId, req.user.id])
  .then(current_project_user => {
    if (current_project_user.add_users) {
      db.any('SELECT * from projects_users WHERE project_id = $1 AND user_id = $2', [req.params.projectId, req.params.userId])
      .then(project_user => {
        console.log("project user:", project_user)
        if (project_user && project_user.length == 0){
          db.one('INSERT INTO projects_users (project_id, user_id, created_by_id, delete_project, edit_project_page, add_users, remove_users, edit_users, edit_own_users, add_bugs, remove_bugs, edit_bugs, edit_own_bugs, created_on) '
          +'VALUES ($1, $2, $3, false, false, false, false, false, false, true, false, false, true, current_timestamp) RETURNING *;',  [req.params.projectId, req.params.userId, req.user.id])
          .then( newProjectUser => {
            console.log("newProjectUser:",newProjectUser)
            db.one('SELECT projects_users.id as project_user_id, users.id, users.name, users.email, projects_users.created_by_id, projects_users.delete_project, projects_users.edit_project_page, projects_users.add_users, projects_users.remove_users, projects_users.edit_users, projects_users.edit_own_users, projects_users.add_bugs, projects_users.remove_bugs, projects_users.edit_bugs, projects_users.edit_own_bugs from projects_users INNER JOIN users ON users.id = projects_users.user_id WHERE projects_users.id = $1', [newProjectUser.id])
            .then(joinedProjectUser => {
              console.log("joinedProjectUser:", joinedProjectUser)
              res.json(joinedProjectUser);
            })
            .catch(error => {
              console.log(error);
              return res.status(500).json({msg: "Database error in getting new project user table join"})
            })
          })
          .catch(error => {
            console.log(error);
            return res.status(500).json({msg: "Database error inserting new user"})
          })
        } else {
          res.status(400).json({msg: "User already added to project"})
        }
      })
      .catch(error => {
        console.log(error)
        return res.status(500).json({msg: "Database error looking for duplicates"})
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


router.delete('/:projectId/:id', auth, (req, res) => {
  console.log("reached delete for project_user api")
  console.log("user object:", req.user)
  console.log("params:", req.params)

  db.one('SELECT * from projects_users WHERE project_id = $1 AND user_id = $2', [req.params.projectId, req.user.id])
  .then(current_project_user => {
    if (current_project_user.remove_users) {
      db.any('SELECT * from projects_users where project_id = '+req.params.projectId)
      .then(project_users => {
        console.log(project_users)
        if (project_users && project_users.length > 1) {
          db.none('DELETE from projects_users WHERE id = '+req.params.id)
          .then(t =>{
            console.log({id: req.params.id, msg: `Deleted project_user with id=${req.params.id}`});
            res.json({id: req.params.id, msg: `Deleted project_user with id=${req.params.id}`});
          })
          .catch(error => res.status(404).send('project_user id not found'))
        } else {
          console.log({id: null, msg:`Can't delete last project user`})
          res.json({id: null, msg:`Can't delete last project user`});
        }
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


module.exports = router
