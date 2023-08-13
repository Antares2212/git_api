const mongoose = require('mongoose')
const exppress = require('express')
const cors = require('cors')

const middlewares = require('./middleware/middlewares')

const userRouter = require('./routes/userRouter')
const reposRouter = require('./routes/reposRouter')
const searchRouter = require('./routes/searchRouter')

const app = exppress()
const PORT = process.env.PORT || 5000

app.use(exppress.json())
app.use(middlewares.setHeaders)
app.use(cors())

app.use('/user', userRouter)
app.use('/repos', reposRouter)
app.use('/search', searchRouter)

const start = async () => {
  const url = 'mongodb://localhost:27017/git'

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4
    })

    app.listen(PORT, () => {
      console.log(`Сервер был запущен на порте: ${PORT}`)
    })
  } catch (err) {
    console.log(err)
  }
}

start()