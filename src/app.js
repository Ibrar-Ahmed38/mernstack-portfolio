require('dotenv').config({path : "./config.env"})
const express = require('express')
const app = express();
const cors = require('cors')
app.use(cors())
const port = process.env.PORT || 5000
require('./Db/Conn')
app.use(express.json())

app.use(require('./auth'))



app.get("", (req, res)=>{
    res.send("Hello from App.js")
})

app.get("/contact", (req, res)=>{
    res.cookie("apitest", 'ibrar')
    res.send("Hello from App.js")
})



app.listen(port , ()=>{
    console.log(`Server is running http://localhost:${port}`)
})
