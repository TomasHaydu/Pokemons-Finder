import React from "react";
import usePokemon from "../hooks/UsePokemon";
import NoFav from "../icons/fav-icon-nofav.png";
import Fav from "../icons/fav-icon-fav.png";
import ProgressBar from "./ProgressBar";

const MoreInfoModal = ({
  pokemon,
  pokeInfo,
  modalInfo,
  setModalInfo,
  pokemonToFav,
}) => {
  const { colorTypes, fav } = usePokemon();

  const totalCalculator = () => {
    let total = 0;
    pokeInfo.stats.map((s) => (total = total + s.base_stat));
    return total;
  };

  return (
    <div className="container__pokemons_container-2">
      <p className="container__pokemons__name">{pokeInfo.name}</p>
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
              className={pokeInfo.sprites ? "container__pokemons__img-2" : ""}
              src={
                pokeInfo.sprites
                  ? pokeInfo.sprites.other.dream_world.front_default
                    ? pokeInfo.sprites.other.dream_world.front_default
                    : pokeInfo.sprites.back_default
                  : null
              }
              alt={pokeInfo.name}
            />
          </div>
        </div>
        <div className="modal-info">
          <div className="modal-info-data">
            <div className="modal-info-data-container">
              <div className="modal__container-2">
                <label className="modal__container--label">NRO: </label>
                <p className="modal__container--info">{pokeInfo.id}</p>
              </div>
              <div className="modal__container-2">
                <label className="modal__container--label">ALTURA: </label>
                <p className="modal__container--info">
                  {pokeInfo.height / 10}mts
                </p>
              </div>
              <div className="modal__container-2">
                <label className="modal__container--label">PESO: </label>
                <p className="modal__container--info">
                  {pokeInfo.weight / 10}kg
                </p>
              </div>
              <div className="modal__container-2">
                <label className="modal__container--label">HABILIDADES: </label>
                {pokeInfo.abilities.map((poke) => (
                  <p className="modal__container--info" key={poke.ability.name}>
                    {poke.ability.name}
                  </p>
                ))}
              </div>
              <div className="modal__container-2">
                <label className="modal__container--label">TIPO: </label>
                {pokeInfo.types.map((poke) => (
                  <p
                    className="modal__container--info"
                    key={poke.type.name}
                    style={{ backgroundColor: `${colorTypes[poke.type.name]}` }}
                  >
                    {poke.type.name}
                  </p>
                ))}
              </div>
              <div className="modal__container-2">
                <label className="modal__container--label">FORMAS: </label>
                {pokeInfo.forms.map((poke) => (
                  <p className="modal__container--info" key={poke.name}>
                    {poke.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="modal__progress-bar">
            {pokeInfo.stats.map((s) => (
              <div
                className="modal__container-2"
                key={`${s.stat.name}${s.base_stat}`}
              >
                <label className="modal__container--label">{s.stat.name}</label>
                <ProgressBar completed={s.base_stat} total={200} />
              </div>
            ))}
          </div>
          <div className="modal__total">
            <label className="modal__total-title">Total:</label>
            <p className="modal__total-number">{totalCalculator()}</p>
          </div>
        </div>
      </div>
      <div>
        <button
          className="container__pokemons__button-info"
          onClick={() => setModalInfo(!modalInfo)}
        >
          i
        </button>
      </div>
    </div>
  );
};

export default MoreInfoModal;
