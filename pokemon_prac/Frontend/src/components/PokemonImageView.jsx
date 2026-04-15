import { useState } from "react";
import clsx from "clsx";

// normalImage, shinyImage  ，这两个props 是从父组件PokemonView传递过来的
// 分别代表宝可梦的普通形态图片URL和闪光形态图片URL
export default function PokemonImageView({ normalImage, shinyImage }) {

  // 管理"当前显示的是普通图还是闪光图"
  // false → 显示普通图                                         
  // true → 显示闪光图  
  const [displayShiny, setDisplayShiny] = useState(false);


  // 哪个 URL 的图片加载完了"，不是"有没有加载完"
  const [loadedNormalUrl, setLoadedNormalUrl] = useState(null);
  const [loadedShinyUrl, setLoadedShinyUrl] = useState(null);

  // 派生状态⁉️
  // 派生状态 就是从现有状态计算出来的值，不需要单独用 useState 存
  // 比较"记录的 URL"和"当前要显示的 URL"是否一致：
  // - 一致 → 当前图片已加载完 ✅            
  // - 不一致 → 还没加载完，显示占位图 ❌         
  const normalLoaded = loadedNormalUrl === normalImage;
  const shinyLoaded = loadedShinyUrl === shinyImage;

  
  const isCurrentImageLoaded = displayShiny ? shinyLoaded : normalLoaded;




  

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


    {/* 宝可梦还没有加载出来的一个灰色缓图案 */}
    {!isCurrentImageLoaded && (
      <img
        src="/assets/images/pokeball-placeholder.svg"
        alt="Loading..."
        className="pokemon-image visible"
        style={{ opacity: 1 }}
      />
    )}





      {/*pokemon-image 是固定 ，key true 就是能显示 。*/}
      {/* onLoad 是 HTML <img> 元素的事件，图片下载完成时自动触发  */}
      <img
        key={`normal-${normalImage}`}
        src={normalImage}
        alt="Normal form"
        className={clsx("pokemon-image", { visible: !displayShiny && normalLoaded })}
        //  图片加载完 → 把当前图片的 URL 存进 state
        onLoad={() => setLoadedNormalUrl(normalImage)}
        id="pokemon-image"
      />


      <img
        key={`shiny-${shinyImage}`}
        src={shinyImage}
        alt="Shiny Dragonite"
        className={clsx("pokemon-image", { visible: displayShiny && shinyLoaded })}
        onLoad={() => setLoadedShinyUrl(shinyImage)}
      />


    </div>
  );
}
