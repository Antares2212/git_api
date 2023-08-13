const Router = require('express')
const controllers = require('../controllers/reposController');

const router = new Router()

router.get('/:user/:reponame', controllers.getRepo)

router.get('/save/:user/:reponame', controllers.saveRepo)

router.get('/saved', controllers.getSavedRepo)

router.delete('/saved/delete/:id', controllers.daleteSaveRepo)

module.exports = router