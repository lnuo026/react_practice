## 后端的"引子"是 package.json （看起来好像只是新建了几个文件）
#### 流程
  第一步：package.json 声明需要哪些包                          
  "dependencies": {                           
    "express": "^4.18.2",                                      
    "cors": "^2.8.5",                                       
    "mongoose": "^8.1.1"                                       
  }                                           
  这是"购物清单"，告诉 npm 要装什么。                          
                                                            
  第二步：终端运行 npm install                                 
                                              
  npm 读取 package.json，去网上下载所有声明的包，放进          
  node_modules/。                                              
                                                               
  第三步：代码里 import 才能用                                 
  import express from "express";  // 从 node_modules 里取出    
  express                                                      
  const app = express();          // 调用 express              
  函数创建服务器实例                      
                                                               
  ---                                                          
  总结
                                                               
  ┌───────────────────────┬────────────────────────────┐    
  │         步骤          │            作用            │
  ├───────────────────────┼────────────────────────────┤       
  │ package.json          │ 声明需要什么包（购物清单） │
  ├───────────────────────┼────────────────────────────┤       
  │ npm install           │ 下载安装这些包             │    
  ├───────────────────────┼────────────────────────────┤
  │ import                │ 在代码里引入已安装的包     │
  ├───────────────────────┼────────────────────────────┤       
  │ const app = express() │ 使用已引入的包创建服务器   │
  └───────────────────────┴────────────────────────────┘       
                                                               
  const app = express() 是使用，package.json 才是引子。




fs = File System，Node.js 内置模块，用来读写本地文件：       

import fs from "fs";                                         

fs.readFileSync("./data.json")        // 读文件              
fs.writeFileSync("./data.json", ...) // 写文件

