import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { UsersService } from './service'
import { AuthGuard } from '../auth/auth.guard'

/**@Controller 是装饰器，作用就一个：告诉 NestJS 这个类负责哪个 URL 路径  
    和文件自己的文件名字没有关系, ← 'users' 是 URL 路径  
    @Controller('users') 是前缀，方法上的 @Get() @Post()
    是后缀，拼在一起就是完整路径。*/
@Controller('users')
export class UsersController{
    // private  │ 只能在这个类内部用，外部访问不到
    // readonly 赋值后不能再改，防止意外覆盖  
    constructor(private readonly usersService: UsersService ){}


    // POST /users/login — 前端登录后调用，存用户到数据库
  @Post('login')
  @UseGuards(AuthGuard)
  async login(@Req() req) {
    const { uid, email, name, picture } = req.user
    return this.usersService.upsert({
      uid,
      email,
      displayName: name,
      photoURL: picture,
    })
  }

  // GET /users/me — 获取当前用户信息
  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req) {
    return this.usersService.findByUid(req.user.uid)
  }

  // GET /users — 获取所有登录过的用户
  @Get()
  @UseGuards(AuthGuard)
  async getAll() {
    return this.usersService.findAll()
  }
}