# 加载图
问题： 切换宝可梦时，新图还没加载完，页面会闪烁或空白。      

解决： 用 URL 作为加载状态的标记，而不是简单的 true/false。


## 断路逻辑
A && B
- A 为 true → 执行并返回 B                                   
- A 为 false → 直接停，B 不执行    


```
 const [loadedNormalUrl, setLoadedNormalUrl] = useState(null);
  const [loadedShinyUrl, setLoadedShinyUrl] = useState(null);

  // Check if the current images have loaded by comparing URLs
  const normalLoaded = loadedNormalUrl === normalImage;
  const shinyLoaded = loadedShinyUrl === shinyImage;

  // Determine if the currently displayed image has loaded
  const isCurrentImageLoaded = displayShiny ? shinyLoaded : normalLoaded;
：                                            
                                                               
  ┌─────────────────────┬─────────┬───────────────────────┐ 
  │        变量          │  类型   │         作用          │    
  ├─────────────────────┼─────────┼───────────────────────┤ 
  │ loadedNormalUrl     │ useStat │ 记录已加载完的普通图  │
  │                     │ e       │ URL                   │    
  ├─────────────────────┼─────────┼───────────────────────┤
  │ loadedShinyUrl      │ useStat │ 记录已加载完的闪光图  │    
  │                     │ e       │ URL                   │ 
  ├─────────────────────┼─────────┼───────────────────────┤    
  │ isCurrentImageLoade │ 派生状   │ 当前显示的图是否加载  │
  │ d                   │ 态      │ 完                    │    
  └─────────────────────┴─────────┴───────────────────────┘    
   

```


---


核心逻辑：                                                

// 图片加载完 → 记录它的 URL                                 
onLoad={() => setLoadedNormalUrl(normalImage)}

// 比较 URL 判断是否加载完                                
const normalLoaded = loadedNormalUrl === normalImage;

// 没加载完就显示占位图                     
{!isCurrentImageLoaded && <img src="placeholder.svg" />} 