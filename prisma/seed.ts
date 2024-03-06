import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	const password = await hash("test", 12);
	await prisma.user.upsert({
		where: { email: "admin@gmail.com" },
		update: {},
		create: {
			email: "admin@gmail.com",
			password,
			role: "ADMIN",
		},
	});
	await prisma.user.upsert({
		where: { email: "user@gmail.com" },
		update: {},
		create: {
			email: "user@gmail.com",
			password,
			role: "USER",
		},
	});

	console.log("Seeded the database with admin and user");
}

main()
	.then(() => prisma.$disconnect())
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
