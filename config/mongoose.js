const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/social-devlopment');


const db = mongoose.connection;

db.on('error',function(err){
    if(err){
        console.log(err,'error in connecting to the db ');
    }
});

db.once('open',function(){
    console.log('successfully connected to the database');
})

module.exports = db;