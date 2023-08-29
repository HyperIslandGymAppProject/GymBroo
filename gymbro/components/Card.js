export default function Card({
  children,
}) {
  return (
    <div className="bg-white shadow-xl shadow-grey-500 rounded-md p-4 mb-5">
      {children}
    </div>
  );
}
