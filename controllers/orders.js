const { PrismaClient } = require('@prisma/client')

const ordersRouter = require('express').Router()

const prisma = new PrismaClient()

ordersRouter.get('/', async (request, response) => {
    const orders = await prisma.order.findMany({})
    response.send(orders)
})

ordersRouter.post('/', async (request, response) => {
    const body = request.body
    
    if (!body .orderNumber || !body.finalPrice) {
        return response.status(400).json({
            error: 'Invalid request.'
        })
    }

    const newOrder = await prisma.order.create({
        data: {
            orderNumber: body.orderNumber,
            date: body.date,
            productAmount: body.productAmount,
            finalPrice: body.finalPrice
        }
    })

    response.send(newOrder)
})

ordersRouter.put('/:id', async (request, response) => {
    if (!request.params.id || !request.body.orderNumber) {
        return response.status(400).json({
            error: 'Invalid request.'
        })
    }

    const updateOrder = await prisma.order.update({
        where: {
            id: parseInt(request.params.id)
        },
        data: {
            orderNumber: request.body.orderNumber,
            date: request.body.date,
            productAmount: request.body.productAmount,
            finalPrice: request.body.finalPrice
        }
    })

    response.send(updateOrder)
})

ordersRouter.delete('/:id', async (request, response) => {
    if (!request.params.id) {
        return response.status(400).json({
            error: 'Invalid request.'
        })
    }

    await prisma.order.delete({
        where: {
            id: parseInt(request.params.id)
        }
    })

    response.status(204).end()
})

module.exports = ordersRouter