import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const customer = await prisma.userType.upsert({
    where: { description: "customer", id: 1 },
    update: {},
    create: { description: "customer" },
  });

  const shopkeeper = await prisma.userType.upsert({
    where: { description: "shopkeeper", id: 2 },
    update: {},
    create: { description: "shopkeeper" },
  });

  await prisma.user.upsert({
    where: { id: 1},
    update: {},
    create: {
      name: "Carlos Oliveira",
      document: justNumbers("099.233.420-93"),
      email: "carlos.oliveira@email.com",
      password: await hash("123456", 10),
      user_type_id: customer.id,
      balance: 5000
    }
  });

  await prisma.user.upsert({
    where: { id: 2},
    update: {},
    create: {
      name: "Júlia Matos",
      document: justNumbers("255.185.490-32"),
      email: "julia.matos@email.com",
      password: await hash("123456", 10),
      user_type_id: customer.id,
      balance: 500
    }
  });

  await prisma.user.upsert({
    where: { id: 3},
    update: {},
    create: {
      name: "Company LTDA",
      document: justNumbers("33.998.928/0001-66"),
      email: "company@company.com",
      password: await hash("123456", 10),
      user_type_id: shopkeeper.id,
      balance: 40000
    }
  });
}

const justNumbers = (item: string): string => {
  return item.replace(/[^\d]/g, "");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
