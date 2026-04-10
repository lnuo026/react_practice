import { useState, useEffect } from "react";
import axios from "axios";

/**
 * A custom hook which fetches data from the given URL. Includes functionality to determine
 * whether the data is still being loaded or not.
 * 
 * 
 *  useGet 是一个封装好的"数据获取工具"，传入
  URL 就自动帮你发请求、管理加载状态、支持手动刷新。
 */
export default function useGet(url, initialState = null) {
  const [data, setData] = useState(initialState);
  const [isLoading, setLoading] = useState(false);
  const [refreshToggle, setRefreshToggle] = useState(false);

  // 组件渲染完之后执行的操作叫"副作用"
  useEffect(() => {
    async function fetchData() {
      // // 开始加载，isLoading = true       
      setLoading(true);
      //发请求给后端                      
      const response = await axios.get(url);
      // 把拿到的数据存进状态
      setData(response.data);
      // 加载完成，isLoading = false
      setLoading(false);
    }
    fetchData();
    // 依赖项：url 和 refreshToggle，当 url 发生变化时，重新获取数据
    // url 或 refreshToggle变化时重新执行
    }, [url, refreshToggle]);



  function refresh() {
    // // true → false → true，每次取反     
    //  refreshToggle 变化会触发 useEffect                     
  // 重新执行，重新拉一次数据。用来实现"刷新数据"的功能。                // 
    setRefreshToggle(!refreshToggle);
  }


  //  使用这个 Hook 的组件可以拿到
  // - data — 后端返回的数据
  // - isLoading — 是否还在加载（可以用来显示 loading 动画）
  // - refresh — 手动触发重新拉数据的函数   
  return { data, isLoading, refresh };
}
