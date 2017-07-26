const PersonModel = require('./models').PersonModel
const CommentModel = require('./models').CommentModel

var appRouter = function(app) {

  app.get('/person', (req, res) => {
    PersonModel.getAll(function(error, result) {
      if(error) {
        return res.status(400).send(error)
      }
      res.send(result)
    })
  })

  app.get('/person/:id', (req, res) => {
    PersonModel.getById(req.params, function(error, result) {
      if(error) {
        return res.status(400).send(error)
      }
      res.send(result)
    })
  })

  app.post('/person', (req, res) => {
    PersonModel.save(req.body, function(error, result) {
      if(error) {
        return res.status(400).send(error)
      }
      res.send(result)
    })
  })

  app.post('/comment', (req, res) => {
    CommentModel.create(req.body, function(error, comment) {
      if(error) {
        return res.status(400).send(error)
      }
      PersonModel.getById(req.body, function(error, person){
        if(error) {
          return res.status(400).send(error)
        }
        if(!person.comments) {
          person.comments = []
        }
        person.comments.push(comment.id)
        person.id = req.body.id
        PersonModel.save(person, function (error, results) {
          if(error) {
            return res.status(400).send(error)
          }
          res.send(person)
          })
      })
    })
  })
}
module.exports = appRouter
