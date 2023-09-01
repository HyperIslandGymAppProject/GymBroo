export default function Avatar({ size }) {
  let width = "w-12";
  if (size === "big") {
    width = "w-36";
  }
  return (
    <div
      className={`${width} w-16 h-16 rounded-full flex overflow-hidden flex justify-center items-center`}
    >
      <img
        src="https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2504&q=80"
        alt=""
      />
    </div>
  );
}
