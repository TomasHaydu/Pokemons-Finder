import PokeFinder from './components/PokeFinder'
import {PokeProvider} from './context/PokeContext'

function App() {


  return (
    <PokeProvider>
      <PokeFinder/>
    </PokeProvider>
  )
}

export default App
