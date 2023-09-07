import Link from "next/link";
import { useRouter } from "next/router";
import Avatar from "../components/Avatar";
import Card from "../components/card";
import FriendInfo from "../components/FriendInfo";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import { useState, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const router = useRouter();
  const session = useSession();
  const userId = router.query.id;
  const { asPath: pathname } = router;
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
  const isWorkouts = pathname.includes("workouts");
  const isFriends = pathname.includes("friends");

  const tabClasses =
    "flex gap-1 px-4 py-1 items-center border-b-4 border-b-gymCard";
  const activeTabClasses =
    "flex gap-1 px-4 py-1 items-center border-gymGreen border-b-4 text-gymGreen font-bold";

  const isMyUser = userId === session?.user?.id;

  console.log(isMyUser, userId, session?.user?.id);

  return (
    <Layout>
      {" "}
      <Card>
        <div className=" flex flex-col py-4">
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

            {isMyUser && editMode && (
              <button onClick={saveProfile} className="" alt="change profile">
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
                    d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="mt-10 flex gap-10">
            <Link
              href={"/profile/workouts"}
              className={isWorkouts ? activeTabClasses : tabClasses}
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
                  d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                />
              </svg>
              Workouts
            </Link>
            <Link
              href={"/profile/friends"}
              className={isFriends ? activeTabClasses : tabClasses}
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
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
              Community
            </Link>
          </div>
        </div>
      </Card>{" "}
      {isWorkouts && (
        <div>
          <PostCard />
        </div>
      )}
      {isFriends && (
        <div>
          <Card>
            <h2 className=" text-3xl mb-2 "> Members </h2>
            <div className="">
              <div className="border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className=" border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>{" "}
              <div className="border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
            </div>
          </Card>
        </div>
      )}
    </Layout>
  );
}
