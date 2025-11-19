import { redirect } from "next/navigation";

export default function Home() {
  // redirecting logged in user to /home url--------
  redirect("/home");
  return <></>;
}
