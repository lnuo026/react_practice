export default function PokemonListItem({pokemon}) {
  
  const { dexNumber ,name} = pokemon;
  
  return (
    <div className="pokemon-list-item">
      <span className="pokemon-number">#1{ dexNumber}</span>
      <span className="pokemon-name">{name}</span>
    </div>
  );
}
