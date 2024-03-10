"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	stepOneVerifySchema,
	StepOneVerifySchema,
} from "utils/validation/feed.schema";
import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import { verifyRss } from "utils";
import { useAddFeed } from "store";

export const VerifyRss = ({ setStep }: { setStep: (step: 1 | 2) => void }) => {
	const [isLoading, setIsLoading] = useState(false);

	const setValidatedFeed = useAddFeed((state) => state.setValidatedFeed);
	const setUrl = useAddFeed((state) => state.setUrl);

	const form = useForm<StepOneVerifySchema>({
		resolver: zodResolver(stepOneVerifySchema),
		defaultValues: {
			url: "",
		},
	});

	const onSubmit = async (data: StepOneVerifySchema) => {
		setIsLoading(true);

		const rssSample = await verifyRss(data.url);

		if (rssSample) {
			setValidatedFeed(rssSample);
			setUrl(data.url);
			setTimeout(() => {
				setIsLoading(false);
				setStep(2);
			}, 1000);
		} else {
			setTimeout(() => {
				setIsLoading(false);
			}, 2000);
		}
	};

	return (
		<div className="w-10/12 flex flex-col items-center justify-start p-0">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-11/12 md:w-6/12  p-10 m-0 rounded-md space-y-8"
				>
					<FormField
						control={form.control}
						name="url"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Source URL</FormLabel>
								<FormDescription>
									Please enter the URL of the RSS feed you want to verify.
								</FormDescription>
								<FormControl>
									<Input placeholder="" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{isLoading ? (
						<LoadingDots />
					) : (
						<Button type="submit">Verify RSS feed</Button>
					)}
				</form>
			</Form>
		</div>
	);
};
