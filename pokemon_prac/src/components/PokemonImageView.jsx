export default function PokemonImageView({ normalImage, shinyImage }) {
  return (
    <div className="pokemon-image-container">
      {/* 卡片右上角的小星星⭐️*/}
      <label className="star-checkbox">
        <input type="checkbox" />
        <img src="/assets/images/star-64.png" alt="Star" />
        <span className="tooltip"> see nothing</span>
      </label>

      
      <img
        src={normalImage}
        alt="normal pokemon"
        className="pokemon-image visible"
        id="pokemon-image"
      />
      
      <img
        src={shinyImage}
        alt="Shiny Dragonite"
        className="pokemon-image"
      />


    </div>
  );
}
