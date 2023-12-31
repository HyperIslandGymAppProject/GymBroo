import Card from "./card";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export default function NavigationCard() {
  const router = useRouter();
  const { asPath: pathname } = router;

  const session = useSession();
  const userId = session?.user?.id;
  const { profile } = useContext(UserContext);

  const activeElementClasses =
    "text-xs lg:text-md flex gap-2 lg:gap-4 py-3 bg-gymGreen text-black lg:-mx-2 px-5 lg:px-4 rounded-md shadow-gray";
  const nonActiveElementClasses =
    "text-sm lg:text-md flex gap-1 lg:gap-3 py-1 my-2 hover:bg-gymGreen hover:bg-opacity-20 lg:-mx-4 px-6 lg:px-4 rounded-md transition-all hover:scale-110 items-center";
  const supabase = useSupabaseClient();
  async function logout() {
    await supabase.auth.signOut();
  }

  return (
    <Card noPadding={true}>
      <div className="lg:py-8 py-2 px-5 justify-between text-gymGray rounded-sm flex gap-4 lg:block">
        {" "}
        <h2 className="text-gray-400 mb-3 mx-7 -my-3 hidden lg:block">
          {" "}
          Navigation{" "}
        </h2>
        <Link
          href="/"
          aria-label="Goes to home page"
          className={
            pathname === "/" ? activeElementClasses : nonActiveElementClasses
          }
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
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>{" "}
          <span className="hidden lg:block">Home</span>
        </Link>
        <Link
          href={`http://localhost:3000/profile/${userId}`}
          aria-label="Goes to profile page"
          className={
            pathname === "/profile/[id]"
              ? activeElementClasses
              : nonActiveElementClasses
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          <span className="hidden lg:block">Profile</span>
        </Link>
        {userId && (
          <Link
            href={`http://localhost:3000/community/${userId}`}
            aria-label="Goes to community page"
            className={
              pathname === "/community/[userId]"
                ? activeElementClasses
                : nonActiveElementClasses
            }
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
            </svg>{" "}
            <span className="hidden lg:block">Community</span>
          </Link>
        )}
        <Link
          href="/notifications"
          aria-label="Goes to notifications page"
          className={
            pathname === "/notifications"
              ? activeElementClasses
              : nonActiveElementClasses
          }
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
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
            />
          </svg>{" "}
          <span className="hidden lg:block">Notifications</span>
        </Link>
        <button onClick={logout} className="w-full -my-2"alt="logout from page">
          <span className={nonActiveElementClasses}>
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
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>{" "}
            <span className="hidden lg:block">Logout</span>
          </span>
        </button>
      </div>
    </Card>
  );
}
