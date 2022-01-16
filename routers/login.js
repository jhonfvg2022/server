const express = require('express');
const jwt = require('jsonwebtoken');
const models = require("../models")
require('dotenv').config();

var router = express.Router();

router.use('/login', (req, res) => {
    models.User.find({}, function (err, docs) {
        //if (docs.length == 0) {
        if (err) return console.log(err);
        console.log(docs);
        const user = docs.find(u => { return u.email === req.body.email });
        if (user) {
            const token = jwt.sign({ email: user.email, id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
            res.json({
                token
            });
        } else {
            res.send('Username or password incorrect');
        }
        // }
        // else {
        //     const newUser = new models.User(
        //         req.body
        //     )
        //     newUser.save((err, doc) => {
        //         if (err) {
        //             res.json(err.message)
        //             return console.log(err);
        //         }
        //         console.log(doc);
        //         res.sendStatus(200);
        //     })
        // }
    })
});

module.exports.loginRouter = router;