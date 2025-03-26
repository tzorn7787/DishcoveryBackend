import { Controller, Get, Param, Post, Body, Put, Delete, Req } from '@nestjs/common';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { id: number };
}
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';

import { WatchEntry } from './watch-entry.entity';
import { FavoriteEntry } from './favorite-entry.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ✅ GET /user → Alle Benutzer abrufen
  @Get()
  @ApiOperation({ summary: 'Alle Benutzer abrufen' })
  @ApiResponse({ status: 200, description: 'Liste aller Benutzer', type: [User] })
  getAllUsers(): Promise<User[]> {
    return this.userService.readAll();
  }

  // ✅ GET /user/:id → Einzelnen Benutzer abrufen
  @Get(':id')
  @ApiOperation({ summary: 'Benutzer nach ID abrufen' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Benutzer gefunden', type: User })
  @ApiResponse({ status: 404, description: 'Benutzer nicht gefunden' })
  getUser(@Param('id') id: number): Promise<User | null> {
    return this.userService.readOne(Number(id));
  }

  // ✅ POST /user → Neuen Benutzer erstellen
  @Post()
  @ApiOperation({ summary: 'Neuen Benutzer registrieren' })
  @ApiResponse({ status: 201, description: 'Benutzer erstellt', type: User })
  @ApiResponse({ status: 400, description: 'Ungültige Eingabedaten' })
  createUser(@Body() userDto: CreateUserDto): Promise<User> {
    return this.userService.create(userDto);
  }

  // ✅ PUT /user/:id/update-profile → Profil aktualisieren
  @Put(':id/update-profile')
  @ApiOperation({ summary: 'Profil aktualisieren' })
  @ApiResponse({ status: 200, description: 'Profil erfolgreich aktualisiert', type: User })
  async updateProfile(@Param('id') id: number, @Body() data: UpdateUserDto): Promise<User> {
    return this.userService.updateProfile(id, data);
  }

  // ✅ DELETE /user/:id → Benutzer löschen
  @Delete(':id')
  @ApiOperation({ summary: 'Benutzer löschen' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Benutzer gelöscht' })
  @ApiResponse({ status: 404, description: 'Benutzer nicht gefunden' })
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.delete(Number(id));
  }

  // POST /user/:id/favlist
  @Post(':id/favlist')
  toggleFavorite(@Param('id') userId: number, @Body('recipeId') recipeId: number) {
    return this.userService.toggleFavorite(userId, recipeId);
  }

  // POST /user/:id/watchlist
  @Post(':id/watchlist')
  toggleWatch(@Param('id') userId: number, @Body('recipeId') recipeId: number) {
    return this.userService.toggleWatch(userId, recipeId);
  }

  @Get(':userId/watchlist')
  getWatchlist(@Param('userId') userId: number): Promise<WatchEntry[]> {
    return this.userService.getWatchlist(userId);
  }

  @Get(':userId/favlist')
  getFavorites(@Param('userId') userId: number): Promise<FavoriteEntry[]> {
    return this.userService.getFavorites(userId);
  }
}
