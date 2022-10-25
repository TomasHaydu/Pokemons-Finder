import usePokemon from "../hooks/UsePokemon";
import Alert from "./Alert";
import Finder from "./Finder";
import Modal from "./Modal";
import Pokemon from "./Pokemon"


const PokeFinder = () => {

  const keyFunction = () => {
    return (Math.random().toString(36).substring(2) + Date.now().toString(36))
  }


  const {setSearch, pokemons, setValue, value, modal, setModal} = usePokemon()


  return (
    <div>
      <div className="header">
        <p className="header__title">Pokemon Finder</p>
      </div>

      <Finder 
      />

      <div
      className="container"
      >
        {
              pokemons.results ? (pokemons.results).map(pokemon => (
                pokemon ? 
                  <Pokemon 
                  pokemon={pokemon}
                  key={keyFunction()}
                  /> : <Alert
                  key={keyFunction()}
                  />
                
              )) : <Alert />
        }
      </div>

      <div
      className="nav"
      >
        <nav
        className="nav__container"
        >
          <a
          className= "nav__container__a nav__container__a_anterior"
          onClick={()=>{value <= 20 ? null : setValue(value - 20)}}
          > Anterior </a>
          <a
           className={value === 0 ? "nav__container__a--active nav__container__a" : " nav__container__a"}
           onClick={()=>setValue(0)}
          > 1 </a>
          <a
           className={value === 20 ? "nav__container__a--active nav__container__a" : " nav__container__a"}
           onClick={()=>setValue(20)}
           value="2"
          > 2 </a>
          <a
           className={value === 40 ? "nav__container__a--active nav__container__a" : " nav__container__a"}
           onClick={()=>setValue(40)}
           value="3"
          > 3 </a>
          <a
           className={value === 60 ? "nav__container__a--active nav__container__a" : " nav__container__a"}
           onClick={()=>setValue(60)}
           value="4"
          > 4 </a>
          <a
           className={value >= 80 ? "nav__container__a--active nav__container__a" : " nav__container__a"}
           onClick={()=>setValue(80)}
          > {value <= 60 ? 5 : (value/20)+1} </a>
          <a
           className="nav__container__a nav__container__a_siguiente"
           onClick={()=>{value >= 1140 ? null : setValue(value + 20)}}
          > Siguiente </a>
        </nav>
      </div>

      {modal && <Modal 
      setModal={setModal}
      />}

    </div>
  );
};

export default PokeFinder;
