import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';


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

  // GET /recipe/:id → Gibt ein Rezept nach ID zurück
  @Get(':id')
  @ApiOperation({ summary: 'Ein Rezept nach ID abrufen' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'Die ID des Rezepts' })
  @ApiResponse({ status: 200, description: 'Rezept gefunden', type: Recipe })
  @ApiResponse({ status: 404, description: 'Rezept nicht gefunden' })
  getRecipe(@Param('id') id: number): Promise<Recipe | null> {
    return this.recipeService.readOne(Number(id));
  }

  // GET /recipe/user/:userId
  @Get('by-user/:userId')
  getRecipesByUser(@Param('userId') userId: number): Promise<Recipe[]> {
    return this.recipeService.getByUser(userId);
  }

    // POST für die Postman-Tests, muss dann halt auskommentiert werden
  //  @Post()
 //   createRecipe1(@Body() recipeData: any): Promise<Recipe> {
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
