import { useState } from "react";
import clsx from "clsx";

export default function PokemonImageView({ normalImage, shinyImage }) {

  // 管理"当前显示的是普通图还是闪光图"
  // false → 显示普通图                                         
  // true → 显示闪光图  
  const [displayShiny, setDisplayShiny] = useState(false);


  return (
    <div className="pokemon-image-container">
      {/* 卡片右上角的小星星⭐️*/}
      <label className="star-checkbox">
        <input
          type="checkbox"
          checked={displayShiny}
          onChange={() => setDisplayShiny(!displayShiny)}
        />

        <img src="/assets/images/star-64.png" alt="Star" />
        <span className="tooltip"> see nothing</span>
      </label>

      
      {/*pokemon-image 是固定 ，key true 就是能显示 。*/}
    <img
        src={normalImage}
        alt="Normal form"
        className={clsx("pokemon-image", { visible: !displayShiny })}
        id="pokemon-image"
      />


      <img
        src={shinyImage}
        alt="Shiny Dragonite"
        className={clsx("pokemon-image", { visible: displayShiny })}
      />


    </div>
  );
}
