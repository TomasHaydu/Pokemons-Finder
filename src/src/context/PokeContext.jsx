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

    
  const favButtonHandle = (button) => {   
    setValue(0)
    setTimeout(async() => {
      setFavButton(!favButton);
      if (button === false) {
        setPokemons(fav);
      } else {
        setPokemons(await getAllPoke())
      }
    }, 500);
};

const colorTypes = {
  'normal':'rgb(168,168,120)' ,
  'fire':'rgb(240,128,48)' ,
  'water':'rgb(104,144,240)' ,
  'grass':'rgb(120,197,81)' ,
  'electric': 'rgb(248,208,48)',
  'ice': 'rgb(152,216,216)',
  'fighting': 'rgb(217,49,41)',
  'poison':'rgb(160,64,160)' ,
  'ground':'rgb(224,192,104)' ,
  'flying':'rgb(168,144,240)' ,
  'psychic':'rgb(248,88,136)' ,
  'bug':'rgb(168,184,32)' ,
  'rock':'rgb(184,160,56)' ,
  'ghost':'rgb(112,88,152)' ,
  'dark': 'rgb(112,88,72)',
  'dragon': 'rgb(112,56,248)',
  'steel':'rgb(184,184,208)' ,
  'fairy': 'rgb(240,182,188)'
}


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
        colorTypes,
        
      }}
    >
      {children}
    </PokeContext.Provider>
  );
};

export { PokeProvider };
export default PokeContext;
