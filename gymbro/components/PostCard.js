import Avatar from "./Avatar";
import Card from "./card";

export default function PostCard() {
  return (
    <Card>
      <div className="flex gap-3">
        <div>
          <Avatar />
        </div>
        <div className="grow">
          <p>
            {" "}
            <a className="font-semibold">
              John Doe
            </a>{" "}
            shared a{" "}
            <a className="text-gymGreen">
              {" "}
              workout
            </a>
          </p>
          <p className="text-gray-500 text-sn">
            2h ago
          </p>
        </div>
        <div>
          <button className="text-gray-400">
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
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>
          {/* <ClickOutHandler
            onClickOut={() => {}}
          >
            <div>dropdown menu</div>
          </ClickOutHandler> */}
        </div>
      </div>
      <div>
        <p className="my-3 text-sm">
          Today I am gonna bench for
          30000 times. Today I am gonna
          bench for 30000 times.Today I
          am gonna bench for 30000
          times.Today I am gonna bench
          for 30000 times. Today I am
          gonna bench for 30000 times
        </p>
        <div className="mt-5">
          <button className="flex gap-2 items-container">
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
