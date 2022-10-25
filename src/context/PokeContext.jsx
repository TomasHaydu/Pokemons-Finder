import { createContext, useEffect, useState } from "react";

const PokeContext = createContext();

const PokeProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  const [pokemons, setPokemons] = useState([]);

  const [value, setValue] = useState(0);

  useEffect(() => {
    const getAPI = async () => {
      const url = `https://pokeapi.co/api/v2/pokemon/?offset=${value}&limit=20`;
      const resolve = await fetch(url);
      const result = await resolve.json();
      setPokemons(result);
    };
    getAPI();
  }, [value]);

  const handleSubmitSearch = async(e) => {
    e.preventDefault();
    const getAllPoke = async () => {
      const url = `https://pokeapi.co/api/v2/pokemon/?limit=100000&offset=0`;
      const resolve = await fetch(url);
      const allPoke = await resolve.json();
      return allPoke;
    };
    const findPoke = async () => {
      const poke = await getAllPoke();
      const pokemonsNames = [];
      poke.results.map((pokeName) => pokemonsNames.push(pokeName));
      const results = [pokemonsNames.find(
        (pokemon) => pokemon.name === search
      )]
      const pokemonWanted = {results};
      return pokemonWanted
    }

    setPokemons(await findPoke());
  };


  return (
    <PokeContext.Provider
      value={{
        setSearch,
        pokemons,
        setPokemons,
        setValue,
        value,
        handleSubmitSearch
      }}
    >
      {children}
    </PokeContext.Provider>
  );
};

export { PokeProvider };
export default PokeContext;
