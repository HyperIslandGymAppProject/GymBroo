import { useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import Layout from "../components/Layout";
import Card from "../components/card";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function CommunityPage() {
  const session = useSession();
  const supabaseClient = useSupabaseClient();
  const [profile, setProfile] = useState(null);
  const [users, setUsers] = useState(null);
  const router = useRouter();

  const userId = router.query?.userId || null;

  useEffect(() => {
    // Fetch the user's profile data from Supabase
    async function fetchUserProfile() {
      if (session?.user) {
        const { data, error } = await supabaseClient
          .from("profiles")
          .select("*")
          .eq("id", userId || session.user.id, "avatar", "name");

        if (error) {
          console.error("Error fetching user profile:", error);
        } else {
          // Set the userProfile state with the fetched data
          setProfile(data[0]);
        }
      }
    }

    function fetchUsers() {
      const { data } = supabaseClient
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })
        .then((result) => {
          console.log("profiles", result);
          setUsers(result.data);
        });
    }
    fetchUsers();

    fetchUserProfile();
  }, [session, supabaseClient]);

  return (
    <Layout>
      <Card>
        <div className="flex flex-col py-4">
          <div className="flex justify-center">
            {profile ? (
              <Avatar url={profile.avatar} className="bg-white" size={"lg"} />
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </Card>
      <Card>
        <div className="py-2 py-2 px-5 text-gymGray rounded-sm flex justify-center">
          MEMBERS
        </div>
        <div className="flex gap-20 justify-center">
          {users?.length > 0 &&
            users.map((user) => <Avatar url={user.avatar} key={user.id} />)}
        </div>
      </Card>
    </Layout>
  );
}
