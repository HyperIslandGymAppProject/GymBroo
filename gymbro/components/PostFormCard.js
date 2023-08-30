import Card from "./card";
import Avatar from "./Avatar";

export default function PostFormCard() {
  return (
    <Card>
      <div className="flex gap-2 ">
        <div>
          <Avatar />
        </div>
        <textarea
          className=" grow p-3"
          placeholder={
            "whats up on your"
          }
        >
          {" "}
        </textarea>
      </div>
      <div className=" grow text-right mt-2 ">
        <button className="bg-gymGreen text-black px-6 py-1 rounded-md ">
          {" "}
          Post
        </button>
      </div>
    </Card>
  );
}
