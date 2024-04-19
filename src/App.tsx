import PokeListWrapper from "./PokeListWrapper";
import { Link } from "react-router-dom";

export const App = () => {
  return (
    <div className="p-0 m-0 w-full h-screen">
      <Link to="/">
        <div className="h-1/6 flex justify-center bg-gradient-to-r from-purple-700 to-black">
          <img className="flex" src="header-logo.png" alt="pokemon logo" />
        </div>
      </Link>
      <PokeListWrapper />
    </div>
  );
};
