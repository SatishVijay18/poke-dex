import { QueryFunction } from "@tanstack/react-query";
import { Pokemons } from "../APIResponseTypes";

export const FetchPokemon: QueryFunction<Pokemons> = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=300");
  if (!response.ok) {
    console.log("error in fetching");
  }
  return response.json();
};
