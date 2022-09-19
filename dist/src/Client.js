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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const discord_js_1 = require("discord.js");
const typedi_1 = require("typedi");
const Logger_1 = require("./utils/Logger");
const ActionManager_1 = require("./managers/ActionManager");
const config_1 = require("./config/config");
const ClubLeagueManipulatior_1 = require("./utils/ClubLeagueManipulatior");
let Client = class Client extends discord_js_1.Client {
    constructor(actionManager) {
        super(config_1.settings.clientOptions || {});
        this.actionManager = actionManager;
        this.settings = config_1.settings;
        this.settings.token = process.env.BOT_TOKEN || '';
        this.initialize();
        this.lastPing = this.ws.ping;
        this.interactions = {};
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.actionManager.initializeCommands(this);
                this.actionManager.initializeEvents(this);
                yield this.login(config_1.settings.token);
                new ClubLeagueManipulatior_1.default();
            }
            catch (e) {
                Logger_1.Logger.error(`Could not initialize bot: ${e}`);
            }
        });
    }
    get commands() {
        return this.actionManager.commands;
    }
    getPing() {
        return this.lastPing;
    }
    setPing(ping) {
        this.lastPing = ping;
    }
};
Client = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [ActionManager_1.ActionManager])
], Client);
exports.Client = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwic291cmNlUm9vdCI6InNyYy8iLCJzb3VyY2VzIjpbInNyYy9DbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMkNBQWlFO0FBQ2pFLG1DQUFpQztBQUNqQywyQ0FBd0M7QUFHeEMsNERBQXlEO0FBQ3pELDRDQUE0RDtBQUM1RCwyRUFBbUU7QUFHNUQsSUFBTSxNQUFNLEdBQVosTUFBTSxNQUFPLFNBQVEsbUJBQWE7SUFLckMsWUFBb0IsYUFBNEI7UUFDNUMsS0FBSyxDQUFDLGlCQUFhLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRHpCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBRTVDLElBQUksQ0FBQyxRQUFRLEdBQUcsaUJBQWEsQ0FBQztRQUU5QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDbEQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRWxCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVhLFVBQVU7O1lBQ3BCLElBQUk7Z0JBQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUMsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBR3RDLElBQUksZ0NBQXFCLEVBQUUsQ0FBQzthQUMvQjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNSLGVBQU0sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDbEQ7UUFDTCxDQUFDO0tBQUE7SUFFRCxJQUFXLFFBQVE7UUFDZixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQ3ZDLENBQUM7SUFFTSxPQUFPO1FBQ1YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFTSxPQUFPLENBQUMsSUFBWTtRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0NBQ0osQ0FBQTtBQXhDWSxNQUFNO0lBRGxCLElBQUEsZ0JBQU8sR0FBRTtxQ0FNNkIsNkJBQWE7R0FMdkMsTUFBTSxDQXdDbEI7QUF4Q1ksd0JBQU0ifQ==