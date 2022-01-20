const express = require('express');
const models = require("../models");
const checkTokenAuth = require("../checkTokenAuth");
const bcrypt = require("bcrypt");
require('dotenv').config();


var router = express.Router();

//GET ALL USERS
router.use('/users', checkTokenAuth, (req, res, next) => {
    console.log(req.user);
    next();
});

router.get('/users', (req, res) => {
    try {
        const filtersHeader = req.headers.filters;
        models.User.find(JSON.parse(filtersHeader), function (err, users) {
            if (err) {
                res.json(err.message)
                return console.log(err);
            }
            res.json(
                users
            );
        })
    } catch (error) {

    }
});

//ADD USER
router.use('/addUser', checkTokenAuth, (req, res, next) => {
    if (req.user.rol == 'admin') {
        console.log(req.user);
        next();
    }
    else {
        res.json({ info: 'el usuario no es administrador' })
    }
});

router.post('/addUser', (req, res) => {
    console.log(req.user);
    req.body.password = bcrypt.hashSync(req.body.password, 10);
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