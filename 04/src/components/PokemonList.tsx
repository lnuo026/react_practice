import PokemonListItem from "./PokemonListItem";

export default function PokemonList({ pokemon}) {
  return(
    <div className="pokemon-list">
      {pokemon.map((mon) =>(
        <PokemonListItem ket={mon._id} pokemon={mon}/>
      ))}
    </div>
  );
  
}
