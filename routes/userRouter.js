const Router = require('express')
const controllers = require('../controllers/userController');

const router = new Router()

router.get('/:user', controllers.getUser)

module.exports = router