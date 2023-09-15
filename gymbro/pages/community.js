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
  const router = useRouter();

  const userId = router.query?.userId || null;

  useEffect(() => {
    // Fetch the user's profile data from Supabase
    async function fetchUserProfile() {
      if (session?.user) {
        const { data, error } = await supabaseClient
          .from("profiles")
          .select("*")
          .eq("id", userId || session.user.id);

        if (error) {
          console.error("Error fetching user profile:", error);
        } else {
          // Set the userProfile state with the fetched data
          setProfile(data[0]);
        }
      }
    }

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
    </Layout>
  );
}
