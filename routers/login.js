const express = require('express');
const jwt = require('jsonwebtoken');
const models = require("../models");
const bcrypt = require("bcrypt");
require('dotenv').config();

var router = express.Router();

router.post('/login', (req, res) => {
    models.User.find({}, function (err, docs) {
        if (err) return console.log(err);
        console.log(docs);
        const user = docs.find(u => { return u.email === req.body.email && bcrypt.compareSync(req.body.password, u.password) });
        if (user) {
            const token = jwt.sign({ email: user.email, rol: user.rol }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
            res.json({
                token
            });
        } else {
            res.send({error:'Username or password incorrect'});
        }
    })
});

module.exports.loginRouter = router;