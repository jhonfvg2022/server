const express = require('express');
const cors = require('cors');
require('./mongodb');
const { loginRouter } = require('./routers/login');
const { usersRouter } = require('./routers/users');
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());


app.use('/api', loginRouter, usersRouter);


app.listen(3000, () => {
    console.log('Authentication service started on port 3000');
});






