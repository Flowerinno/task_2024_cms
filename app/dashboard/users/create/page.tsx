"use client";

import { registerSchema, RegisterSchema } from "utils/validation/user.schema";
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
import { registerUser } from "utils";

export default function CreateUser() {
	const form = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			password: "",
			is_admin: false,
		},
	});

	async function onSubmit(values: RegisterSchema) {
		const { email, password, is_admin } = values;

		const res = await registerUser(email, password, is_admin);

		if (res) {
			form.reset();
		}
	}

	form.watch("is_admin");

	return (
		<div className="w-11/12 flex flex-col items-center justify-start p-0">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-11/12 md:w-6/12 border-2 border-gray-300 p-10 m-0 rounded-md space-y-8"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="test@gmail.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Controller
						control={form.control}
						name="is_admin"
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
										Enable admin role
									</label>
								</FormItem>
							);
						}}
					/>

					<Button type="submit">Create new user</Button>
				</form>
			</Form>
		</div>
	);
}
