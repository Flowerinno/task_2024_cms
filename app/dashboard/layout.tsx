import { DashboardNavigationMenu } from "@/components/ui/nav/dashboard-nav";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col h-screen ">
			<DashboardNavigationMenu />
			<div className="w-screen h-screen flex flex-col space-y-5 p-2 items-center">
				{children}
			</div>
		</div>
	);
}
