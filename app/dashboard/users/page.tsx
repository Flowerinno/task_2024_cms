import { UsersTable } from "@/components/users";
import { getUsers } from "utils";

export default async function Users({
  searchParams,
}: {
  searchParams: {
    page?: number;
    email?: string;
  };
}) {
  const page = searchParams?.page ? Number(searchParams.page) : 1;
  const email = searchParams?.email ?? "";

  const { users, maxPage } = await getUsers({ page, email });

  return (
    <div className="flex flex-col h-screen w-11/12">
      <UsersTable users={users} maxPage={maxPage} page={page} email={email} />
    </div>
  );
}
