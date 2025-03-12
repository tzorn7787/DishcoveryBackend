import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';


//http://localhost:3000/user
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  readAll() {
    return this.userService.readAll();
  }

  @Get(':id')
  readOne(@Param('id') id: string) {
    return this.userService.readOne(+id);
  }
}
