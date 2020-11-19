const express = require('express')
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

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

 module.exports = router;
