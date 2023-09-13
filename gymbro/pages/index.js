import Layout from "../components/Layout";
import PostFormCard from "../components/PostFormCard";
import PostCard from "../components/PostCard";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import LoginPage from "./login";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Home() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const { profile } = useContext(UserContext);

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!session) {
      return;
    }

    async function fetchPostsByFriends(userId) {
      try {
        // Fetch the list of friend IDs for the user
        const friendIds = await getFriendsIds(userId);

        // Fetch posts created by friends
        const { data, error } = await supabase
          .from("posts")
          .select("id, content, created_at, profiles(id, avatar, name)")
          .eq("profiles.id", friendIds);

        if (error) {
          console.error("Error fetching posts:", error);
          setError(error.message); // Set the error message
          return;
        }

        setPosts(data || []); // Use an empty array if data is undefined
      } catch (error) {
        console.error("Error:", error);
        setError(error.message); // Set the error message
      }
    }

    // Fetch posts when the component mounts
    fetchPostsByFriends(session.user.id);
  }, [session]);

  async function getFriendsIds(userId) {
    // Implement a function to fetch and return the list of friend IDs for the user
    // This might involve querying your database or data source

    const { data, error } = await supabase
      .from("friendships")
      .select("user_id_2")
      .eq("user_id_1", userId);

    if (error) {
      console.error("Error fetching friend IDs:", error);
      return [];
    }
    // Return an array of friend IDs.
    const friendIds = data.map((row) => row.user_id_2);
    return friendIds;
  }

  if (!session) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <UserContext.Provider value={{ profile }}>
        <PostFormCard onPost={() => fetchPostsByFriends(session.user.id)} />
        {posts?.length > 0 &&
          posts.map((post) => <PostCard key={post.id} {...post} />)}
      </UserContext.Provider>
    </Layout>
  );
}
