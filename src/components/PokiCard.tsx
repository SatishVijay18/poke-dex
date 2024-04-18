import { useQuery } from "@tanstack/react-query";
import { FetchPokemonDetails } from "./FetchPokemonDetails";
import { Pokemon, PokemonSpecies, Pokidata } from "../APIResponseTypes";
import { Link } from "react-router-dom";

// types,  url, image, species url already sent

const PokiCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const pokemonurl = pokemon.url;
  const results = useQuery({
    queryKey: ["pokemon-url", pokemonurl],
    queryFn: FetchPokemonDetails,
  });

  const pokidata = (results?.data as Pokidata) ?? [];

  const speciesurl = pokemon.speciesurl;
  const speciesresult = useQuery({
    queryKey: ["pokemon-species", speciesurl],
    queryFn: FetchPokemonDetails,
  });

  const derivedspecies = speciesresult?.data as PokemonSpecies;

  const pokimage = pokidata.sprites?.other?.dream_world?.front_default;
  const pokicolour = derivedspecies?.color?.name;
  return (
    <Link
      to={{ pathname: "/details" }}
      state={{
        data: {
          pokidata: pokidata,
          base_happiness: derivedspecies?.base_happiness,
          capture_rate: derivedspecies?.capture_rate,
          growth_rate: derivedspecies?.growth_rate?.name,
          shape: derivedspecies?.shape?.name,
          color: pokicolour,
        },
      }}
    >
      <div
        className="shadow-xl hover:shadow-2xl transition duration-300 hover:scale-90 rounded-xl flex flex-col m-1"
        style={{
          backgroundColor: `${pokicolour}`,
        }}
      >
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
