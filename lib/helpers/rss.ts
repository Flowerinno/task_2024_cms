import Parser from "rss-parser";
import { FeedItem } from "./types";

const parser: Parser<FeedItem> = new Parser({
	customFields: {
		item: [
			"title",
			"link",
			"pubDate",
			"content",
			"contentSnippet",
			"isoDate",
			"id",
			"guid",
			"creator",
			"dc:creator",
		],
	},
});

export const parseRss = async (url: string) => {
	try {
		return await parser.parseURL(url);
	} catch (error) {
		throw new Error(`Error parsing RSS for ${url}`);
	}
};
