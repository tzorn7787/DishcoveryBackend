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
exports.RecipeReport = void 0;
const recipe_entity_1 = require("../recipe/recipe.entity");
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
let RecipeReport = class RecipeReport {
    id;
    recipe;
    user;
    reportedAt;
    reason;
};
exports.RecipeReport = RecipeReport;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RecipeReport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => recipe_entity_1.Recipe),
    __metadata("design:type", recipe_entity_1.Recipe)
], RecipeReport.prototype, "recipe", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], RecipeReport.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], RecipeReport.prototype, "reportedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RecipeReport.prototype, "reason", void 0);
exports.RecipeReport = RecipeReport = __decorate([
    (0, typeorm_1.Entity)()
], RecipeReport);
//# sourceMappingURL=recipe-report.entity.js.map