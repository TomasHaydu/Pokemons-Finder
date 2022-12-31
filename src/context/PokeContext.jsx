import { createContext, useEffect, useState } from "react";

const PokeContext = createContext();

const PokeProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);

  const [value, setValue] = useState(0);

  const [fav, setFav] = useState(JSON.parse(localStorage.getItem("fav")) ?? [])

  const [favButton, setFavButton] = useState(false)

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(fav));
  }, [fav]);

  const getAllPoke = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=100000&offset=0`;
    const resolve = await fetch(url);
    const allPoke = await resolve.json();
    return allPoke.results;
  };

  useEffect(
    () => async () => {
      setPokemons(await getAllPoke());
    },
    [value]
  );

  const handleSubmitSearch = async (search) => {
      const filterPoke = async (searchTerm) => {
        const resultadosBusqueda = (await getAllPoke()).filter((element) => {
          const name = (element.name).toString().toLowerCase();
          if (name.includes(searchTerm.toLowerCase())) {
            return element;
          };
        });
        setPokemons(resultadosBusqueda);
      };

      filterPoke(search);
    }

    
  const favButtonHandle = async (button) => {   
    setFavButton(!favButton);
  if (button === false) {
    setPokemons(fav);
  } else {
    setPokemons(await getAllPoke());
  }
};


    //   const findPoke = async () => {
    //     const poke = await getAllPoke();
    //     const pokemonsNames = [];
    //     poke.results.map((pokeName) => pokemonsNames.push(pokeName));
    //     const results = [
    //       pokemonsNames.find((pokemon) => pokemon.name === search),
    //     ];
    //     const pokemonWanted = { results };
    //     return pokemonWanted;
    //   };

    //   setPokemons(await findPoke());
    // };

    // const resultsSearch = async (searchTerm) => {
    //   const allPoke = await getAllPoke();
    //   const searchResult = (await allPoke.results).filter((element) => {
    //     const name = element.name.toString().toLowerCase();
    //     if (searchTerm === "" || searchTerm === undefined) {
    //       return element;
    //     } else if (name.includes(searchTerm.toLowerCase())) {
    //       return element;
    //     } else return null;
    //   });
    //   setPokemons(await searchResult);
  //};

  return (
    <PokeContext.Provider
      value={{
        pokemons,
        setPokemons,
        setValue,
        value,
        handleSubmitSearch,
        getAllPoke,
        fav,
        setFav,
        favButton,
        setFavButton,
        favButtonHandle,
      }}
    >
      {children}
    </PokeContext.Provider>
  );
};

export { PokeProvider };
export default PokeContext;
