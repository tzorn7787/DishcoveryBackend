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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeController = void 0;
const common_1 = require("@nestjs/common");
const recipe_service_1 = require("./recipe.service");
const recipe_entity_1 = require("./recipe.entity");
let RecipeController = class RecipeController {
    recipeService;
    constructor(recipeService) {
        this.recipeService = recipeService;
    }
    getAllRecipes() {
        return this.recipeService.readAll();
    }
    getRecipe(id) {
        return this.recipeService.readOne(Number(id));
    }
    createRecipe(recipe) {
        return this.recipeService.create(recipe);
    }
    updateRecipe(id, data) {
        return this.recipeService.update(Number(id), data);
    }
    deleteRecipe(id) {
        return this.recipeService.delete(Number(id));
    }
};
exports.RecipeController = RecipeController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getAllRecipes", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getRecipe", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recipe_entity_1.Recipe]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "createRecipe", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "updateRecipe", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "deleteRecipe", null);
exports.RecipeController = RecipeController = __decorate([
    (0, common_1.Controller)('recipe'),
    __metadata("design:paramtypes", [recipe_service_1.RecipeService])
], RecipeController);
//# sourceMappingURL=recipe.controller.js.map