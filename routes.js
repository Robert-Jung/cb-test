const PersonModel = require('./models').PersonModel

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

  })
}

module.exports = appRouter
