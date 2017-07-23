const express = require('express')
const bodyParser = require('body-parser')
const couchbase = require('couchbase')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const cluster = new couchbase.Cluster('couchbase://localhost')
const bucket = cluster.openBucket('example')
module.exports.bucket = bucket

const routes = require('./routes.js')(app)

const server = app.listen(3000, () => {
  console.log('Listening on port %s...', server.address().port)
})
