import { OnModuleInit } from '@nestjs/common';
import { UserService } from './user/user.service';
import { RecipeService } from './recipe/recipe.service';
import { RecipeReportService } from './recipe-report/recipe-report.service';
export declare class AppModule implements OnModuleInit {
    private readonly userService;
    private readonly recipeService;
    private readonly recipeReportService;
    constructor(userService: UserService, recipeService: RecipeService, recipeReportService: RecipeReportService);
    onModuleInit(): Promise<void>;
}
