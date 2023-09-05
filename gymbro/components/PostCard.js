import React from "react";
import Avatar from "./Avatar";
import Card from "./card";
import Link from "next/link";
import ReactTimeAgo from "react-time-ago";

export default function PostCard({ content, created_at, profiles: profile }) {
  return (
    <Card>
      <div className="flex gap-3 p-4 ">
        <div>
          <Link href={"/profile/workouts"}>
            <span className=" cursor-pointer">
              <Avatar url={profile.avatar} />
            </span>
          </Link>
        </div>
        <div className="grow pt-3">
          <p>
            <Link href={"/profile/workouts"}>
              {" "}
              <span className="mr-1 font-semibold hover:underline cursor-pointer">
                {profile.name}
              </span>{" "}
            </Link>
            shared a{" "}
            <a className="text-gymGreen drop-shadow-[rgba(177, 242, 207, 1)]">
              {" "}
              workout
            </a>
          </p>
          <p className="text-gymGreen text-sn">
            <ReactTimeAgo date={created_at} />
          </p>
        </div>
        <div>
          <button className="text-gray-400 hover:text-gymRed">
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="pb-2">
        <p className="my-3 text-sm pl-8 pr-6">{content}</p>
        <div className="mt-5 pl-3 pb-2">
          <button className="flex gap-2 items-container hover:text-gymGreen">
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            72
          </button>
        </div>
      </div>
    </Card>
  );
}
