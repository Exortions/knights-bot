"use strict";
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
const Logger_1 = require("../utils/Logger");
class Ready {
    constructor(client) {
        this.client = client;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client.user) {
                Logger_1.Logger.info(`${this.client.user.username} is running.`);
                this.client.user.setPresence(this.client.settings.presence);
            }
        });
    }
}
exports.default = Ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhZHkuanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsic3JjL2V2ZW50cy9SZWFkeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDRDQUF5QztBQUd6QyxNQUFxQixLQUFLO0lBQ3RCLFlBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUcsQ0FBQztJQUV6QixHQUFHOztZQUNaLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2xCLGVBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLGNBQWMsQ0FBQyxDQUFDO2dCQUN4RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDL0Q7UUFDTCxDQUFDO0tBQUE7Q0FDSjtBQVRELHdCQVNDIn0=