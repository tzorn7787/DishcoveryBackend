import { Controller, Get, Param, Post, Body, Put, Delete, Patch, UseInterceptors, UploadedFile} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('user') // 💡 Swagger-Kategorie für User-Endpoints
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /user → Gibt alle Benutzer zurück
  @Get()
  @ApiOperation({ summary: 'Alle Benutzer abrufen' }) // Swagger-Beschreibung
  @ApiResponse({ status: 200, description: 'Gibt alle Benutzer zurück', type: [User] })
  getAllUsers(): Promise<User[]> {
    return this.userService.readAll();
  }

  // GET /user/:id → Gibt einen Benutzer anhand der ID zurück
  @Get(':id')
  @ApiOperation({ summary: 'Einen Benutzer anhand der ID abrufen' })
  @ApiResponse({ status: 200, description: 'Gibt einen Benutzer zurück', type: User })
  @ApiResponse({ status: 404, description: 'Benutzer nicht gefunden' })
  getUser(@Param('id') id: number): Promise<User | null> {
    return this.userService.readOne(Number(id));
  }

  // POST /user → Erstellt einen neuen Benutzer
  @Post()
  @ApiOperation({ summary: 'Einen neuen Benutzer erstellen' })
  @ApiResponse({ status: 201, description: 'Benutzer erfolgreich erstellt', type: User })
  @ApiResponse({ status: 400, description: 'Ungültige Eingabe' })
  createUser(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }


  @Put(':id/update-profile')
  async updateProfile(
    @Param('id') id: number,
    @Body() data: any,
    @UploadedFile() profileImage: Express.Multer.File
  ) {
    console.log(`Empfangene Daten für User ${id}:`, data);

    const updatedData = { ...data };

    return this.userService.updateProfile(id, updatedData);
  }
  


  // DELETE /user/:id → Löscht einen Benutzer
  @Delete(':id')
  @ApiOperation({ summary: 'Einen Benutzer löschen' })
  @ApiResponse({ status: 204, description: 'Benutzer erfolgreich gelöscht' })
  @ApiResponse({ status: 404, description: 'Benutzer nicht gefunden' })
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.delete(Number(id));
  }

 
  

}
