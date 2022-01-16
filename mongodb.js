const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
        require('./initialAdminUser');
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
