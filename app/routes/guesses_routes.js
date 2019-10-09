const express = require('express')
const passport = require('passport')

// pull in Mongoose model for Guesse
const Guesse = require('../models/guesses')
const User = require('../models/user')
const Question = require('../models/question')
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

//index to show all guesses
router.get('/guesses',requireToken,(req,res,next) => {
    // const id = req.room.id;
    const userId = req.user.id
    // console.log(userId)
   Guesse.find({owner: userId})
   .then((guesses) => {
       
    //   console.log(user.guesses)
       res.status(200).json({guesses:guesses})
   })
   .catch(next);
    // Guesse.find()
    // .then((guesses) => res.status(200).json({guesses:guesses}))
})

router.get('/guesses/:id',requireToken,(req,res,next) =>{
    const id = req.params.id
    Guesse.findById(id)
    .then(handle404)
    .then(guesse =>{
        requireOwnership(req, guesse)
        res.status(200).json({guesse: guesse})
    })
    .catch(next)
})



//create 
router.post('/questions/:id/guesses',requireToken,(req,res,next) => {
    const newGuesse = req.body
    const uId = req.user.id
    const qId = req.params.id
    newGuesse.owner = req.user.id
    newGuesse.refrence = req.params.id
    
    Question.findById(qId)
    .then(question => {
        console.log(question.answer)
        question.answer == newGuesse.choice ? newGuesse.correct = true : newGuesse.correct = false
        return Guesse.create(newGuesse)
    })
        // .then(guesse => {
        // User.update({_id: req.user.id},{$push: {guesses:guesse._id}})
    .then(guesse => {
            // Question.findById(qId)
            // .then(question => {
            //     question.answer && guesse.choice ? guesse.correct = true : guesse.correct = false
            // })
        res.status(201).json({guesse})
    })
    .catch(next)
    // })
    // .catch(next)
    
    // newGuesse = id
    // update({$push:{guesses:newGuesse}})
    // User.findByIdAndUpdate()
    // .then(guesse => {
    //     res.status(201).json({guesse: guesse})
    // })
    // .catch(next);
})

///questions/:questions_id/guesses/:guesses_id
// router.put('/questions/:questions_id/guesses/:guesses_id',requireToken,(req,res,next) => {
//     const qId = req.params.questions_id
//     const userId = req.user.id
//     Guesse.find({refrence:qId,owner:userId})
//     .then(guesse => {
//         Question.findById(qId)
//         .then(question => {
//             question.answer && guesse.choice ? User.findById(userId)
//             .then(user => {
//                 user.score +=1
//             }):false
//         })
//     })
// })

router.delete('/guesses', requireToken,(req,res,next)=>{
    const id = req.user.id
    Guesse.deleteMany({owner: id})
    .then(guesse => {
        res.sendStatus(204)
    })
    .catch(next)
})



module.exports = router;