const express = require('express')
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

const db = require('../../db/db')

// @route POST /api/auth
router.post('/', (req, res) => {
  console.log("/api/auth reached")
  let { email, password } = req.body;
  if (!email || !password){
    return res.status(400).json({msg: 'Please enter all fields'});
  }

  console.log("checking database for user");
  db.any('SELECT * FROM users WHERE email = $1', email)
  .then(users => {
    console.log("found user: ", users);
    if(users.length === 0) return res.status(400).json({msg: 'User does not exists'});

    console.log("checking password")
    bcrypt.compare(password, users[0].password)
    .then(isMatch => {
      if(!isMatch) return res.status(400).json({msg: "Invalid credentials"})

      console.log("signing token")
      jwt.sign(
        {id: users[0].id},
        process.env.myjwtSecret,
        {expiresIn: 3600},

        (err, token) => {
          if(err) console.log(err);
          res.json({
            token,
            user: {
              id: users[0].id,
              name: users[0].name,
              email: users[0].email
            }
          })
        }
      )
    })
  })
});

//// @route GET /api/auth/user
router.get('/user', auth, (req,res) => {
  console.log('reached /api/auth/user')
  db.one('SELECT * FROM users WHERE id = $1', req.user.id)
  .then(user =>{
    delete user.password
    res.json(user)
  })

})

 module.exports = router;
