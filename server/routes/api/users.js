const express = require('express')
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

const db = require('../../db/db')

// @route POST /api/users
router.post('/', (req, res) => {
  console.log("/api/users reached");
  let { name, email, password } = req.body;
  if (!name || !email || !password){
    return res.status(400).json({msg: 'Please enter all fields'});
  }

  console.log("checking database for user");
  db.any('SELECT * FROM users WHERE email = $1', email)
  .then(users => {
    console.log("found user: ", users);
    if(users.length !== 0) return res.status(400).json({msg: 'User already exists'});

    //Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        password = hash;
        db.one('INSERT INTO users(name, email, password, created_on) VALUES($1, $2, $3, current_timestamp) RETURNING *',[name, email, password])
        .then(user => {
          console.log("inserted user ", user);

          jwt.sign(
            {id: user.id},
            process.env.myjwtSecret,
            {expiresIn: 3600},

            (err, token) => {
              if(err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              })
            }
          )
        })
      })
    })
  })
});

router.get("/", (req, res) => {
  console.log("get /api/users reached");

  console.log("checking database for users");
  db.any('SELECT * FROM users')
  .then(users => {
    users = users.map(user => {
      delete user.password;
      return user;
    })
    console.log("get users:", users)
    res.json(users)
  })
})

router.patch('/', auth, (req, res) => {
  let { email, password, name } = req.body;
  if (!email || !password || !name){
    return res.status(400).json({msg: 'Please enter all fields'});
  }

  console.log("checking database for email");
  db.any('SELECT * FROM users WHERE email = $1', email)
  .then(emailUsers => {
    console.log("found user: ", emailUsers);
    if(emailUsers.length !== 0) return res.status(400).json({msg: 'Email already in use'});

    console.log("checking database for user");
    db.any('SELECT * FROM users WHERE id = $1', req.user.id)
    .then(users => {
      console.log("found user: ", users);
      if(users.length === 0) return res.status(400).json({msg: 'User does not exists'});

      console.log("checking password")
      bcrypt.compare(password, users[0].password)
      .then(isMatch => {
        if(!isMatch) return res.status(400).json({msg: "Invalid credentials"})
        var updateString = 'UPDATE users SET name = $1, email = $2 where id = $3 RETURNING *';
        db.one(updateString, [name, email, req.user.id])
        .then( updatedUser => {
          delete updatedUser.password
          console.log("updatedUser:",updatedUser)
          res.json(updatedUser);
        })
        .catch(error => {
          console.log(error);
          return res.status(500).json({msg: "Error updating user in database"})
        })
      })
    })
  })
});

 module.exports = router;
