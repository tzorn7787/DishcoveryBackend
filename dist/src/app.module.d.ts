import { OnModuleInit } from '@nestjs/common';
import { UserService } from './user/user.service';
import { RecipeService } from './recipe/recipe.service';
import { RecipeReportService } from './recipe-report/recipe-report.service';
import { AuthService } from './auth/auth.service';
export declare class AppModule implements OnModuleInit {
    private readonly userService;
    private readonly recipeService;
    private readonly recipeReportService;
    private readonly authService;
    constructor(userService: UserService, recipeService: RecipeService, recipeReportService: RecipeReportService, authService: AuthService);
    onModuleInit(): Promise<void>;
}
