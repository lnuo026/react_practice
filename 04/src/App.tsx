import PokemonList from "./components/PokemonList";
import SearchBar from "./components/SearchBar";


function App(){
  return(
    <div className="pokedex-container">

      <nav className="sidebar">
        <h2>Pokedex</h2>

     <SearchBar />
       </nav>
      {/* Right Panel - Pokemon Details */}
      <main className="main-content">
       {/* Pokemon header */}
          <div className="pokemon-header">
            <h1 className="pokemon-name">Dragonite</h1>
            <span className="pokemon-number">#149</span>
          </div>

          {/* 宝可梦图 */}
          <div className="pokemon-image-container">
            <label className="star-checkbox">
              <input type="checkbox" />
              <img src="/assets/images/star-64.png" alt="Star" />
              <span className="tooltip">show / hide shiny image</span>
            </label>
            <img src="/assets/images/pokemon/149.png" alt="Dragonite" 
  className="pokemon-image visible" id="pokemon-image" />
            <img src="/assets/images/pokemon/149-shiny.png" alt="Shiny
   Dragonite" className="pokemon-image" />
          </div>

          {/* type */}
           <div className="pokemon-types-container">
            <span className="type-badge dragon">
              <img 
  src="/assets/images/type-icons/type-icon-dragon.png" alt="Dragon" />
              Dragon
            </span>
             <span className="type-badge flying">
              <img 
  src="/assets/images/type-icons/type-icon-flying.png" alt="Flying" />
              Flying
            </span>
          </div>

          {/* Pokedex entry */}
          <div className="pokemon-description">
            <h3>Pokédex Entry</h3>
            <p>An extremely rarely seen marine Pokémon. Its
  intelligence is said to match that of humans.</p>
          </div>
      </main>
    </div>
  )
}

export  default App;