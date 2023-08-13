const constants = require('../config/constants')
const { generateOptions } = require('../config/util')
const Repo = require('../models/repoModel')
const https = require('https')

const getRepo = async (req, res) => {
  const user = req.params.user
  const reponame = req.params.reponame
  const options = generateOptions('/repos/' + user + '/' + reponame) 

  https.get(options, apiResponse => {
      apiResponse.pipe(res)
  }).on('error', (e) => {
      console.log(e)
      res.status(500).send(constants.error_message)
  })
}

const saveRepo = async (req, res) => {
  const user = req.params.user
  const reponame = req.params.reponame
  const options = generateOptions('/repos/' + user + '/' + reponame)

  let data = ''
  https.get(options, apiResponse => {
    apiResponse.on('data', chunk => {
      data += chunk
    })
    apiResponse.on('end', async () => {
      let parseData = JSON.parse(data.toString())
      
      try {
        const candidat = await Repo.findOne({name: parseData.name})
        if (candidat) {
          if (candidat.name === reponame) {
            return res.status(400).json({message: 'Репозиторий с таким id уже Сохранен!'})
          } 
        }
    
        const repo = new Repo({
          id: parseData.id,
          name: parseData.name,
          html_url: parseData.html_url,
          description: parseData.description,
          forks: parseData.forks,
          stargazers_count: parseData.stargazers_count,
          language: parseData.language,
          open_issues: parseData.open_issues,
          owner: {
            id: parseData.owner.id,
            login: parseData.owner.login,
            avatar: parseData.owner.avatar_url,
            html_url: parseData.owner.html_url
          },
          created_at: parseData.created_at,
          updated_at: parseData.updated_at
        })

        await repo.save()
        return res.json({message: 'Репозиторий был успешно сохранен'})
      } catch (error) {
        console.log(error)
        res.status(500).send('Серверная ошибка')
      }
    })
  }).on('error', e => {
      console.log(e);
      res.status(500).send(constants.error_message);
  });
}

const getSavedRepo = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const per_page = parseInt(req.query.per_page) || 10

  try {
    const items = await Repo.find()
      .skip((page - 1) * per_page)
      .limit(per_page)
      .exec()
    
    if (items.length != 0) {
      const totlaItems = await Repo.countDocuments().exec()
      const totalPages = Math.ceil(totlaItems / per_page)

      res.json({ items, totalPages })
    } else {
      res.json({ message: 'Репозитории не найдены' })
    }
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Ошибка сервера'})
  }
}

const daleteSaveRepo = async (req, res) => {
  const id = req.params.id
  try {
    const candidate = await Repo.findOne({id: id})
    if (candidate) {
      await Repo.deleteOne({id: id})
      res.status(200).json({message: 'Репозиторий успешно удален'})
    } else {
      res.status(200).json({message: 'Репозиторий успешно удален'})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Ошибка сервера'})
  }
}

module.exports = { getRepo, saveRepo, getSavedRepo, daleteSaveRepo }