import PokemonImageView from "./PokemonImageView.jsx";
import PokemonTypesList from "./PokemonTypesList.jsx";
import PokedexEntry from "./PokedexEntry.jsx";
import { placeholderPokemon } from "../js/dummy-data.js";
import { useEffect, useState } from "react";




export default function PokemonView({ dexNumber }) {
  const [pokemon, setPokemon] = useState(null);

  // Function to fetch pokemon details by dex number
  async function fetchPokemonDetails(dexNumber) {
    if (!dexNumber) return setPokemon(null); // Clear pokemon if no dex number
    const url = `https://pkserve.ocean.anhydrous.dev/api/pokedex/${dexNumber}`;
    const response = await fetch(url);
    const data = await response.json();
    setPokemon(data);
  }

  useEffect(()=>{
    fetchPokemonDetails(dexNumber);
  }, [dexNumber])


const { name, dexEntry, normalImage, shinyImage, types } = pokemon || placeholderPokemon;


  return (
    <main className="main-content">
      {/* Pokemon header */}
          <div className="pokemon-header">
        <h1 className="pokemon-name">{name}</h1>
        {/*  在字符串左边补 "0"，直到总长度达到 3   
         - 第一个参数 3：目标总长度
        - 第二个参数 "0"：用什么字符来补 */}
        {/* {dexNumber?.toString().padStart(3, "0") || "---"}  ： 数据没有时显示占位符而不是崩溃。  */}
        <span className="pokemon-number">#{dexNumber?.toString().padStart(3, "0") || "---"}</span>
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