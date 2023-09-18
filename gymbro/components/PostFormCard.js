import Card from "./card";
import Avatar from "./Avatar";
import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export default function PostFormCard({ onPost }) {
  const [content, setContent] = useState();
  const supabase = useSupabaseClient();
  const session = useSession();
  const { profile } = useContext(UserContext); //I do not understand

  function createPost() {
    supabase
      .from("posts")
      .insert({ author: session.user.id, content })
      .then((response) => {
        if (!response.error) {
          setContent("");
          // Create a notification for the user
          supabase
            .from("notifications")
            .insert({
              poster_user_id: session.user.id,
              workout_content: "Someone has joined your workout",
            })
            .then(() => {
              if (onPost) {
                onPost();
              }
            })
            .catch((error) => console.error(error));
        }
      })
      .catch((error) => console.error(error));
  }
  return (
    <Card>
      <div className="flex gap-2 p-4 pb ">
        <div>
          <Avatar url={profile?.avatar} />
        </div>
        <div className="relative w-full min-w-[200px] ">
          {profile && (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-gymGreen bg-transparent px-3 py-2.5 font-sans text-sm text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gymGreen focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
            ></textarea>
          )}

          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] leading-tight text-gymGray transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gymGreen peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gymGreen peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gymGreen peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            What exercise is on your mind today, {profile?.name}?
          </label>
        </div>
      </div>
      <div className=" grow text-right mr-4 ">
        <button
          onClick={createPost}
          className="bg-gymGreen text-black px-6 py-1 rounded-md mb-6"
        >
          {" "}
          Post
        </button>
      </div>
    </Card>
  );
}
