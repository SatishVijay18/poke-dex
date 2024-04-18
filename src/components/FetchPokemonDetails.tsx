import { QueryFunction } from "@tanstack/react-query";
import { PokemonSpecies, Pokidata } from "../APIResponseTypes";

export const FetchPokemonDetails:QueryFunction<Pokidata | PokemonSpecies,["pokemon-url" | "pokemon-species", string] > = async ({ queryKey }) => {
  const response = await fetch(queryKey[1]);

  if (!response.ok) {
    console.log("error in fetching");
  }

  return response.json();
};
