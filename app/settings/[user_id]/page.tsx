import LoadingDots from "@/components/loading-dots";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { findUserById } from "utils";

export default async function Settings({
  params,
}: {
  params: {
    user_id: string;
  };
}) {
  const [user, setUser] = useState<Partial<User> | null>(null);

  useEffect(() => {
    findUserById({ id: params.user_id }).then((res) => {
      if (res) {
        setUser(res);
      }
    });
  }, []);

  if (!user) {
    return <LoadingDots />;
  }
}
