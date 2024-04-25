import { Pokemon } from "../APIResponseTypes";
import { Link } from "react-router-dom";

// types,  url, image, species url already sent

const PokiCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const pokidata = pokemon.pokidata;
  const pokimage = pokidata.sprites?.other?.dream_world?.front_default;
  return (
    <Link
      to={{ pathname: "/details" }}
      state={{
        data: {
          pokidata: pokidata,
          speciesurl: pokidata.species.url,
        },
      }}
    >
      <div className="shadow-xl hover:shadow-2xl transition duration-300 hover:scale-90 rounded-xl flex flex-col m-1">
        <img
          className="h-32 bottom-2 relative"
          alt="pokemon"
          src={pokimage}
        ></img>
        <div className="pokemon-details-wrapper flex justify-between pl-2">
          <div className="font-pixelify text-xl">{pokemon.name}</div>

          <div className="pokemon-attacks-wrapper flex ">
            {pokemon.types.length
              ? pokemon.types.map((pokemontype, index: number) => {
                  return (
                    <div key={index} className="pl-2 pr-2 pb-2">
                      <div className="font-pixelify rounded-xl border-2 border-black bg-black text-white px-1">
                        {pokemontype}
                      </div>
                      <div></div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default PokiCard;
