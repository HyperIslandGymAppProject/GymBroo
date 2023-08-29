import Card from "./card";

export default function PostFormCard() {
  return (
    <Card>
      <div className="flex gap-2 ">
        <div>
          <div className=" w-12 rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2504&q=80"
              alt=""
            />
          </div>
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
