"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addFeedSchema, AddFeedSchema } from "utils/validation/feed.schema";
import { useAddFeed, useTags } from "store";
import { FeedCreationSkeleton } from "../skeleton";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { createRssSource, getTags } from "utils";
import { Tag } from "@prisma/client";
import { SingleTag } from "../tags";

export const AddFeedForm = ({
	setStep,
}: {
	setStep: (step: 1 | 2) => void;
}) => {
	const { tags, setTags } = useTags((state) => state);
	const url = useAddFeed((state) => state.url);

	const [isSearching, setIsSearching] = useState(false);
	const [search, setSearch] = useState<Tag[] | []>([]);

	useEffect(() => {
		if (!tags.length) {
			getTags()
				.then((data) => {
					const activeOnly = data.filter((tag) => tag.is_active);
					setTags(activeOnly);
				})
				.catch(() => {
					toast.error("Failed to fetch tags");
				});
		}
	}, []);

	const validatedFeed = useAddFeed((state) => state.validated_feed);
	const includedFields = useAddFeed((state) => state.included_fields);

	const form = useForm<AddFeedSchema>({
		resolver: zodResolver(addFeedSchema),
		defaultValues: {
			name: "",
			tags: [],
			import_interval: 5,
			is_active: false,
			include_links: false,
		},
	});

	const onSubmit = async (data: AddFeedSchema) => {
		if (!includedFields.title) {
			toast.error("Select title field in the skeleton, as it's required.");
			return;
		}

		if (!url) {
			toast.error("Please verify the RSS feed first");
			setStep(1);
			return;
		}

		const payload = {
			...data,
			included_fields: includedFields,
			url,
		};

		const res = await createRssSource(payload);

		if (res?.id) {
			setTimeout(() => {
				setStep(1);
			}, 1000);
		}
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		if (!value) {
			setIsSearching(false);
			return;
		}

		setIsSearching(true);
		const filteredTags = tags.filter((tag) => tag.label.includes(value));
		setSearch(filteredTags);
	};

	return (
		<div className="w-11/12 flex flex-col items-center justify-start p-0">
			<FeedCreationSkeleton
				title="Construct the post structure for the chosen RSS source (click on skeleton fields)"
				sample={validatedFeed}
			/>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-11/12 md:w-6/12  p-10 m-0 rounded-md space-y-8"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Source name (unique identifier)</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="import_interval"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Import interval (in minutes)</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="5 minutes"
										{...field}
										onChange={(e) => {
											const value = parseInt(e.target.value);
											field.onChange(value);
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="tags"
						render={({ field: { ref } }) => (
							<FormItem>
								<FormLabel>Resource tags (max 3, add on TAB key)</FormLabel>
								<div className="flex flex-row gap-3">
									{form.getValues("tags")?.map((item, i) => (
										<Label
											className="border-[1px] border-gray-500 p-2 rounded-md cursor-pointer hover:border-red-500"
											key={i}
											onClick={() => {
												form.setValue(
													"tags",
													form.getValues("tags").filter((tag) => tag !== item)
												);
											}}
										>
											#{item}
										</Label>
									))}
								</div>
								<br />
								<FormControl>
									<Input
										id="tags_search_field"
										placeholder="Search tags..."
										onKeyDown={(e) => {
											if (e.code === "Tab") {
												e.preventDefault();
												const value = e.currentTarget.value;
												const existingTags = form.getValues("tags");

												if (
													value.length > 0 &&
													value.length < 15 &&
													existingTags.length < 3 &&
													!existingTags.includes(value) &&
													tags.find((tag) => tag.label === value)
												) {
													form.setValue("tags", [
														...form.getValues("tags"),
														value,
													]);
													e.currentTarget.value = "";
													setIsSearching(false);
												}
											}
										}}
										ref={ref}
										onChange={handleSearch}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex flex-row flex-wrap gap-2">
						{search.length > 0 &&
							isSearching &&
							search.map((tag) => {
								return (
									<div
										className="w-fit cursor-pointer"
										onClick={() => {
											const input = document.getElementById(
												"tags_search_field"
											) as HTMLInputElement;
											const existingTags = form.getValues("tags");

											if (
												existingTags.length < 3 &&
												!existingTags.includes(tag.label)
											)
												form.setValue("tags", [
													...form.getValues("tags"),
													tag.label,
												]);
											setIsSearching(false);
											input.value = "";
										}}
									>
										<SingleTag key={tag.id} tag={tag} isSearching />
									</div>
								);
							})}
					</div>

					<Controller
						control={form.control}
						name="is_active"
						render={({ field: { onChange, onBlur, value, name } }) => {
							return (
								<FormItem className="flex items-center gap-2">
									<input
										type="checkbox"
										onBlur={onBlur}
										onChange={onChange}
										checked={value}
										name={name}
										id="is_admin"
										className="accent-black"
									/>

									<label
										htmlFor="is_admin"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										style={{ padding: 0, margin: 0 }}
									>
										Activate on creation
									</label>
								</FormItem>
							);
						}}
					/>
					<Controller
						control={form.control}
						name="include_links"
						render={({ field: { onChange, onBlur, value, name } }) => {
							return (
								<FormItem className="flex items-center gap-2">
									<input
										type="checkbox"
										onBlur={onBlur}
										onChange={onChange}
										checked={value}
										name={name}
										id="include_links"
										className="accent-black"
									/>

									<label
										htmlFor="include_links"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										style={{ padding: 0, margin: 0 }}
									>
										Is linkable (The post will be clickable in the feed)
									</label>
								</FormItem>
							);
						}}
					/>

					<div className="flex flex-row gap-10">
						<Button className="w-full" type="button" onClick={() => setStep(1)}>
							Go Back
						</Button>
						<Button className="w-full" type="submit">
							Create feed source
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};
