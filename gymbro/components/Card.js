export default function Card({ children }) {
  return (
    <div className="bg-gymCard shadow-xl shadow-grey-500 rounded-md mb-5">
      {children}
    </div>
  );
}
