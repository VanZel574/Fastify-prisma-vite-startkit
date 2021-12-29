async function api (fastify, options) {
    fastify.get('/api', async (req, res) => {
        const userList = await fastify.prisma.user.findMany()
        return userList
    })
}

module.exports = api