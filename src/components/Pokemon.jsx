import { useEffect, useState } from "react";
import Modal from "./Modal";
import NoFav from "../icons/fav-icon-nofav.png";
import Fav from "../icons/fav-icon-fav.png";
import usePokemon from "../hooks/UsePokemon";

const Pokemons = ({ pokemon }) => {
  const [pokeInfo, setPokeInfo] = useState([]);

  const { fav, setFav } = usePokemon();

  useEffect(() => {
    const getInfoPoke = async () => {
      const url = pokemon.url;
      const resolve = await fetch(url);
      const result = await resolve.json();
      setPokeInfo(result);
    };
    getInfoPoke();
  }, []);

  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  const pokemonToFav = (pokemon) => {
    const result = fav.filter((poke) => {
      return poke.name === pokemon.name;
    });
    if (result.length === 0) {
      const addList = [...fav, pokemon];
      setFav(
        addList.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        })
      );
    } else if (result.length > 0) {
      const newList = fav.filter((poke) => {
        return poke.name !== pokemon.name;
      });
      setFav(newList);
    } else {
      console.log("ERROR pokemonToFav");
    }
    setPokeOnFav(!pokeOnFav);
  };

  const [pokeOnFav, setPokeOnFav] = useState(false);

  const [modalInfo, setModalInfo] = useState(false);

  return (
    <div
      className={
        modalInfo ? "container__pokemons-modal" : "container__pokemons"
      }
    >
      {modalInfo ? (
        <div className="container__pokemons_container">
          <p className="container__pokemons__name">{pokemon.name}</p>
          <div className="container__pokemons__info-modal">
            <div>
              <img
                src={
                  fav.some((poke) => poke.name == pokemon.name) === true
                    ? Fav
                    : NoFav
                }
                alt="fav-button"
                className="container__pokemons__fav"
                onClick={() => pokemonToFav(pokemon)}
              />
              <div className="container__pokemons__flip">
                <img
                  className={pokeInfo.sprites ? "container__pokemons__img" : ""}
                  src={
                    pokeInfo.sprites
                      ? pokeInfo.sprites.other.dream_world.front_default
                        ? pokeInfo.sprites.other.dream_world.front_default
                        : pokeInfo.sprites.back_default
                      : null
                  }
                  alt={pokemon.name}
                />
              </div>
            </div>
              <div className="modal-info">
                <div className="modal__container">
                  <label className="modal__container--label">NRO: </label>
                  <p className="modal__container--info">{pokeInfo.id}</p>
                </div>
                <div className="modal__container">
                  <label className="modal__container--label">ALTURA: </label>
                  <p className="modal__container--info">{pokeInfo.height}mts</p>
                </div>
                <div className="modal__container">
                  <label className="modal__container--label">PESO: </label>
                  <p className="modal__container--info">{pokeInfo.weight}kg</p>
                </div>
                <div className="modal__container">
                  <label className="modal__container--label">
                    HABILIDADES:{" "}
                  </label>
                  {pokeInfo.abilities.map((poke) => (
                    <p
                      className="modal__container--info"
                      key={poke.ability.name}
                    >
                      {poke.ability.name}
                    </p>
                  ))}
                </div>
                <div className="modal__container">
                  <label className="modal__container--label">TIPO: </label>
                  {pokeInfo.types.map((poke) => (
                    <p className="modal__container--info" key={poke.type.name}>
                      {poke.type.name}
                    </p>
                  ))}
                </div>
                <div className="modal__container">
                  <label className="modal__container--label">FORMAS: </label>
                  {pokeInfo.forms.map((poke) => (
                    <p className="modal__container--info" key={poke.name}>
                      {poke.name}
                    </p>
                  ))}
                </div>
              </div>
          </div>
          <div>
            <button
              className="container__pokemons__button"
              onClick={handleModal}
            >
              {modal ? "Ver Imagen" : "Mas info"}
            </button>
            <button
              className="container__pokemons__button-info"
              onClick={() => setModalInfo(!modalInfo)}
            >
              i
            </button>
          </div>
        </div>
      ) : (
        <div className="container__pokemons_container">
          <p className="container__pokemons__name">{pokemon.name}</p>
          <img
            src={
              fav.some((poke) => poke.name == pokemon.name) === true
                ? Fav
                : NoFav
            }
            alt="fav-button"
            className="container__pokemons__fav"
            onClick={() => pokemonToFav(pokemon)}
          />
          <div className="container__pokemons__flip">
            {pokeInfo.sprites && modal === true ? (
              <Modal pokeInfo={pokeInfo} key={pokeInfo.id} />
            ) : modal === false ? (
              <img
                className={pokeInfo.sprites ? "container__pokemons__img" : ""}
                src={
                  pokeInfo.sprites
                    ? pokeInfo.sprites.other.dream_world.front_default
                      ? pokeInfo.sprites.other.dream_world.front_default
                      : pokeInfo.sprites.back_default
                    : null
                }
                alt={pokemon.name}
              />
            ) : null}
          </div>
          <div>
            <button
              className="container__pokemons__button"
              onClick={handleModal}
            >
              {modal ? "Ver Imagen" : "Mas info"}
            </button>
            <button
              className="container__pokemons__button-info"
              onClick={() => setModalInfo(!modalInfo)}
            >
              i
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pokemons;
