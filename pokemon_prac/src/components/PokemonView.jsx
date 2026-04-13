import PokemonImageView from "./PokemonImageView.jsx";
import PokemonTypesList from "./PokemonTypesList.jsx";
import PokedexEntry from "./PokedexEntry.jsx";
import { placeholderPokemon } from "../js/dummy-data.js";



export default function PokemonView({ pokemon }) {

  // 如果 pokemon 是 null 或 undefined，则使用 placeholderPokemon
  const { name, dexNumber, dexEntry, normalImage, shinyImage, types } =
   pokemon || placeholderPokemon; 


   
  return (
    <main className="main-content">
      {/* Pokemon header */}
          <div className="pokemon-header">
        <h1 className="pokemon-name">{name}</h1>
        {/*  在字符串左边补 "0"，直到总长度达到 3   
         - 第一个参数 3：目标总长度
        - 第二个参数 "0"：用什么字符来补 */}
        <span className="pokemon-number">#{dexNumber.toString().padStart(3, "0")}</span>
      </div>

      {/* Pokemon image */}
       <PokemonImageView  normalImage={normalImage} shinyImage={shinyImage}/> 

      {/* Pokemon types */}
      <PokemonTypesList  types={types}/>

      {/* Pokedex entry */}
      <PokedexEntry dexEntry={dexEntry}/>
    </main>
  );
}