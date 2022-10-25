import { useEffect, useState } from "react"
import Modal from "./Modal"

const pokemons = ({pokemon}) => {

  const [pokeInfo, setPokeInfo] = useState({})

  const [modal, setModal] = useState(false)

  useEffect ( () => {
    const getInfoPoke = async()=>{
      const url = pokemon.url
      const resolve = await fetch(url)
      const result = await resolve.json()
      setPokeInfo(result)
    }
    getInfoPoke()
  },[pokemon])

  const handleModal = () => {
    setModal(!modal)
  }


  return (
    <div
    className="container__pokemons">
        <label className="container__pokemons__title" >Nombre:</label>
        <p className="container__pokemons__name" >{pokemon.name}</p>
        {modal ? 
        <Modal 
        pokeInfo={pokeInfo}
        key={pokeInfo.id}
        /> 
        :  <img
         className="container__pokemons__img"
         src={pokeInfo.sprites ? 
          pokeInfo.sprites.other.dream_world.front_default ? pokeInfo.sprites.other.dream_world.front_default : pokeInfo.sprites.back_default  
          : ""} alt={pokemon.name} />}

        <button
        className="container__pokemons__button"
        onClick={handleModal}
        >{ modal ? "Ver Imagen" : "Mas info" }</button>
    </div>
  )
}

export default pokemons