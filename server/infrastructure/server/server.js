const express = require('express')
const passport = require('passport')
const cors = require('cors')

const mainRouter = require('../../application/routes/mainRouter')
const sessionManager = require('../middlewares/sessionManager')
// const { jsonParseErrorHandler } = require('../middlewares/errorHandling')
// const { limiTotal } = require('../middlewares/rateLimit')

const createServer = () => {
    //Creacion del servidor con express
    const app = express()
    app.use(express.json());

    //Conficuracion del cors para permitir el acceso desde otros dominios como el del cliente
    const corsOptions = {
        origin: `http://localhost:${process.env.VITE_PORT}`,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    }
    app.use(cors(corsOptions))

    //Configuracion de la sesion y passport
    app.use(sessionManager)
    app.use(passport.initialize());
    app.use(passport.session());

    // app.use(jsonParseErrorHandler)
    // app.use(limiTotal)

    //Llamado del router general
    app.use("/", mainRouter)

    return app
}

module.exports = createServer