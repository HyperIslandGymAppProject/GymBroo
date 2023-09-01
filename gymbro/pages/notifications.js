import Layout from "../components/Layout";
import Avatar from "../components/Avatar";
import Card from "../components/card";
import Link from "next/link";

export default function NotificationsPage() {
  return (
    <Layout>
      <h1 className="text-6xl mb-4 text-gray-300">
        Notifications
      </h1>
      <Card noPadding={true}>
        <div>
          <div className="flex gap-2 items-center border-d p-4">
            <Link href="/profile">
              <Avatar />
            </Link>

            <div>
              <Link
                href="/profile"
                className="text-semibold hover:underline"
              >
                John Doe{" "}
              </Link>{" "}
              will attend your
              <Link
                href=""
                className="text-gymGreen hover:underline"
              >
                &nbsp;workout{" "}
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </Layout>
  );
}
