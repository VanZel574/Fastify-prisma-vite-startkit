async function api (fastify, options) {
    fastify.get('/api', async (req, res) => {
        const productName = await fastify.prisma.meas.findUnique({
            where: {
                id: 1
            },
            select: {
                id: true,
                signature: true,
                obx: true,
                product_name: true,
                report_name: true,
                report_signature: true,
                report_obj: true,
                report_postanalysis: true,
                date: true
            }
        })
        return productName
    })
}

export default api