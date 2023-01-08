const express = require('express')
const app = express()
const Router = require('./Router/reouter')
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use('/',Router)

module.exports = app;