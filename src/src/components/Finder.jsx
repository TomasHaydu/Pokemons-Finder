import usePokemon from "../hooks/UsePokemon";
import { useState } from "react";
import { useEffect } from "react";

const Finder = () => {
  const { handleSubmitSearch, pokemons } = usePokemon();

  const [search, setSearch] = useState("");
  // const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    handleSubmitSearch(search);
  }, [search]);

  // const onSuggestHandle = (value) => {
  //   setSearch(value);
  //   setSuggestions([]);
  // };

  const onChangeHandle = (value) => {
    let matches = [];
    if (value.length > 0) {
      matches = pokemons.filter((poke) => {
        const regex = new RegExp(`${value}`, "gi");
        return poke.name.match(regex);
      });
    }
    // setSuggestions(matches);
    setSearch(value);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setSearch("");
  };

  return (
    <div className="block">
      <form className="block-form">
        <label>Buscador: </label>

        <div className="block__search">
          <input
            type="text"
            className="block__search-finder"
            onChange={(e) => onChangeHandle(e.target.value)}
            value={search}
            // onBlur={() => {
            //   setTimeout(() => {
            //     setSuggestions([]);
            //   }, 100);
            // }}
          />
          <button className="block__search-clear" onClick={() => handleClear()}>
            X
          </button>
        </div>
        {/* <div
        className="container-suggest"
        >
          {suggestions.length > 0
            ? suggestions.map((suggestion) => {
                <div
                  key={suggestion.name}
                  className="block__finder-suggest"
                  onClick={() => onSuggestHandle(suggestion.name)}
                >
                  {suggestion.name}
                </div>;
              })
            : "Error"}
        </div> */}
      </form>
    </div>
  );
};

export default Finder;
