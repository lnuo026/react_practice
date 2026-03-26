"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const controller_1 = require("./controller");
const service_1 = require("./service");
const game_sessionSchema_1 = require("./game-sessionSchema");
const auth_module_1 = require("../auth/auth.module");
let GameModule = class GameModule {
};
exports.GameModule = GameModule;
exports.GameModule = GameModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: game_sessionSchema_1.GameSession.name, schema: game_sessionSchema_1.GameSessionSchema },
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [controller_1.GameController],
        providers: [service_1.GameService],
    })
], GameModule);
//# sourceMappingURL=module.js.map