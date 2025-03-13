import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user') // 💡 Legt fest, dass alle Routen mit `/user` beginnen
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /user → Gibt alle Benutzer zurück
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.readAll();
  }

  // GET /user/:id → Gibt einen Benutzer anhand der ID zurück
  @Get(':id')
  getUser(@Param('id') id: number): Promise<User | null> {
    return this.userService.readOne(Number(id));
  }

  // POST /user → Erstellt einen neuen Benutzer
  @Post()
  createUser(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  // PUT /user/:id → Aktualisiert einen Benutzer
  @Put(':id')
  updateUser(@Param('id') id: number, @Body() data: Partial<User>) {
    return this.userService.update(Number(id), data);
  }

  // DELETE /user/:id → Löscht einen Benutzer
  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.delete(Number(id));
  }
}
