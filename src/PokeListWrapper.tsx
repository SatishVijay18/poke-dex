/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Input } from "@material-tailwind/react";

import PokiCard from "./components/PokiCard";
import { Pokemon, Pokemons, Pokidata } from "./APIResponseTypes";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FetchPokemonTypes } from "./components/FetchPokemonTypes";

const PokeListWrapper = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]); //for everchanging array
  const [perpokemonData, setperpokemonData] = useState<Pokemon[]>([]); // permanent copy of pokemon result
  const [suggestions, setSuggestions] = useState<string[] | null>([]); // filtered array for displaying as suggestions

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // resetting the suggestions dropdown when clicking outside it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const pokemontypesresult = useQuery({
    queryKey: ["pokemontypes"],
    queryFn: FetchPokemonTypes,
  });

  const pokemontypestemp = pokemontypesresult?.data?.results;
  // final array containing only names of types
  const pokemontypeslist = pokemontypestemp?.map((data) => data.name);

  useEffect(() => {
    if (loading) return;
    setLoading(true);
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(currentPage - 1) * 20}}`,
        );
        const data = (await response.json()) as Pokemons;

        const allPokemon: Pokemon[] = [];

        for (const pokemon of data.results) {
          const pokemonResponse = await fetch(pokemon.url as string);
          const pokemonData = (await pokemonResponse.json()) as Pokidata;

          const types: string[] = pokemonData.types.map(
            (typeData) => typeData.type.name,
          );

          allPokemon.push({
            name: pokemonData.name,
            types: types,
            url: pokemon.url as string,
            speciesurl: pokemonData.species.url,
          });
        }

        const newarray = perpokemonData.concat(allPokemon);
        setPokemonData(newarray);
        setperpokemonData(newarray);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [currentPage]);

  const [pokemoninput, setPokemonInput] = useState("");
  const [debounceTimer, setDebounceTimer] = useState<number | null>();

  const debounce = (func: (arg: string) => void, timeout = 1000) => {
    if (debounceTimer) clearTimeout(debounceTimer);
    let timer: number;
    return (arg: string) => {
      timer = setTimeout(() => {
        func(arg);
      }, timeout);
      setDebounceTimer(timer);
    };
  };

  const handleChange = (targetvalue: string) => {
    const temparr = perpokemonData.filter((data) => {
      if (data.types.indexOf(targetvalue) == -1) {
        if (data.name.includes(targetvalue)) {
          return data;
        }
      } else return data;
    });
    setPokemonData(temparr);

    const namecheck = perpokemonData.some((data) => data.name == targetvalue);
    const typecheck = perpokemonData.some(
      (data) => data.types.indexOf(targetvalue) > -1,
    );

    if (targetvalue.length > 0 && !namecheck && !typecheck) {
      const suggestionarr = [] as string[];
      const typeresultarr = [] as string[];
      const pokiresultarr = [] as string[];
      // for pokemon suggestions
      temparr.map((data) => {
        if (data.name.includes(targetvalue)) {
          pokiresultarr?.push(data.name);
        }
      });

      // for type suggestions

      if (
        pokemontypeslist?.some((poketype) => poketype.includes(targetvalue))
      ) {
        pokemontypeslist.map((temptype) => {
          if (
            temptype.includes(targetvalue) &&
            !typeresultarr.some((temptype) => temptype == targetvalue)
          ) {
            typeresultarr.push(temptype);
          }
        });
      }

      suggestionarr.push(...typeresultarr);
      suggestionarr.push(...pokiresultarr);

      setSuggestions(suggestionarr);
    } else setSuggestions(null);
  };

  const handleClick = (name: string) => {
    setPokemonInput(name);
    setSuggestions(null);
    const updatecall = debounce(handleChange);
    updatecall(name);
  };

  const handleChangeWrapper = (e: React.FormEvent<HTMLInputElement>) => {
    const targetvalue = e.currentTarget?.value;
    setPokemonInput(targetvalue);
    const debouncedcall = debounce(handleChange);
    debouncedcall(targetvalue);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className="w-100 block ">
      <div className="h-1/5  align-middle items-center text-center bg-gradient-to-r from-purple-700 to-black">
        <form
          className="flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex mt-4 justify-center">
            <div className="flex flex-row w-72" ref={dropdownRef}>
              <Input
                className="flex justify-center"
                name="pokiname"
                color="white"
                size="md"
                label="pokemon"
                value={pokemoninput}
                placeholder={undefined}
                onChange={handleChangeWrapper}
                autoComplete="off"
              ></Input>
              <ul className="cursor-pointer rounded-xl h-auto w-72 z-10 absolute top-44 bg-gradient-to-r from-purple-600 to-purple-900 text-white">
                {suggestions && suggestions?.length > 0
                  ? suggestions.map((suggestion, index) => {
                      if (pokemontypeslist?.includes(suggestion)) {
                        return (
                          <li
                            onClick={() => handleClick(suggestion)}
                            key={index}
                          >
                            <div className="flex flex-row justify-between h-8">
                              <div className="my-1 mx-2"> {suggestion}</div>
                              <div className="my-1 mx-2"> Category</div>
                            </div>
                          </li>
                        );
                      } else {
                        return (
                          <li
                            onClick={() => handleClick(suggestion)}
                            key={index}
                          >
                            <div className="flex flex-row h-8">
                              <div className="my-1 mx-2"> {suggestion}</div>
                            </div>
                          </li>
                        );
                      }
                    })
                  : null}
              </ul>
            </div>
          </div>

          <div className="flex justify-center mt-2"> </div>
        </form>
      </div>

      <div className="h-5/6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {pokemonData.map((pokemondat: Pokemon, index: number) => {
          return <PokiCard pokemon={pokemondat} key={index} />;
        })}
        {pokemoninput === "" ? (
          <div ref={containerRef}>{loading && <div>Loading.....</div>}</div>
        ) : null}
      </div>
    </div>
  );
};

export default PokeListWrapper;
