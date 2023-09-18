import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import Card from "./card";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import FriendInfo from "./FriendInfo";

export default function ProfileContent({ activeTab, userId }) {
  const [workouts, setWorkouts] = useState([]);
  const [profile, setProfile] = useState(null);

  const supabase = useSupabaseClient();

  useEffect(() => {
    if (!userId) {
      return;
    }

    if (activeTab === "workouts") {
      loadWorkouts().then(() => {});
    }
  }, [userId]);

  async function loadWorkouts() {
    const workouts = await userWorkouts(userId);
    const profile = await userProfile(userId);

    setWorkouts(workouts);
    setProfile(profile);

    return {
      workouts,
      profile,
    };
  }

  async function userWorkouts(userId) {
    const { data } = await supabase
      .from("posts")
      .select("id, content, author, created_at")
      .eq("author", userId)
      .order("created_at", { ascending: false });
    return data;
  }

  // async function userProfile(userId) {
  //   const { data } = await supabase.from("profiles").select().eq("id", userId);
  //   return data[0];
  // }

  async function userProfile(userId) {
    const { data } = await supabase.from("profiles").select().eq("id", userId);

    if (data && data.length > 0) {
      return data[0];
    } else {
      // Handle the case where no data is found, such as returning a default value or showing an error message.
      return null; // You can return null or another appropriate value/error handling strategy.
    }
  }

  return (
    <div>
      {activeTab === "workouts" && (
        <div>
          {workouts?.length > 0 &&
            workouts.map((workout) => (
              <PostCard
                key={workout.created_at}
                {...workout}
                profiles={profile}
              />
            ))}
        </div>
      )}

      {activeTab === "community" && (
        <Card>
          <h2 className="text-3xl mb-2">Members</h2>
          <div className="">
            <div className="border-b-gray-100 p-4 -mx-4">
              <FriendInfo />
            </div>
            <div className="border-b-gray-100 p-4 -mx-4">
              <FriendInfo />
            </div>
            <div className="border-b-gray-100 p-4 -mx-4">
              <FriendInfo />
            </div>
            <div className="border-b-gray-100 p-4 -mx-4">
              <FriendInfo />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
