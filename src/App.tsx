import PokeListWrapper from "./PokeListWrapper";
import { Link } from "react-router-dom";

export const App = () => {
  return (
    <div className="p-0 m-0 w-full h-full">
      <Link to="/" className="h-auto block">
        <div className=" flex justify-center bg-gradient-to-r from-purple-700 to-black">
          <img
            className="flex h-48"
            src="/header-logo-pub.png"
            alt="pokemon logo"
          />
        </div>
      </Link>
      <PokeListWrapper />
    </div>
  );
};
