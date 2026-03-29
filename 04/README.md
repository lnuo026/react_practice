# Each branch is a separate practice exercise with its own commits;
### cooool;


## 拆分组件App.tsx
 App.tsx（变得简洁）                                               
  ├── SearchBar.tsx                                                   
  ├── PokemonList.tsx                                                 
  │   └── PokemonListItem.tsx                                         
  └── PokemonView.tsx                                       
      ![alt text](image.png)
      ├── PokemonImageView.tsx                                        
      ├── PokemonTypesList.tsx            
      │   └── TypeBadge.tsx                                           
      └── PokedexEntry.tsx    


## step-03                                      
用真实数据（假数据）替换写死的内容，通过 props 传递给组件。
所有组件开始接收 props，不再写死内容                              
  - 用 .map() 遍历数组，生成列表         


## 06
  把假数据换成真实 API