const Router = require('express')
const controllers = require('../controllers/searchController');

const router = new Router()

router.get('/user', controllers.getUser)

router.get('/repo', controllers.getRepo)

module.exports = router