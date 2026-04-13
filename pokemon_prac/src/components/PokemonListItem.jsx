export default function PokemonListItem({ pokemon }) {
  // TODO Give "active" CSS class when active/selected
  const { dexNumber, name } = pokemon;

  return (
    <div className="pokemon-list-item">
      <span className="pokemon-number">{dexNumber}</span>
      <span className="pokemon-name">{name}</span>
    </div>
  );
}
