const express = require('express');
const models = require("../models");
const checkTokenAuth = require("../checkTokenAuth");
require('dotenv').config();

var router = express.Router();

//GET ALL USERS
router.use('/users', checkTokenAuth,(req, res, next) => {
   console.log(req.user);
   next();
});

router.get('/users', (req, res) => {
    models.User.find({}, function (err, users) {
        if (err) {
            res.json(err.message)
            return console.log(err);
        }
        res.json({
            users
        });
    })
});

//ADD USER
router.use('/addUser', checkTokenAuth,(req, res, next) => {
    console.log(req.user);
    next();
 });

router.post('/addUser',  (req, res) => {    
    const newUser = new models.User(
        req.body
    )
    newUser.save((err, doc) => {
        if (err) {
            res.json(err.message)
            return console.log(err);
        }
        console.log(doc);
        res.sendStatus(200);
    })   
});

module.exports.usersRouter = router;