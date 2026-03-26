//这是后端的启动文件，整个 NestJS 服务从这里开始跑
// CORS = 跨域资源共享，浏览器的安全机制。
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
  await app.listen(process.env.PORT ?? 3001)
}
bootstrap()


/**
 *   整体流程                                                               
                                                                         
  运行 npm run start:dev                                                 
          ↓                                                              
  执行 bootstrap()                                          
          ↓
  NestFactory 读取 AppModule，初始化所有模块                             
          ↓                                   
  开启 CORS，允许前端访问                                                
          ↓                                                 
  监听 3001 端口，等待请求                                               
          ↓
  后端启动完成 ✅ 
 */ 