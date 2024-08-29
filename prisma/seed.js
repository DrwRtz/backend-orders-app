const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

async function main() {
    await prisma.order.createMany({
        data: [
            {
                orderNumber: "G-53144",
                date: new Date(),
                productAmount: 5,
                finalPrice: 100.50
            },
            {
                orderNumber: "A-11199",
                date: new Date(),
                productAmount: 12,
                finalPrice: 333.80
            }
        ]
    })

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })