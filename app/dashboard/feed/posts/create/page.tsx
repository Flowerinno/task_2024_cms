import CreatePost from "./CreatePost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create post | News CMS",
  description: "Create post page | News CMS",
};

export default function Page() {
  return <CreatePost />
}
