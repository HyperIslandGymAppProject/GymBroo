import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Layout from "../components/Layout";
import Card from "../components/card";

export default function LoginPage() {
  const supabase = useSupabaseClient();
  async function loginWithGoogle() {
    supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return (
    <Layout hideNavigation={true}>
      <div className="h-screen flex items-center">
        <div className=" place-items-auto max-w-xs mx-auto grow -mt-24">
          <h1 className="text-7xl mb-4 text-center text-gymGreen flex align-items-center pr-8">gymtop 
          <img class="transform rotate-90" width="48" height="48" src="https://img.icons8.com/material-rounded/48/b1f2cf/dumbbell.png" alt="dumbbell"/> 
          <p>a</p>
          </h1>
          <p className="flex whitespace-nowrap mb-5 text-sm ">Plan workouts with your friends and stay connected
          </p>
          <div className="flex justify-center">
            <button
              onClick={loginWithGoogle}
              className="flex w-62 h-12 gap-4 items-center text-black justify-self-center bg-white hover:bg-gymGreen py-4 px-2 rounded-md hover:text-semibold hover:scale-110"
            >
              <svg
                className="pl-2 h-6"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 488 512"
              >
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
              Login with Google
            </button>
            </div>
        </div>
      </div>
    </Layout>
  );
}
