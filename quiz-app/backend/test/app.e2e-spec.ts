/**
 * app.e2e-spec.ts — E2E（端到端）测试文件                   
  - 启动整个 NestJS 应用（AppModule）                          
  - 用 supertest 模拟真实 HTTP 请求                            
  - 测试 GET / 路由，期望返回 200 和 "Hello World!"            
  - 这是 NestJS 脚手架自动生成的默认测试  
   设置文件，告诉程序"怎么跑测试"，不用管它。 
 */ 
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
