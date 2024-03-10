import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertProps {
	title: string;
	description: string;
	accept: string;
	cancel: string;
	callback: () => void;
}

export function Alert({
	title,
	description,
	accept,
	cancel,
	callback,
}: AlertProps) {
	return (
		<>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel aria-label="Cancel alert prompt">
						{cancel}
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={callback}
						aria-label="Accept alert prompt"
					>
						{accept}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</>
	);
}
