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
class Ping extends Command_1.Command {
    constructor(client) {
        super(client, {
            name: 'recap',
            description: 'Recaps the last season of the club league.',
            category: 'Information',
            usage: client.settings.prefix.concat('recap [season]'),
            cooldown: 1000,
            requiredPermissions: ['SEND_MESSAGES'],
        });
        this.botClient = client;
    }
    sendErrorEmbed(respond, message, error) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const embed = new discord_js_1.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription(error)
                .setFooter('Knights', ((_a = this.botClient.user) === null || _a === void 0 ? void 0 : _a.avatarURL()) || undefined)
                .setTimestamp();
            yield respond(message.channel, embed);
        });
    }
    run(message) {
        const _super = Object.create(null, {
            respond: { get: () => super.respond }
        });
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            message.delete();
            const REQUIRED_ROLE_ID = '1016550159645151354';
            const { member } = message;
            if (!member)
                return;
            if (!member.roles.cache.has(REQUIRED_ROLE_ID)) {
                yield this.sendErrorEmbed(_super.respond, message, 'You do not have permission to use this command.');
                return;
            }
            const season = message.content.split(' ')[1];
            let embed = null;
            const cl = new ClubLeagueManipulatior_1.default();
            console.log(season);
            if (season) {
                const date = {
                    month: Number(season.split('/')[0]),
                    day: Number(season.split('/')[1]),
                    year: Number(season.split('/')[2]),
                };
                const ssn = cl.getSeasons().find((s) => s.date.month === date.month && s.date.day === date.day && s.date.year === date.year);
                console.log(ssn);
                const fields = [];
                if (!ssn) {
                    yield this.sendErrorEmbed(_super.respond, message, 'Season not found.');
                    return;
                }
                let ticketsUsed = 0;
                const MAX_TICKETS = ssn.players.length * 14;
                ssn.players.forEach((player) => {
                    ticketsUsed += player.tickets;
                });
                let trophiesUSed = 0;
                const MAX_TROPHIES = ssn.players.length * 63;
                ssn.players.forEach((player) => {
                    trophiesUSed += player.trophies;
                });
                const mostTickets = ssn.players.reduce((prev, current) => (prev.tickets > current.tickets ? prev : current));
                const mostTrophies = ssn.players.reduce((prev, current) => (prev.trophies > current.trophies ? prev : current));
                const leastTickets = ssn.players.reduce((prev, current) => (prev.tickets < current.tickets ? prev : current));
                const leastTrophies = ssn.players.reduce((prev, current) => (prev.trophies < current.trophies ? prev : current));
                fields.push({
                    name: 'Amount of tickets used',
                    value: ticketsUsed.toString(),
                });
                fields.push({
                    name: 'Tickets to max percentage',
                    value: `${(ticketsUsed / MAX_TICKETS) * 100}%`,
                });
                fields.push({
                    name: 'Amount of trophies used',
                    value: trophiesUSed.toString(),
                });
                fields.push({
                    name: 'Trophies to max percentage',
                    value: `${(trophiesUSed / MAX_TROPHIES) * 100}%`,
                });
                fields.push({
                    name: 'Most tickets used',
                    value: `${mostTickets.name} - ${mostTickets.tickets}`,
                });
                fields.push({
                    name: 'Most trophies',
                    value: `${mostTrophies.name} - ${mostTrophies.trophies}`,
                });
                fields.push({
                    name: 'Least tickets used',
                    value: `${leastTickets.name} - ${leastTickets.tickets}`,
                });
                fields.push({
                    name: 'Least trophies',
                    value: `${leastTrophies.name} - ${leastTrophies.trophies}`,
                });
                embed = new discord_js_1.MessageEmbed()
                    .setColor('#000000')
                    .setTitle(`Recap of Season ${season}`)
                    .setFooter('Knights Season Recap', ((_a = this.botClient.user) === null || _a === void 0 ? void 0 : _a.avatarURL()) || undefined)
                    .addFields(fields)
                    .setTimestamp();
            }
            if (embed !== null)
                yield _super.respond.call(this, message.channel, embed);
        });
    }
}
exports.default = Ping;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjYXAuanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsic3JjL2NvbW1hbmRzL1JlY2FwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQW1EO0FBQ25ELHdDQUFxQztBQUdyQyw0RUFBb0U7QUFFcEUsTUFBcUIsSUFBSyxTQUFRLGlCQUFPO0lBR3JDLFlBQVksTUFBaUI7UUFDekIsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNWLElBQUksRUFBRSxPQUFPO1lBQ2IsV0FBVyxFQUFFLDRDQUE0QztZQUN6RCxRQUFRLEVBQUUsYUFBYTtZQUN2QixLQUFLLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDO1lBQ3RELFFBQVEsRUFBRSxJQUFJO1lBQ2QsbUJBQW1CLEVBQUUsQ0FBQyxlQUFlLENBQUM7U0FDekMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7SUFDNUIsQ0FBQztJQUVhLGNBQWMsQ0FBQyxPQUFZLEVBQUUsT0FBZ0IsRUFBRSxLQUFhOzs7WUFDdEUsTUFBTSxLQUFLLEdBQUcsSUFBSSx5QkFBWSxFQUFFO2lCQUMzQixRQUFRLENBQUMsU0FBUyxDQUFDO2lCQUNuQixRQUFRLENBQUMsT0FBTyxDQUFDO2lCQUNqQixjQUFjLENBQUMsS0FBSyxDQUFDO2lCQUVyQixTQUFTLENBQUMsU0FBUyxFQUFFLENBQUEsTUFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksMENBQUUsU0FBUyxFQUFFLEtBQUksU0FBUyxDQUFDO2lCQUNuRSxZQUFZLEVBQUUsQ0FBQztZQUVwQixNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDOztLQUN6QztJQUVZLEdBQUcsQ0FBQyxPQUFnQjs7Ozs7O1lBQzdCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUVqQixNQUFNLGdCQUFnQixHQUFHLHFCQUFx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