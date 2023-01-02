import usePokemon from "../hooks/UsePokemon";
import { useState } from "react";
import { useEffect } from "react";

const Finder = () => {
  
  const { handleSubmitSearch, pokemons } = usePokemon();

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
  handleSubmitSearch(search)
  }, [search])
  
  const onSuggestHandle = (value) => {
    setSearch(value)
    setSuggestions([])
  }

  const onChangeHandle = (value) => {
    let matches = []
    if (value.length > 0) {
      matches = pokemons.filter(poke => {
        const regex = new RegExp(`${value}`, 'gi')
        return (poke.name).match(regex)
      })
    }
    setSuggestions(matches)
    setSearch(value)
  }

  return (
    <div className="block">
      <form 
      // onSubmit={(e) => handleSubmitSearch(e, search)}
      >
        <label>Buscador: </label>
        <input
          type="text"
          className="block__finder"
          onChange={(e) => onChangeHandle(e.target.value)}
          value={search}
          onBlur={() => {
            setTimeout(() => {
              setSuggestions([])
            }, 100);
          }}
        />
        {suggestions.length !== 0 ? suggestions.map((suggestion) => {
          <div
          key={suggestion.name}
          className="block__finder-suggest" 
          onClick={() => onSuggestHandle(suggestion.name) }
          >{suggestion.name}</div>
        }) : null}
        {/* <input type="submit" className="block__search" value="Buscar" /> */}
      </form>
    </div>
  );
};

export default Finder;
