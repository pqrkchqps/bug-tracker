const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')
const db = require('../../db/db')

router.get('/:projectId', (req, res) => {
  db.any('SELECT projects_users.id as project_user_id, users.id, users.name, users.email from projects_users INNER JOIN users ON users.id = projects_users.user_id WHERE project_id = $1', [req.params.projectId])
  .then(project_users => {
    console.log("project users:", project_users)
    res.json(project_users);
  })
  .catch(error => {
    console.log(error)
    return res.status(500).json({msg: "Database error in looking up project users"})
  })
})

router.post('/:projectId/add/:userId', auth, (req, res) => {
  console.log("/api/project_users/:projectId/add/:userId")
  console.log("user object:", req.user)

  db.any('SELECT * from projects_users WHERE project_id = $1 AND user_id = $2', [req.params.projectId, req.params.userId])
  .then(project_user => {
    console.log("project user:", project_user)
    if (project_user && project_user.length == 0){
      db.one('INSERT INTO projects_users (project_id, user_id, created_on) '
      +'VALUES ($1, $2, current_timestamp) RETURNING *;',  [req.params.projectId, req.params.userId])
      .then( newProjectUser => {
        console.log("newProjectUser:",newProjectUser)
        db.one('SELECT projects_users.id as project_user_id, users.id, users.name, users.email from projects_users INNER JOIN users ON users.id = projects_users.user_id WHERE projects_users.id = $1', [newProjectUser.id])
        .then(joinedProjectUser => {
          console.log("joinedProjectUser:", joinedProjectUser)
          res.json(joinedProjectUser);
        })
        .catch(error => {
          console.log(error);
        })
      })
      .catch(error => {
        console.log(error);
      })
    } else {
      res.json(null)
    }
  })
  .catch(error => {
    console.log(error)
    return res.status(401).json({msg: "User does not own resource"})
  })
});


router.delete('/:projectId/:id', auth, (req, res) => {
  console.log("reached delete for project_user api")
  console.log("user object:", req.user)
  console.log("params:", req.params)
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
})


module.exports = router
