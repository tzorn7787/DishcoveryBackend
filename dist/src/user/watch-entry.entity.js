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
exports.WatchEntry = void 0;
const recipe_entity_1 = require("../recipe/recipe.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
let WatchEntry = class WatchEntry {
    id;
    user;
    recipe;
    savedAt;
};
exports.WatchEntry = WatchEntry;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WatchEntry.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], WatchEntry.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => recipe_entity_1.Recipe),
    __metadata("design:type", recipe_entity_1.Recipe)
], WatchEntry.prototype, "recipe", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], WatchEntry.prototype, "savedAt", void 0);
exports.WatchEntry = WatchEntry = __decorate([
    (0, typeorm_1.Entity)()
], WatchEntry);
//# sourceMappingURL=watch-entry.entity.js.map