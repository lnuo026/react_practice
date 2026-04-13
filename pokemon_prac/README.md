# conditonal render + placeholder
``` dummy-data.js
export const placeholderPokemon = {
  _id: "0",
  dexNumber: "---",
  name: "---",
  gen: 0,
  normalImage: "/assets/images/pokeball-placeholder.svg",
  shinyImage: "/assets/images/pokeball-placeholder.svg",
  types: [],
  crySound: "",
  dexEntry: "---"
};
```


## <PokemonView pokemon={null} />
    
### 1. 条件渲染                                                  
// 方式一：三元运算符                                     
return pokemon ? <PokemonView pokemon={pokemon} /> :<p>请选择一只宝可梦</p>

// 方式二：&& 短路                      
```return pokemon && <PokemonView pokemon={pokemon} /> ```

// 三元运算符                                                
```
condition ? <A /> : <B />
// condition 为真 → 渲染 A                                   
// condition 为假 → 渲染 B                                

// && 短路                                                   
condition && <A />                      
// condition 为真 → 渲染 A                                   
// condition 为假 → 什么都不渲染   
```
---

#### || 的规则：左边是"有值的"就用左边，左边是"空的"就用右边。     (兜底)
`const { name, dexNumber, dexEntry, normalImage, shinyImage, types } = `
        `   pokemon || placeholderPokemon;`

"hello" || "默认值"   // 结果："hello"（左边有值）           
null    || "默认值"   // 结果："默认值"（左边是null，用右边）
undefined || "默认值" //                    
结果："默认值"（左边是undefined，用右边）          

### 2. null / undefined 的区别
- null：明确表示"没有值"，需要主动赋值                     
- undefined：变量存在但没赋值，或者 props 没传            


### 3. useState 初始值为 null                                    
`const [selectedPokemon, setSelectedPokemon] = useState(null);`
初始状态没有选中任何宝可梦，所以初始值设为 null。            

### 4. 可选链 ?.                                              
// 不用可选链，pokemon 是 null 时会报错：                    
pokemon.name  // ❌ Cannot read properties of null           

// 用可选链，null 时直接返回 undefined，不报错：             
pokemon?.name  // ✅                                         


