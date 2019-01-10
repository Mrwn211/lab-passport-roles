const mongoose = require('mongoose');
const User = require('../models/users');

const dbtitle = 'ibi-database';
mongoose.connect(`mongodb://localhost/${dbtitle}`);
User.collection.drop();

const users = [
  {
    username : "Tommy" ,
    password : "tommy",
    role : "BOSS" 
    
  },
  {
    username : "Arthur" ,
    password : "arthur",
    role : "DEV" 
    
  },
  {
    username : "Joe" ,
    password : "joe",
    role : "TA" 
    
  },
];

User.insertMany(users)
.then( users => {
  users.forEach( user => {
    console.log(`${user.username} added!`)
  })
  mongoose.connection.close();
})
.catch( error => {
  console.log(error)
});