import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

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
