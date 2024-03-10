"use client";

import { RssSource } from "@/components/feed";
import { NoData } from "@/components/no-data";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useRss } from "store";
import { getRssList } from "utils";

export default function Feed() {
	const { sources, setSources } = useRss((state) => state);

	useEffect(() => {
		getRssList().then((data) => {
			if (data) {
				setSources(data);
			}
		});
	}, []);

	if (!sources || sources.length === 0) {
		return <NoData title="Add new RSS source." />;
	}

	return (
		<>
			<Label>RSS sources</Label>
			<ul className="w-full flex flex-row flex-wrap items-center justify-center gap-4">
				{sources?.map((source) => (
					<RssSource key={source.id} source={source} />
				))}
			</ul>
		</>
	);
}
