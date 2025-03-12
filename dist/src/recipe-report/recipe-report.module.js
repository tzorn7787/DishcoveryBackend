"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeReportModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const recipe_report_controller_1 = require("./recipe-report.controller");
const recipe_report_entity_1 = require("./recipe-report.entity");
const recipe_report_service_1 = require("./recipe-report.service");
let RecipeReportModule = class RecipeReportModule {
};
exports.RecipeReportModule = RecipeReportModule;
exports.RecipeReportModule = RecipeReportModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([recipe_report_entity_1.RecipeReport])],
        providers: [recipe_report_service_1.RecipeReportService],
        controllers: [recipe_report_controller_1.RecipeReportController],
        exports: [recipe_report_service_1.RecipeReportService],
    })
], RecipeReportModule);
//# sourceMappingURL=recipe-report.module.js.map