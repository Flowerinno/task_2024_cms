import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("Started seeding");
  try {
    const password = await hash("1234", 10);
    await prisma.user.upsert({
      where: {
        email: "admin@gmail.com",
      },
      update: {},
      create: {
        email: "admin@gmail.com",
        password,
        role: "ADMIN",
      },
    });

    const users = Array.from({ length: 100 }, () => {
      const email = faker.internet.email();
      return {
        email,
        password,
        role: "USER",
      } as const;
    });

    await prisma.user.createMany({
      data: users,
    });

    await prisma.settings.create({
      data: {
        search_ads_per_page: 1,
        feed_ads_per_page: 1,
      },
    });

    console.log("Seeded the database");
  } catch (error) {
    console.error("Error seeding the database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
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
