import { Controller, Get, Param, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { RecipeDto } from './dto/recipe-response.dto';
import { BadRequestException } from '@nestjs/common';


@ApiTags('recipe') // Swagger-Tag für bessere Gruppierung
@Controller('recipe') // 💡 Legt fest, dass alle Routen mit `/recipe` beginnen
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  // GET /recipe → Gibt alle Rezepte zurück
  @Get()
  @ApiOperation({ summary: 'Alle Rezepte abrufen' }) // Swagger Beschreibung
  @ApiResponse({ status: 200, description: 'Erfolgreich alle Rezepte abgerufen', type: [Recipe] })
  getAllRecipes(): Promise<Recipe[]> {
    return this.recipeService.readAll();
  }

  // WICHTIG: Diese Route MUSS VOR ':id' stehen!
@Get('search')
@ApiOperation({ summary: 'Rezepte durchsuchen (Titel, Zutaten, Tags)' })
@ApiResponse({ status: 200, description: 'Gefundene Rezepte', type: [Recipe] })
searchRecipes(@Query('q') query: string): Promise<Recipe[]> {
  return this.recipeService.search(query);
}
  

  @Get(':id')
  @ApiOperation({ summary: 'Ein Rezept nach ID abrufen' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'Die ID des Rezepts' })
  @ApiResponse({ status: 200, description: 'Rezept gefunden', type: RecipeDto })
  @ApiResponse({ status: 400, description: 'Ungültige ID (keine Zahl)' })
  @ApiResponse({ status: 404, description: 'Rezept nicht gefunden' })
  getRecipe(@Param('id') id: string): Promise<RecipeDto | null> {
    const parsedId = parseInt(id, 10);
  
    if (isNaN(parsedId)) {
      throw new BadRequestException('Ungültige ID – bitte eine Zahl angeben.');
    }
  
    return this.recipeService.readOne(parsedId);
  }
  



  // GET /recipe/user/:userId
  @Get('by-user/:userId')
  getRecipesByUser(@Param('userId') userId: number): Promise<Recipe[]> {
    return this.recipeService.getByUser(userId);
  }

    // POST für die Postman-Tests, muss dann halt auskommentiert werden
  //  @Post()
 //   createRecipe(@Body() recipeData: any): Promise<Recipe> {
  //    const userId = recipeData.userId;
  //    return this.recipeService.create(recipeData, userId);
//}
  

  // POST /recipe → Erstellt ein neues Rezept
  @Post()
  createRecipe(@Body() recipeData: any): Promise<Recipe> {
    const userId = recipeData.userId;
    return this.recipeService.createRecipe(recipeData, userId);
  }
  
  // PUT /recipe/:id → Aktualisiert ein Rezept
  @Put(':id')
  @ApiOperation({ summary: 'Ein Rezept aktualisieren' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'Die ID des zu aktualisierenden Rezepts' })
  @ApiResponse({ status: 200, description: 'Rezept erfolgreich aktualisiert', type: Recipe })
  @ApiResponse({ status: 404, description: 'Rezept nicht gefunden' })
  updateRecipe(@Param('id') id: number, @Body() data: Partial<Recipe>) {
    return this.recipeService.update(Number(id), data);
  }

  // DELETE /recipe/:id → Löscht ein Rezept
  @Delete(':id')
  @ApiOperation({ summary: 'Ein Rezept löschen' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'Die ID des zu löschenden Rezepts' })
  @ApiResponse({ status: 200, description: 'Rezept erfolgreich gelöscht' })
  @ApiResponse({ status: 404, description: 'Rezept nicht gefunden' })
  deleteRecipe(@Param('id') id: number) {
    return this.recipeService.delete(Number(id));
  }
}
