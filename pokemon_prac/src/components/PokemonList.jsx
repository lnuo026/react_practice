import PokemonListItem from './PokemonListItem.jsx';

export default function PokemonList({ pokemonData }) {
  return (
    <div className="pokemon-list">
      {pokemonData.map((pokemon) => (
        <PokemonListItem key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}