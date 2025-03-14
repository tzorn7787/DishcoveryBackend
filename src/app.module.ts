import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { inspect } from 'node:util';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { RecipeModule } from './recipe/recipe.module';
import { RecipeService } from './recipe/recipe.service';
import { Recipe } from './recipe/recipe.entity';
import { Ingredient } from './recipe/ingredient.entity';
import { Rating } from './recipe/rating.entity';
import { Tag } from './recipe/tag.entity';
import { RecipeReport } from './recipe-report/recipe-report.entity';
import { RecipeReportService } from './recipe-report/recipe-report.service';
import { RecipeReportModule } from './recipe-report/recipe-report.module';
import { AuthModule } from './auth/auth.modul';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [],
      autoLoadEntities: true,
      synchronize: true, // (!) disable for production
    }),
    UserModule,
    RecipeModule,
    RecipeReportModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly recipeService: RecipeService,
    private readonly recipeReportService: RecipeReportService,
    private readonly authService: AuthService
  ) {}

  async onModuleInit() {
    // Example program run. Use command "rm -f db.sqlite && npm run start" to run with a clean database

    const user = new User();
    user.username = 'm-m';
    user.email = 'm@m.de';
    user.passwordHash =
      '$2y$10$dcIRlr4MY7NQhDXzZf6snuXyIjQB3VgJzPnJG/wAwq7HksEEaMlD2'; // "password"

    const ingredient = new Ingredient();
    ingredient.name = 'ing';
    ingredient.servings = 122;
    ingredient.amount = 12;
    ingredient.unit = 'g';

    const rating = new Rating();
    rating.user = user;
    rating.comment = 'comment';
    rating.rating = 5;
    rating.updatedAt = new Date();

    const recipe = new Recipe();
    recipe.title = 'recipe';
    recipe.description = 'desc';
    recipe.text = 'text';
    recipe.imgUrl = 'url';
    recipe.difficulty = 'easy';
    recipe.prepTime = 10;
    recipe.cookTime = 20;
    recipe.ratings = [rating];
    recipe.ingredients = [ingredient];
    recipe.user = user;
    recipe.updatedAt = new Date();
    const tag = new Tag();
    tag.name = 'veggy';
    recipe.tags = [tag];

    const report = new RecipeReport();
    report.reason = 'hugo';
    report.recipe = recipe;
    report.user = user;
    report.reportedAt = new Date();

    const { id: userId } = await this.userService.create(user);
    const { id: recipeId } = await this.recipeService.create(recipe);
    const { id: recipeReportId } =
      await this.recipeReportService.create(report);

    const userRead = await this.userService.readOne(userId);
    console.log(inspect(userRead, true, 10, true));

    const recipeRead = await this.recipeService.readOne(recipeId);
    console.log(inspect(recipeRead, true, 10, true));

    const recipeReportRead =
      await this.recipeReportService.readOne(recipeReportId);
    console.log(inspect(recipeReportRead, true, 10, true));
  }
}
