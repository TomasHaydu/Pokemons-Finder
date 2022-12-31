import { useState } from "react";
import usePokemon from "../hooks/UsePokemon";
import Alert from "./Alert";
import Finder from "./Finder";
import Modal from "./Modal";
import Pokemon from "./Pokemon";
import FavListActive from "../icons/fav-icon-active.png";
import FavList from "../icons/fav-icon.png";

const PokeFinder = () => {
  const keyFunction = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  const {
    pokemons,
    setValue,
    value,
    getAllPoke,
    favButton,
    favButtonHandle
  } = usePokemon();


  return (
    <div>
      <div className="header" onClick={() => getAllPoke()}>
        <p className="header__title">Pokemon Finder</p>
      </div>

      <img
        src={favButton ? FavListActive : FavList}
        alt=""
        className="fav__button"
        onClick={() => favButtonHandle(favButton)}
      />

      <Finder />

      <div className="container">
        {pokemons.length > 0 ? (
          pokemons
            .slice(value, value + 20)
            .map((pokemon) => <Pokemon pokemon={pokemon} key={keyFunction()} />)
        ) : (
          <Alert />
        )}
      </div>

      <div className="nav">
        <nav className="nav__container">
          <a
            className="nav__container__a nav__container__a_anterior"
            onClick={() => {
              value <= 20 ? null : setValue(value - 20);
            }}
          >
            {" "}
            Anterior{" "}
          </a>
          <a
            className={
              value === 0
                ? "nav__container__a--active nav__container__a"
                : " nav__container__a"
            }
            onClick={() => setValue(0)}
          >
            {" "}
            1{" "}
          </a>
          <a
            className={
              value === 20
                ? "nav__container__a--active nav__container__a"
                : " nav__container__a"
            }
            onClick={() => setValue(20)}
            value="2"
          >
            {" "}
            2{" "}
          </a>
          <a
            className={
              value === 40
                ? "nav__container__a--active nav__container__a"
                : " nav__container__a"
            }
            onClick={() => setValue(40)}
            value="3"
          >
            {" "}
            3{" "}
          </a>
          <a
            className={
              value === 60
                ? "nav__container__a--active nav__container__a"
                : " nav__container__a"
            }
            onClick={() => setValue(60)}
            value="4"
          >
            {" "}
            4{" "}
          </a>
          <a
            className={
              value >= 80
                ? "nav__container__a--active nav__container__a"
                : " nav__container__a"
            }
            onClick={() => setValue(80)}
          >
            {" "}
            {value <= 60 ? 5 : value / 20 + 1}{" "}
          </a>
          <a
            className="nav__container__a nav__container__a_siguiente"
            onClick={() => {
              value >= 1140 ? null : setValue(value + 20);
            }}
          >
            {" "}
            Siguiente{" "}
          </a>
        </nav>
      </div>
    </div>
  );
};

export default PokeFinder;
