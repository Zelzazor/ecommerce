import { config } from './config';
import express from 'express'
import { AppDataSource } from './database'
import session from 'express-session'
let RedisStore = require("connect-redis")(session)
import cookieParser from 'cookie-parser';

// ioredis
const Redis = require("ioredis")
let redisClient = new Redis()

AppDataSource.initialize().then(() => {
    console.log("Database connected")
}).catch(error => {
    console.log("error: ", error)
});



const app = express()
import routes from './routes'
import path from 'path';
app.set('views', path.join('views'));
app.set('view engine', 'pug');
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use('/stylesheets', express.static(path.join(path.dirname(require.resolve('bootstrap')), '../../dist/css')));
app.use('/javascripts', express.static(path.dirname(require.resolve('bootstrap'))));
console.log(path.join(path.dirname(require.resolve('bootstrap')), '../../dist/css'));


app.use(cookieParser());


app.use(session({
    store: new RedisStore({ client: redisClient }),
    name: "qid",
    secret: config.server.sessionSecret!,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: config.server.isProduction,
        maxAge: 1000 * 60 * 60 * 24 // 1 day
     }
}))

const PORT = config.server.port || 3000

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
