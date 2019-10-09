const express = require('express')
// jsonwebtoken docs: https://github.com/auth0/node-jsonwebtoken
const crypto = require('crypto')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
// bcrypt docs: https://github.com/kelektiv/node.bcrypt.js
const bcrypt = require('bcrypt')

// see above for explanation of "salting", 10 rounds is recommended
const bcryptSaltRounds = 10

// pull in error types and the logic to handle them and set status codes
const errors = require('../../lib/custom_errors')

const BadParamsError = errors.BadParamsError
const BadCredentialsError = errors.BadCredentialsError

const User = require('../models/user')
const Question = require('../models/question')

const handle404 = errors.handle404
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

//show all teams
router.get('/questions',requireToken,(req,res,next) => {
    // const id = req.room.id;
    Question.find()
   .then((questions) => {
       res.status(200).json({questions: questions})
   })
   .catch(next);

})

//create 
router.post('/questions',(req,res,next) => {
    
    const newQuestion = req.body.question
    // console.log(newQuestion);
    Question.create(newQuestion)
    .then(question => {
        res.status(201).json({question: question})
    })
    .catch(next);
})


// SHOW
// GET /examples/5a7db6c74d55bc51bdf39793
router.get('/questions/:id',requireToken, (req, res, next) => {
    const id = req.params.id
    Question.findById(id)
      .then(handle404)
      .then(question => {   
        res.status(200).json({ question: question})
      })
     
      .catch(next)
  })




  module.exports = router