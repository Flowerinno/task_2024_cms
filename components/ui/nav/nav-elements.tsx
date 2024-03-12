import Link from "next/link";
import { INavLink } from "../../interface/INavLink";
import { Session } from "next-auth";

export function NavElements({
  navigationLinks,
  session,
}: {
  navigationLinks: INavLink[];
  session: Session | null;
}) {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navigationLinks.map((link: INavLink) => {
        if ((link?.admin && session?.user.role !== "ADMIN") || !session) {
          return null;
        }

        if (link?.auth && !session) {
          return null;
        }

        return (
          <Link
            key={link.key}
            href={`/${link.value}`}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {link.key}
          </Link>
        );
      })}
    </nav>
  );
}
