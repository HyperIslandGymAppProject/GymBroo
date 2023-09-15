import NavigationCard from "./NavigationCard";
// import PostFormCard from "./PostFormCard";
// import PostCard from "./PostCard";

export default function Layout({ children, hideNavigation }) {
  let rightColumnClasses = "";
  if (hideNavigation) {
    rightColumnClasses += "w-full";
  } else {
    rightColumnClasses += "mx-4 lg:mx-0 lg:w-9/12 ";
  }
  return (
    <div className="lg:flex mt-4 max-w-4xl mx-auto gap-6">
      {!hideNavigation && (
        <div className="fixed z-10 lg:static w-full bottom-0 lg:w-3/12 -mb-5">
          <NavigationCard />
        </div>
      )}
      <div className={rightColumnClasses}>{children}</div>
    </div>
  );
}
