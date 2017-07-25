const uuid = require('uuid')
const N1qlQuery = require('couchbase').N1qlQuery
const bucket = require('./app').bucket

function PersonModel() { }

PersonModel.getAll = function(callback) {
  var statement = "SELECT " +
                  "META(person).id, person.name, person.email, " +
                  "(SELECT timestamp, message FROM `" + bucket._name + "` USE KEYS person.comments) AS comments " +
                  "FROM `" + bucket._name + "` AS person " +
                  "WHERE person.type = 'person'"

  var query = N1qlQuery.fromString(statement)

  bucket.query(query, function(error, result) {
    if(error) {
      console.log(error)
      return calback(error, null)
    }
    callback(null, result)
  })
}

PersonModel.save = function(data, callback) {
  var person = {
    name: {
      first: data.name.first,
      last: data.name.last
    },
    email: data.email,
    comments: data.comments,
    type: "person",
    timestamp: (new Date())
  }
  var id = data.id ? data.id : uuid.v4()
  bucket.upsert(id, person, function (error, result) {
    if(error) {
      return calback(error, null)
    }
    callback(null, result)
    })
}

function CommentModel() { }

module.exports.PersonModel = PersonModel
module.exports.CommentModel = CommentModel
