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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly recipeService: RecipeService,
    private readonly recipeReportService: RecipeReportService,
    private readonly authService: AuthService,
  ) {}

  async onModuleInit() {}
}
