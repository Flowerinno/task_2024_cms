import SignOut from "@/components/sign-out";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Dashboard() {
	const session = await getServerSession(authOptions);

	if (!session || session?.user.role !== "ADMIN") {
		return redirect("/");
	}

	return (
		<div className="flex flex-col">
			<div className="flex flex-col space-y-5 justify-center items-center">
				put something in here
			</div>
		</div>
	);
}
