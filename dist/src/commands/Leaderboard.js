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
class Leaderboard extends Command_1.Command {
    constructor(client) {
        super(client, {
            name: 'leaderboard',
            description: 'Displays the leaderboard for trophies or club league.',
            category: 'Information',
            usage: client.settings.prefix.concat('leaderboard <type>'),
            cooldown: 1000,
            requiredPermissions: ['SEND_MESSAGES'],
        });
        this.botClient = client;
    }
    run(message) {
        const _super = Object.create(null, {
            respond: { get: () => super.respond }
        });
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const type = message.content.split(' ')[1];
            if (!type) {
                yield _super.respond.call(this, message.channel, 'Please specify a type.');
                return;
            }
            if (type === 'trophies') {
                const embed = new discord_js_1.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Trophies Leaderboard')
                    .setDescription('Leaderboard for Club Trophies.')
                    .setFooter('Knights', ((_a = this.botClient.user) === null || _a === void 0 ? void 0 : _a.avatarURL()) || undefined)
                    .setTimestamp();
                yield _super.respond.call(this, message.channel, embed);
            }
            else if (type === 'cl') {
                const embed = new discord_js_1.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Club League Leaderboard')
                    .setDescription('Leaderboard for the last 3 seasons of club league.')
                    .setFooter('Knights', ((_b = this.botClient.user) === null || _b === void 0 ? void 0 : _b.avatarURL()) || undefined)
                    .setTimestamp();
                yield _super.respond.call(this, message.channel, embed);
            }
        });
    }
}
exports.default = Leaderboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGVhZGVyYm9hcmQuanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsic3JjL2NvbW1hbmRzL0xlYWRlcmJvYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQW1EO0FBRW5ELHdDQUFxQztBQUdyQyxNQUFxQixXQUFZLFNBQVEsaUJBQU87SUFHNUMsWUFBWSxNQUFpQjtRQUN6QixLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ1YsSUFBSSxFQUFFLGFBQWE7WUFDbkIsV0FBVyxFQUFFLHVEQUF1RDtZQUNwRSxRQUFRLEVBQUUsYUFBYTtZQUN2QixLQUFLLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDO1lBQzFELFFBQVEsRUFBRSxJQUFJO1lBQ2QsbUJBQW1CLEVBQUUsQ0FBQyxlQUFlLENBQUM7U0FDekMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7SUFDNUIsQ0FBQztJQUVZLEdBQUcsQ0FBQyxPQUFnQjs7Ozs7O1lBQzdCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTNDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1AsTUFBTSxPQUFNLE9BQU8sWUFBQyxPQUFPLENBQUMsT0FBTyxFQUFFLHdCQUF3QixDQUFDLENBQUM7Z0JBQy9ELE9BQU87YUFDVjtZQUVELElBQUksSUFBSSxLQUFLLFVBQVUsRUFBRTtnQkFDckIsTUFBTSxLQUFLLEdBQUcsSUFBSSx5QkFBWSxFQUFFO3FCQUMzQixRQUFRLENBQUMsU0FBUyxDQUFDO3FCQUNuQixRQUFRLENBQUMsc0JBQXNCLENBQUM7cUJBQ2hDLGNBQWMsQ0FBQyxnQ0FBZ0MsQ0FBQztxQkFFaEQsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFBLE1BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLDBDQUFFLFNBQVMsRUFBRSxLQUFJLFNBQVMsQ0FBQztxQkFDbkUsWUFBWSxFQUFFLENBQUM7Z0JBRXBCLE1BQU0sT0FBTSxPQUFPLFlBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQzthQUMvQztpQkFBTSxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ3RCLE1BQU0sS0FBSyxHQUFHLElBQUkseUJBQVksRUFBRTtxQkFDM0IsUUFBUSxDQUFDLFNBQVMsQ0FBQztxQkFDbkIsUUFBUSxDQUFDLHlCQUF5QixDQUFDO3FCQUNuQyxjQUFjLENBQUMsb0RBQW9ELENBQUM7cUJBQ3BFLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQSxNQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSwwQ0FBRSxTQUFTLEVBQUUsS0FBSSxTQUFTLENBQUM7cUJBQ25FLFlBQVksRUFBRSxDQUFDO2dCQUVwQixNQUFNLE9BQU0sT0FBTyxZQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDL0M7O0tBQ0o7Q0FDSjtBQTdDRCw4QkE2Q0MifQ==