import LoadingDots from "@/components/loading-dots";
import { NoData } from "@/components/no-data";
import { getRssList } from "utils";

export default async function Feed() {
	const rssList = await getRssList();

	if (!rssList || rssList.length === 0) {
		return <NoData title="Add new RSS source." />;
	}


	return (
		<div>
			<h1>Feed</h1>
		</div>
	);
}
