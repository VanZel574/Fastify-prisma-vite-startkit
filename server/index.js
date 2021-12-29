// Require the framework and instantiate it
const prismaPlugin = require('./plugins/prisma')
const api = require('./api')


const fastify = require('fastify')({ logger: true })
const path = require('path')
const APP_DIR = path.join(__dirname, '../')


/*------------------------------
* Static files
*------------------------------*/
fastify.register(require('fastify-static'), {
    root: path.join(APP_DIR, 'frontend', 'dist')
})

/*-------------------------------
* Prisma orm
*-------------------------------*/
fastify.register(prismaPlugin)

/*-------------------------------
* Api
*-------------------------------*/
fastify.register(api)


/*-------------------------------
* Declare a route
*------------------------------*/
fastify.get('/', async (request, reply) => {
    return reply.sendFile('index.html')
})


// Run the server!
const start = async () => {
    try {
        await fastify.listen(8000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
