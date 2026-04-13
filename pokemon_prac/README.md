## interactivity
组件的互动 
user 可以直接使用search  ,select toggle 图片
之前都是固定数据 hardcode

clsx
第三方工具库，专门用来动态拼接 className。 
```
<div className={clsx("pokemon-list-item", { active: isActive
})} />    
```                                                  
- 第一个参数：固定的类名，始终添加          
- 第二个参数：对象，key 是类名，value 是条件，条件为 true 才添加     


...props 剩余参数  
...props 表示"把剩下所有没有明确取出来的props，全部收集到一个叫 props 的对象里"。

// pokemon → 取出来了
// isSelected → 取出来了
// 其他所有传进来的 props → 全部收集在 props 里
```
function PokemonListItem({ pokemon, isSelected, ...props }) {

}
```
## 实际用途：                                  
通常用来把剩余 props 传给内部的 HTML 元素：

```
<div {...props}>
```

这样父组件传进来的 onClick、className 等属性会自动透传给这个
div，不需要一个个手动写。

父组件
```
export default function PokemonList({ pokemon, selectedId, onSelectPokemon }) {
  return (
    <div className="pokemon-list">
      {pokemon.map((mon) => (
        <PokemonListItem
          key={mon._id}
          pokemon={mon}
          isSelected={mon._id === selectedId}
          onClick={() => onSelectPokemon(mon)}
        />
      ))}
    </div>
  );
}
```