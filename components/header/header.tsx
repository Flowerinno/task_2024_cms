import { getServerSession } from "next-auth/next";
import { UserNav } from "../ui/nav/user-nav";
import { NavElements } from "../ui/nav/nav-elements";
import { INavLink } from "../interface/INavLink";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const navigation = [
  { key: "Home", value: "" },
  {
    key: "Dashboard",
    value: "dashboard",
    auth: true,
  },
] as INavLink[];

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            {(session && session.user && (
              <>
                <div className="flex items-center space-x-6 ">
                  <Image src="/logo.png" alt="logo" width={48} height={48} />
                </div>
                <div className="mx-6">
                  <NavElements session={session} navigationLinks={navigation} />
                </div>
                <div className="ml-auto flex items-center space-x-4">
                  <UserNav session={session} />
                </div>
              </>
            )) || (
              <>
                <div className="flex items-center space-x-6 ">
                  <Image src="/logo.png" alt="logo" width={48} height={48} />
                </div>
                <div className="mx-6 ">
                  <NavElements session={session} navigationLinks={navigation} />
                </div>
                <div className="ml-auto flex items-center space-x-4">
                  <Link href="/register" className="">
                    <Button variant="brown">Register</Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
