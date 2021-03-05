const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')
const db = require('../../db/db')


router.get('/for_user', auth, (req, res) => {
  db.any('SELECT * FROM projects_users WHERE user_id = $1', req.user.id)
  .then(userProjects => {
    if (userProjects.length === 0) return res.json([])
    console.log(userProjects)
    let db_string = 'SELECT * FROM projects WHERE id IN ( '
    userProjects.forEach(up => {
      db_string +=up.project_id +","
    })
    db_string = db_string.slice(0, -1) + ")";
    console.log(db_string)
    db.any(db_string)
    .then(projects => {
      res.json(projects);
    })
    .catch(error => {
      console.log(error);
    })
  })
  .catch(error => {
    console.log(error);
  })
})

router.get('/', (req, res) => {
  db.any('SELECT * FROM projects')
  .then(projects => {
    res.json(projects);
  })
  .catch(error => {
    console.log(error);
  })
})

router.post('/', auth, (req, res) => {
  const project = req.body;
  console.log(project, req.user.id)
  const values = [
    project.name,
    project.image_name,
    project.version
  ];
  db.one(
    'INSERT INTO projects (name, image_name, version, created_on) '
    +'VALUES ($1, $2, $3, current_timestamp) RETURNING *;',
    values
  ).then(newProject => {
    console.log(newProject)
    db.none('INSERT INTO projects_users (project_id, user_id, created_on) '
    +'VALUES ($1, $2, current_timestamp)',
    [newProject.id, req.user.id]
    ).catch(error => {
      console.log(error);
    })
    db.none('CREATE TABLE IF NOT EXISTS bugs_$1 (id SERIAL PRIMARY KEY,  assigned_to VARCHAR(100), bug_name VARCHAR(100) UNIQUE,  created_by VARCHAR(100),  deadline VARCHAR(100),  hours_worked VARCHAR(100),  percent_complete VARCHAR(100),  severity VARCHAR(100),  status VARCHAR(100),  summary VARCHAR(100),  time_estimate VARCHAR(100),  version VARCHAR(100),  created_on DATE NOT NULL);', newProject.id);
    res.json(newProject);
  })
  .catch(error => {
    console.log(error);
  })
});

router.delete('/:id', auth, (req, res) => {
  db.any('DELETE from projects_users WHERE project_id = '+req.params.id+'RETURNING id')
  .then(projects_users_ids =>{
    res.send(`Deleted projects_users with ids=${project_users_ids}`);
  }).catch(error => res.status(404).send('project id not found'))

  db.none('DELETE from projects WHERE id = '+req.params.id)
  .then(t =>{
    res.send(`Deleted project with id=${req.params.id}`);
  }).catch(error => res.status(404).send('project id not found'))
})

module.exports = router
