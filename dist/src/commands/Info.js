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
const discord_js_1 = require("discord.js");
const Command_1 = require("../Command");
const ClubLeagueManipulatior_1 = require("../utils/ClubLeagueManipulatior");
class Info extends Command_1.Command {
    constructor(client) {
        super(client, {
            name: 'info',
            description: 'Sends admin info from the JSON file.',
            category: 'Information',
            usage: client.settings.prefix.concat('info'),
            cooldown: 1000,
            requiredPermissions: ['SEND_MESSAGES'],
        });
        this.botClient = client;
    }
    run(message, args) {
        const _super = Object.create(null, {
            respond: { get: () => super.respond }
        });
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const cl = new ClubLeagueManipulatior_1.default();
            const embed = new discord_js_1.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Info')
                .setDescription(cl.getAdminInfo())
                .setFooter('Knights', ((_a = this.botClient.user) === null || _a === void 0 ? void 0 : _a.avatarURL()) || undefined)
                .setTimestamp();
            yield _super.respond.call(this, message.channel, embed);
        });
    }
}
exports.default = Info;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mby5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJzcmMvY29tbWFuZHMvSW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJDQUFtRDtBQUNuRCx3Q0FBcUM7QUFHckMsNEVBQW9FO0FBRXBFLE1BQXFCLElBQUssU0FBUSxpQkFBTztJQUdyQyxZQUFZLE1BQWlCO1FBQ3pCLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDVixJQUFJLEVBQUUsTUFBTTtZQUNaLFdBQVcsRUFBRSxzQ0FBc0M7WUFDbkQsUUFBUSxFQUFFLGFBQWE7WUFDdkIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDNUMsUUFBUSxFQUFFLElBQUk7WUFDZCxtQkFBbUIsRUFBRSxDQUFDLGVBQWUsQ0FBQztTQUN6QyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztJQUM1QixDQUFDO0lBRVksR0FBRyxDQUFDLE9BQWdCLEVBQUUsSUFBYzs7Ozs7O1lBQzdDLE1BQU0sRUFBRSxHQUFHLElBQUksZ0NBQXFCLEVBQUUsQ0FBQztZQUV2QyxNQUFNLEtBQUssR0FBRyxJQUFJLHlCQUFZLEVBQUU7aUJBQzNCLFFBQVEsQ0FBQyxTQUFTLENBQUM7aUJBQ25CLFFBQVEsQ0FBQyxNQUFNLENBQUM7aUJBQ2hCLGNBQWMsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBRWpDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQSxNQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSwwQ0FBRSxTQUFTLEVBQUUsS0FBSSxTQUFTLENBQUM7aUJBQ25FLFlBQVksRUFBRSxDQUFDO1lBRXBCLE1BQU0sT0FBTSxPQUFPLFlBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQzs7S0FDL0M7Q0FDSjtBQTdCRCx1QkE2QkMifQ==