export default function Avatar({ size, url }) {
  let width = "w-12";
  if (size === "lg") {
    width = "w-24 md:w-36";
  }
  return (
    <div
      className={`${width} rounded-full flex overflow-hidden flex justify-center items-center`}
    >
      <img src={url} alt="" />
    </div>
  );
}
