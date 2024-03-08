import LoadingDots from "@/components/loading-dots";
import { getRssList } from "utils";

export default async function Feed() {
	const rssList = await getRssList();

	if (!rssList) {
		return <LoadingDots />;
	}
	console.log(rssList);
	
	return (
		<div>
			<h1>Feed</h1>
		</div>
	);
}
