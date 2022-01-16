const models = require("./models");
const bcrypt = require("bcrypt");

models.User.find({}, function (err, docs) {
    if (docs.length == 0) {
        const userAdmin = new models.User(
            {
                id: 0,
                name: "admin",
                lastname: "admin",
                email: "admin@admin.com",
                phone: 0,
                group: "admin",
                password: bcrypt.hashSync("admin", 10),
                photo: "",
                rol: "admin"
            }
        )
        userAdmin.save((err, doc) => {
            if (err) {
                res.json(err.message)
                return console.log(err);
            }
            console.log(doc);           
        })
    }
})