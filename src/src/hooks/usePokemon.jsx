import { useContext } from "react";
import PokeContext from "../context/PokeContext";

const usePokemon = () => {
    return useContext(PokeContext)
}

export default usePokemon