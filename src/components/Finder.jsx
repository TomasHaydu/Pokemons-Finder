import usePokemon from "../hooks/UsePokemon";

const Finder = () => {
  const { setSearch, handleSubmitSearch } = usePokemon();

  return (
    <div className="block">
      <form onSubmit={handleSubmitSearch}>
        <label>Buscador: </label>
        <input
          type="text"
          className="block__finder"
          onChange={(e) => setSearch(e.target.value)}
        />
        <input type="submit" className="block__search" value="Buscar" />
      </form>
    </div>
  );
};

export default Finder;
