"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const node_util_1 = require("node:util");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_entity_1 = require("./user/user.entity");
const user_module_1 = require("./user/user.module");
const user_service_1 = require("./user/user.service");
const recipe_module_1 = require("./recipe/recipe.module");
const recipe_service_1 = require("./recipe/recipe.service");
const recipe_entity_1 = require("./recipe/recipe.entity");
const ingredient_entity_1 = require("./recipe/ingredient.entity");
const rating_entity_1 = require("./recipe/rating.entity");
const tag_entity_1 = require("./recipe/tag.entity");
const recipe_report_entity_1 = require("./recipe-report/recipe-report.entity");
const recipe_report_service_1 = require("./recipe-report/recipe-report.service");
const recipe_report_module_1 = require("./recipe-report/recipe-report.module");
let AppModule = class AppModule {
    userService;
    recipeService;
    recipeReportService;
    constructor(userService, recipeService, recipeReportService) {
        this.userService = userService;
        this.recipeService = recipeService;
        this.recipeReportService = recipeReportService;
    }
    async onModuleInit() {
        const user = new user_entity_1.User();
        user.username = 'm-m';
        user.email = 'm@m.de';
        user.passwordHash =
            '$2y$10$dcIRlr4MY7NQhDXzZf6snuXyIjQB3VgJzPnJG/wAwq7HksEEaMlD2';
        const ingredient = new ingredient_entity_1.Ingredient();
        ingredient.name = 'ing';
        ingredient.servings = '122';
        ingredient.amount = 12;
        ingredient.unit = 'g';
        const rating = new rating_entity_1.Rating();
        rating.user = user;
        rating.comment = 'comment';
        rating.rating = 5;
        rating.updatedAt = new Date();
        const recipe = new recipe_entity_1.Recipe();
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
        const tag = new tag_entity_1.Tag();
        tag.name = 'veggy';
        recipe.tags = [tag];
        const report = new recipe_report_entity_1.RecipeReport();
        report.reason = 'hugo';
        report.recipe = recipe;
        report.user = user;
        report.reportedAt = new Date();
        const { id: userId } = await this.userService.create(user);
        const { id: recipeId } = await this.recipeService.create(recipe);
        const { id: recipeReportId } = await this.recipeReportService.create(report);
        const userRead = await this.userService.readOne(userId);
        console.log((0, node_util_1.inspect)(userRead, true, 10, true));
        const recipeRead = await this.recipeService.readOne(recipeId);
        console.log((0, node_util_1.inspect)(recipeRead, true, 10, true));
        const recipeReportRead = await this.recipeReportService.readOne(recipeReportId);
        console.log((0, node_util_1.inspect)(recipeReportRead, true, 10, true));
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'db.sqlite',
                entities: [],
                autoLoadEntities: true,
                synchronize: true,
            }),
            user_module_1.UserModule,
            recipe_module_1.RecipeModule,
            recipe_report_module_1.RecipeReportModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        recipe_service_1.RecipeService,
        recipe_report_service_1.RecipeReportService])
], AppModule);
//# sourceMappingURL=app.module.js.map