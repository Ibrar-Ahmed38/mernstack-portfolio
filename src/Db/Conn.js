const mongoose = require('mongoose')

const db = process.env.DATABASE;
mongoose.connect(db)
.then( ()=> console.log("Databse is Connected"))
.catch( (err)=> console.log(err))