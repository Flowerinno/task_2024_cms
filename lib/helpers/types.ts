export type FeedItem = {
	title: string;
	link: string;
	pubDate: string;
	content: string;
	contentSnippet: string;
	isoDate: string;
	id: string;
	creator: string;
	"dc:creator"?: string;
	guid: string;
};

export type CreateRssRequestInput = {
	is_active: boolean;
	name: string;
	tags: string[];
	import_interval: number;
	include_links: boolean;
	included_fields: {
		title: boolean;
		content: boolean;
		pubDate: boolean;
		creator: boolean;
	};
	url: string;
};
