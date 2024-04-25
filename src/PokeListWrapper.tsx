/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Input } from "@material-tailwind/react";
import { animateScroll } from "react-scroll";
import NavigationRoundedIcon from "@mui/icons-material/NavigationRounded";

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
  const [buttontoggle, setButtonToggle] = useState(false);

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
            pokidata: pokemonData,
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

  // intersection observer

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

  //back to top button toggle
  window.onscroll = () => {
    if (scrollY > 0) setButtonToggle(true);
    else if (buttontoggle) setButtonToggle(false);
  };
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
                color="gray"
                size="md"
                label="Search"
                value={pokemoninput}
                placeholder={undefined}
                onChange={handleChangeWrapper}
                autoComplete="off"
              ></Input>
              <ul className="cursor-pointer rounded-xl h-auto w-72 z-10 absolute top-60 bg-gradient-to-r from-purple-600 to-purple-900 text-white">
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

      <div className="h-5/6 pokilist grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {pokemonData.map((pokemondat: Pokemon, index: number) => {
          return <PokiCard pokemon={pokemondat} key={index} />;
        })}
        {pokemoninput === "" ? (
          <div ref={containerRef} className="flex w-screen justify-center">
            {loading && (
              <div role="status" className="text-center">
                <svg
                  aria-hidden="true"
                  className=" w-20 h-20  text-gray-200 animate-spin dark:text-gray-600 fill-red-700"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        ) : null}

        <button
          className="scrollbutton fixed right-12 bottom-12 z-20 bg-gradient-to-r from-purple-900 to-purple-500 rounded-xl w-16 h-16 "
          onClick={() => animateScroll.scrollToTop()}
          style={{ display: buttontoggle ? "block" : "none" }}
        >
          <NavigationRoundedIcon fontSize="large"></NavigationRoundedIcon>
        </button>
      </div>
    </div>
  );
};

export default PokeListWrapper;
