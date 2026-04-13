//硬编码 ,把静态 HTML 结构塞进 React 组件

function App() {
    return (
      <div className="pokedex-container">

        <nav className="siderbar">
          <h1>Pokédex</h1>

   {/* Search bar */}
        <div className="search-container">
          <select className="search-input generation-filter">
            <option value="all">All Generations</option>
            <option value="1">Gen 1 (Kanto)</option>
            <option value="2">Gen 2 (Johto)</option>
            <option value="3">Gen 3 (Hoenn)</option>
            <option value="4">Gen 4 (Sinnoh)</option>
            <option value="5">Gen 5 (Unova)</option>
            <option value="6">Gen 6 (Kalos)</option>
            <option value="7">Gen 7 (Alola)</option>
            <option value="8">Gen 8 (Galar & Hisui)</option>
            <option value="9">Gen 9 (Paldea)</option>
          </select>
          <input type="text" className="search-input" placeholder="Search Pokémon..." />
        </div>

          <div className="pokemon-list">  

              {/* 单个宝可梦 */}
          <div className="pokemon-list-item">
            <span className="pokemon-number">#003</span>
            <span className="pokemon-name">Venusaur</span>
          </div>        
          
          <div className="pokemon-list-item">
            <span className="pokemon-number">#006</span>
            <span className="pokemon-name">Charizard</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#009</span>
            <span className="pokemon-name">Blastoise</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#025</span>
            <span className="pokemon-name">Pikachu</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#059</span>
            <span className="pokemon-name">Arcanine</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#094</span>
            <span className="pokemon-name">Gengar</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#130</span>
            <span className="pokemon-name">Gyarados</span>
          </div>
          <div className="pokemon-list-item active">
            <span className="pokemon-number">#149</span>
            <span className="pokemon-name">Dragonite</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#150</span>
            <span className="pokemon-name">Mewtwo</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#151</span>
            <span className="pokemon-name">Mew</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#155</span>
            <span className="pokemon-name">Cyndaquil</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#157</span>
            <span className="pokemon-name">Typhlosion</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#181</span>
            <span className="pokemon-name">Ampharos</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#196</span>
            <span className="pokemon-name">Espeon</span>
          </div>
          <div className="pokemon-list-item">
            <span className="pokemon-number">#248</span>
            <span className="pokemon-name">Tyranitar</span>
          </div>
        </div>
      </nav>

      {/* right 的panle ，宝可梦detail */}
      <main className="main-content">
        
        {/* Pokemon header */}
                <div className="pokemon-header">
                  <h1 className="pokemon-name">Dragonite</h1>
                  <span className="pokemon-number">#149</span>
                </div>
        
      </main>
    </div>
  );
}

export default App; 

