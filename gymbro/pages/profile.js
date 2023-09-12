import Avatar from "../components/Avatar";
import Card from "../components/card";
import ProfileTabs from "../components/ProfileTabs";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import ProfileContent from "../components/ProfileContent";
import { UserContextProvider } from "../contexts/UserContext";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const router = useRouter();
  const session = useSession();
  const userId = router.query.id;
  const tab = router?.query?.tab?.[0] || "workouts";

  const supabase = useSupabaseClient();

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetchUser();
  }, [userId]);

  function fetchUser() {
    supabase
      .from("profiles")
      .select()
      .eq("id", userId)
      .then((result) => {
        if (result.error) {
          throw result.error;
        }
        if (result.data) {
          setProfile(result.data[0]);
        }
      });
  }
  function saveProfile() {
    supabase
      .from("profiles")
      .update({ name, place })
      .eq("id", session.user.id)
      .then((result) => {
        if (!result.error) {
          setProfile((prev) => ({ ...prev, name, place }));
        }
        setEditMode(false);
      });
  }

  const isMyUser = userId === session?.user?.id;

  console.log(isMyUser, userId, session?.user?.id);

  return (
    <Layout>
      <UserContextProvider>
        <Card>
          <div className="flex flex-col py-4">
            {" "}
            <div className="flex justify-center">
              {profile && (
                <Avatar
                  url={profile.avatar}
                  editable={isMyUser}
                  onChange={fetchUser}
                  size={"lg"}
                />
              )}
            </div>
            <div className="flex justify-center text-xl">
              {editMode && (
                <div>
                  <input
                    type="text"
                    className="border text-black py-2 px-3 rounded-md"
                    placeholder="Your name"
                    onChange={(ev) => setName(ev.target.value)}
                    value={name}
                  />
                </div>
              )}
              {!editMode && (
                <h1 className="text-3XL font-bold"> {profile?.name}</h1>
              )}
            </div>
            {!editMode && (
              <div className="leading-4 flex justify-center p">
                {profile?.place || "Sweden"}
              </div>
            )}
            {editMode && (
              <input
                type="text"
                className="border text-black py-2 px-3 rounded-md mt-1"
                placeholder="Your location"
                onChange={(ev) => setPlace(ev.target.value)}
                value={place}
              />
            )}
            <div className="flex justify-center">
              {isMyUser && !editMode && (
                <button
                  onClick={() => {
                    setEditMode(true);
                    setName(profile.name);
                    setPlace(profile.place);
                  }}
                  className=""
                  alt="change profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
              )}
            </div>
            {isMyUser && editMode && (
              <button onClick={saveProfile} className="" alt="change profile">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 m-20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
                  />
                </svg>
              </button>
            )}
          </div>
          <ProfileTabs active={tab} userId={profile?.id} />
        </Card>{" "}
        <ProfileContent activeTab={tab} userId={userId} />
      </UserContextProvider>
    </Layout>
  );
}
