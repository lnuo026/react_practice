import PokemonList from "./components/PokemonList.jsx";
import PokemonView from "./components/PokemonView.jsx";
import SearchBar from "./components/SearchBar.jsx";
import { dummyData } from "./js/dummy-data.js";
import { useState } from "react";


function App() {
  // selected的功能，记录当前选中的宝可梦 
  const [selectedPokemon, setSelectedPokemon] = useState(null);

// 搜索的的功能，  用对象存多个搜索条件                                         
const [searchOptions, setSearchOptions] = useState({
    searchTerm: "",
    gen: "all"
});


// includes() 字符串方法，判断一个字符串里有没有包含另一个字符串，返回 true 或 false。本身区分大小写.
//  比如 "Pikachu".toLowerCase().includes("pik") 会返回 true，因为 "pik" 是 "Pikachu" 的一部分（不区分大小写）。
    const filteredPokemon = dummyData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchOptions.searchTerm.toLowerCase())
  );


  return (
    <div className="pokedex-container">
      {/* Left Panel - Pokemon List */}
      <nav className="sidebar">
        <h2>Pokédex</h2>

        {/* Search bar */}
        <SearchBar 
        searchOptions={searchOptions}
        onSearchOptionsChange={(opt) => setSearchOptions ({ ...searchOptions, ...opt })}
        />

        {/* dummyData 把整个数组传给 PokemonList
        在 PokemonList 里用 .map() 遍历，每个宝可梦渲染一行  */}
        <PokemonList
          pokemon={filteredPokemon}
          selectedId={selectedPokemon?._id}
          onSelectPokemon={setSelectedPokemon}
        />      </nav>

      {/* dummyData 也可以从数组中取出来一个穿给 PokemonView */}
      <PokemonView pokemon={selectedPokemon} />
    </div>
  );
}

export default App;
