const express = require('express');
const bodyParser = require('body-parser')
const indexRoutes = require('./routes/index.js')
const knexfile = require('./knexfile.js')

const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = express();
app.use(urlencodedParser)
app.use(jsonParser)
const port  = 5000;

app.use('/', indexRoutes);

app.listen(port, () => {
    console.log(`App started on: ${ port }`)
})
