import { Pokemon } from "../APIResponseTypes";
import { Link } from "react-router-dom";

// types,  url, image, species url already sent

const PokiCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const pokidata = pokemon.pokidata;
  const pokicolours = [
    "aliceblue",
    "antiquewhite",
    "aqua",
    "aquamarine",
    "azure",
    "beige",
    "bisque",
    "black",
    "blanchedalmond",
    "blue",
    "blueviolet",
    "brown",
    "burlywood",
    "cadetblue",
    "chartreuse",
    "chocolate",
    "coral",
    "cornflowerblue",
    "cornsilk",
    "crimson",
    "cyan",
    "darkblue",
    "darkcyan",
    "darkgoldenrod",
    "darkgray",
    "darkgrey",
    "darkgreen",
    "darkkhaki",
    "darkmagenta",
    "darkolivegreen",
    "darkorange",
    "darkorchid",
    "darkred",
    "darksalmon",
    "darkseagreen",
    "darkslateblue",
    "darkslategray",
    "darkslategrey",
    "darkturquoise",
    "darkviolet",
    "deeppink",
    "deepskyblue",
    "dimgray",
    "dimgrey",
    "dodgerblue",
    "firebrick",
    "floralwhite",
    "forestgreen",
    "fuchsia",
    "gainsboro",
    "ghostwhite",
    "gold",
    "goldenrod",
    "gray",
    "grey",
    "green",
    "greenyellow",
    "honeydew",
    "hotpink",
    "indianred",
    "indigo",
    "ivory",
    "khaki",
    "lavender",
    "lavenderblush",
    "lawngreen",
    "lemonchiffon",
    "lightblue",
    "lightcoral",
    "lightcyan",
    "lightgoldenrodyellow",
    "lightgray",
    "lightgrey",
    "lightgreen",
    "lightpink",
    "lightsalmon",
    "lightseagreen",
    "lightskyblue",
    "lightslategray",
    "lightslategrey",
    "lightsteelblue",
    "lightyellow",
    "lime",
    "limegreen",
    "linen",
    "magenta",
    "maroon",
    "mediumaquamarine",
    "mediumblue",
    "mediumorchid",
    "mediumpurple",
    "mediumseagreen",
    "mediumslateblue",
    "mediumspringgreen",
    "mediumturquoise",
    "mediumvioletred",
    "midnightblue",
    "mintcream",
    "mistyrose",
    "moccasin",
    "navajowhite",
    "navy",
    "oldlace",
    "olive",
    "olivedrab",
    "orange",
    "orangered",
    "orchid",
    "palegoldenrod",
    "palegreen",
    "paleturquoise",
    "palevioletred",
    "papayawhip",
    "peachpuff",
    "peru",
    "pink",
    "plum",
    "powderblue",
    "purple",
    "red",
    "rosybrown",
    "royalblue",
    "saddlebrown",
    "salmon",
    "sandybrown",
    "seagreen",
    "seashell",
    "sienna",
    "silver",
    "skyblue",
    "slateblue",
    "slategray",
    "slategrey",
    "snow",
    "springgreen",
    "steelblue",
    "tan",
    "teal",
    "thistle",
    "tomato",
    "turquoise",
    "violet",
    "wheat",
    "white",
    "whitesmoke",
    "yellow",
    "yellowgreen",
  ];

  const pokimage = pokidata.sprites?.other?.dream_world?.front_default;
  console.log(pokicolours[Math.floor(Math.random() * pokicolours.length)]);
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
      <div
        className="shadow-xl hover:shadow-2xl transition duration-300 hover:scale-90 rounded-xl flex flex-col m-1"
        style={{
          backgroundColor: `${pokicolours[Math.floor(Math.random() * pokicolours.length)]}`,
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
