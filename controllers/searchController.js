const { generateOptions } = require('../config/util')
const https = require('https')

const getRepo = async function (req, res) {
  const queries = new URLSearchParams(req.query)
  
  const options = generateOptions(`/search/repositories?${queries.toString()}`)

  https.get(options, (apiResponse) => {
      apiResponse.pipe(res)
  }).on('error', (e) => {
      console.log(e)
      res.status(500).send(constants.error_message)
  })
}

const getUser = async function (req, res) {
  const queries = new URLSearchParams(req.query)
  
  const options = generateOptions(`/search/users?${queries.toString()}`)

  https.get(options, (apiResponse) => {
      apiResponse.pipe(res)
  }).on('error', (e) => {
      console.log(e)
      res.status(500).send(constants.error_message)
  })
}

module.exports = { getRepo, getUser }