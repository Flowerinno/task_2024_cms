import React from "react";
import { Label } from "../ui/label";

export const NoData = ({ title }: { title: string }) => {
	return (
		<div className="p-10">
			<Label>{title}</Label>
		</div>
	);
};
