import Layout from "../components/Layout";
import PostFormCard from "../components/PostFormCard";
import PostCard from "../components/PostCard";
import { useSession } from "@supabase/auth-helpers-react";
import LoginPage from "./login";

export default function Home() {
  const session = useSession();
  console.log(session);

  if (!session) {
    return <LoginPage />;
  }
  return (
    <Layout>
      <PostFormCard />
      <PostCard />
    </Layout>
  );
}
