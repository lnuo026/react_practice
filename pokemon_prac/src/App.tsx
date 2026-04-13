import PokemonList from "./components/PokemonList.jsx";
import PokemonView from "./components/PokemonView.jsx";
import SearchBar from "./components/SearchBar.jsx";
import { dummyData } from "./js/dummy-data.js";

function App() {
  return (
    <div className="pokedex-container">
      {/* Left Panel - Pokemon List */}
      <nav className="sidebar">
        <h2>Pokédex</h2>

        {/* Search bar */}
        <SearchBar />

        {/* dummyData 把整个数组传给 PokemonList
        在 PokemonList 里用 .map() 遍历，每个宝可梦渲染一行  */}
        <PokemonList pokemonData={dummyData} />
      </nav>

      {/* dummyData 也可以从数组中取出来一个穿给 PokemonView */}
      <PokemonView pokemon={null} />
    </div>
  );
}

export default App;
