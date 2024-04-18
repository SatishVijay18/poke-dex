import { QueryFunction } from "@tanstack/react-query";
import { PokemonTypeList } from "../APIResponseTypes";

export const FetchPokemonTypes: QueryFunction<PokemonTypeList> = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/type");
  if (!response.ok) {
    console.log("error in fetching");
  }
  return response.json();
};
