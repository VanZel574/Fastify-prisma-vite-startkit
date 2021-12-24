import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const APP_DIR = path.join(__dirname, '../')


// imports esm
import Fastify from 'fastify'
import fastifyStatic from 'fastify-static'
import pointOfView from "point-of-view"
import nunjucks from 'nunjucks'
import prismaPlugin from './plugins/prisma.js'

// imports api
import api from './api/index.js'


// dev or prod
const isDev = process.env['NODE_ENV'] === 'dev'
const manifest = require('../dist/manifest.json')

// init fastify
const fastify = Fastify({
    logger: true
})

// prisma orm
fastify.register(prismaPlugin)

// template engine
fastify.register(pointOfView, {
    engine: {
        nunjucks
    }
})


//
fastify.get('/', async (req, res) => {
    return res.view('index.html', {isDev, manifest})
})

// api
fastify.register(api)

// Run the server!
const start = async () => {
    try {
        if (process.env['NODE_ENV'] === 'dev') {
            // DEVELOPMENT settings
            fastify.register(fastifyStatic, {
                root: path.join(APP_DIR, 'src'),
                prefix: '/src'
            })
        } else {
            // PRODUCTION settings
            fastify.register(fastifyStatic, {
                root: path.join(APP_DIR, 'dist'),
                prefix: '/'
            })
        }

        await fastify.listen(8000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
