require("dotenv").config()
const express = require("express")
const app = express()
const cors = require('cors')

app.use(cors())

// app.get('/products/:id', function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// })

// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })

// Setup your Middleware and API Router here



module.exports = app;
