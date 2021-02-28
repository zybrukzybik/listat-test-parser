require('dotenv').config()

const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaBodyParser = require('koa-bodyparser')

const createFile = require('./utils/writeResults')
const {responseInvalid} = require('./utils/responses')
const resultsRoute = require('./controllers/results')
const dataRoute = require('./controllers/data')

const PORT = process.env.PORT || '3000'
const HOST = process.env.HOST || '127.0.0.1'

const app = new Koa()
const router = new KoaRouter()

app.use(koaBodyParser())

//  errors handler
app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        (err.message === 'invalid') ? responseInvalid(err, ctx) : console.log(err)
    }
})

router.get('/result', resultsRoute)
router.post('/data', dataRoute)

app.use(router.routes())

app.listen(PORT, HOST, async () => {
    try {
        await createFile('')
        console.log('results.txt created')
        console.log(`Server start at http://${HOST}:${PORT}`)
    } catch (err) {
        console.log(err)
        process.exit(0)
    }
})