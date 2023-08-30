import NavigationCard from "../components/NavigationCard";
import Card from "../components/card";
import PostFormCard from "../components/PostFormCard";
import PostCard from "../components/PostCard";

export default function Home() {
  return (
    <div className="flex mt-4 max-w-4xl mx-auto gap-6">
      <div className="w-3/12">
        <NavigationCard />
      </div>
      <div className="w-9/12">
        <PostFormCard />
        <PostCard />
      </div>
    </div>
  );
}
