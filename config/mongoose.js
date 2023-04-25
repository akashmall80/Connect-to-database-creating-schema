const mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/new_db');

//acquire the connection
const db = mongoose.connection;


//if error occurs on connection
db.on('error',console.error.bind(console,'error on database connection'));

// if connection is successful
db.once('open',function(){
    console.log('conntection is succeful to database')
})