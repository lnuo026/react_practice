 ## App.jsx里面的dummy删掉，换成 useState ，fetch后直接使用  setPokem(data);
 之前（step-05）：                           
  import { dummyData } from "./js/dummy-data.js"
  // 数据直接从本地文件来                       
                                                               
  之后（step-06）：                           
  const [pokemon, setPokemon] = useState([]);                  
  // 空数组作为初始值，等网络请求回来再填充   


开始api

`https://pkserve.ocean.anhydrous.dev/api/pokedex`


  // Function to fetch pokemon based on search gen
  async function fetchPokemonByGen(gen) {
    const url = `https://pkserve.ocean.anhydrous.dev/api/pokedex?gen=${gen}`;
    const response = await fetch(url);
    const data = await response.json();
    setPokemon(data);
  }

  // Effect to fetch pokemon when gen changes
  useEffect(() => {
    fetchPokemonByGen(searchOptions.gen);
  }, [searchOptions.gen]);c



## onChange 是事件监听，用户每次改变输入框/下拉框的值时触发：

onChange={处理函数}

处理函数会自动收到一个事件对象 e，里面有用户输入的值：
e.target       // 触发事件的那个 HTML 元素
e.target.value // 那个元素当前的值

`onChange={(e) => onSearchOptionsChange({ gen: e.target.value })}`
 { gen: e.target.value } → 构造一个对象，只更新 gen 字段

