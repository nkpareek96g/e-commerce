import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing products
  await prisma.product.deleteMany();

  // Create new products
  const products = [
    {
      name: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      price: 199.99,
      stock: 50
    },
    {
      name: "Smart Watch",
      description: "Feature-rich smartwatch with health tracking",
      price: 299.99,
      stock: 30
    },
    {
      name: "Laptop Backpack",
      description: "Water-resistant laptop backpack with multiple compartments",
      price: 79.99,
      stock: 100
    },
    {
      name: "Mechanical Keyboard",
      description: "RGB mechanical gaming keyboard with custom switches",
      price: 149.99,
      stock: 25
    },
    {
      name: "Wireless Mouse",
      description: "Ergonomic wireless mouse with precision tracking",
      price: 49.99,
      stock: 75
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    // process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 