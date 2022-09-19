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
            const REQUIRED_ROLE_ID = '1016550159645151354';
            const { member } = message;
            if (!member)
                return;
            if (!member.roles.cache.has(REQUIRED_ROLE_ID)) {
                yield this.sendErrorEmbed(_super.respond, message, 'You do not have permission to use this command.');
                return;
            }
            let season = message.content.split(' ')[1];
            let embed = null;
            const cl = new ClubLeagueManipulatior_1.default();
            if (!season) {
                const lastSeason = cl.getLastSeason();
                if (!lastSeason) {
                    yield this.sendErrorEmbed(_super.respond, message, 'No season found.');
                    return;
                }
                season = `${lastSeason.month}/${lastSeason.day}/${lastSeason.year}`;
            }
            if (season) {
                const date = {
                    month: Number(season.split('/')[0]),
                    day: Number(season.split('/')[1]),
                    year: Number(season.split('/')[2]),
                };
                const ssn = cl.getSeasons().find((s) => s.date.month === date.month && s.date.day === date.day && s.date.year === date.year);
                const fields = [];
                if (!ssn) {
                    yield this.sendErrorEmbed(_super.respond, message, 'Season not found.');
                    return;
                }
                if (ssn.players.length < 3) {
                    yield this.sendErrorEmbed(_super.respond, message, 'Not enough players to create a recap.');
                    return;
                }
                console.log(season);
                let ticketsUsed = 0;
                const MAX_TICKETS = ssn.players.length * 14;
                ssn.players.forEach((player) => {
                    ticketsUsed += player.tickets;
                });
                let trophiesUsed = 0;
                const MAX_TROPHIES = ssn.players.length * 63;
                ssn.players.forEach((player) => {
                    trophiesUsed += player.trophies;
                });
                const topThreeTrophies = ssn.players.sort((a, b) => b.trophies - a.trophies);
                const leastTickets = ssn.players.reduce((prev, current) => (prev.tickets < current.tickets ? prev : current));
                const leastTrophies = ssn.players.reduce((prev, current) => (prev.trophies < current.trophies ? prev : current));
                fields.push({
                    name: 'Tickets used',
                    value: `${ticketsUsed.toString()}/${MAX_TICKETS.toString()}`,
                    inline: true,
                });
                fields.push({
                    name: 'Tickets vs max',
                    value: `${((ticketsUsed / MAX_TICKETS) * 100).toFixed(2)}%`,
                    inline: true,
                });
                fields.push({ name: 'Top Trophies', value: `**1.** ${topThreeTrophies[0].name} - ${topThreeTrophies[0].trophies}     **2.** ${topThreeTrophies[1].name} - ${topThreeTrophies[1].trophies}     **3.** ${topThreeTrophies[2].name} - ${topThreeTrophies[2].trophies}` });
                fields.push({
                    name: 'Trophies gained',
                    value: `${trophiesUsed.toString()}/${MAX_TROPHIES.toString()}`,
                    inline: true,
                });
                fields.push({
                    name: 'Trophies vs max',
                    value: `${((trophiesUsed / MAX_TROPHIES) * 100).toFixed(2)}%\n`,
                    inline: true,
                });
                fields.push({
                    name: 'Average trophies',
                    value: `${(trophiesUsed / ssn.players.length).toFixed(2)}`,
                    inline: false,
                });
                fields.push({
                    name: 'Least tickets used',
                    value: `${leastTickets.name} - ${leastTickets.tickets}`,
                    inline: true,
                });
                fields.push({
                    name: 'Least trophies',
                    value: `${leastTrophies.name} - ${leastTrophies.trophies}`,
                    inline: true,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjYXAuanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsic3JjL2NvbW1hbmRzL1JlY2FwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQW1EO0FBQ25ELHdDQUFxQztBQUdyQyw0RUFBb0U7QUFFcEUsTUFBcUIsSUFBSyxTQUFRLGlCQUFPO0lBR3JDLFlBQVksTUFBaUI7UUFDekIsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNWLElBQUksRUFBRSxPQUFPO1lBQ2IsV0FBVyxFQUFFLDRDQUE0QztZQUN6RCxRQUFRLEVBQUUsYUFBYTtZQUN2QixLQUFLLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDO1lBQ3RELFFBQVEsRUFBRSxJQUFJO1lBQ2QsbUJBQW1CLEVBQUUsQ0FBQyxlQUFlLENBQUM7U0FDekMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7SUFDNUIsQ0FBQztJQUVhLGNBQWMsQ0FBQyxPQUFZLEVBQUUsT0FBZ0IsRUFBRSxLQUFhOzs7WUFDdEUsTUFBTSxLQUFLLEdBQUcsSUFBSSx5QkFBWSxFQUFFO2lCQUMzQixRQUFRLENBQUMsU0FBUyxDQUFDO2lCQUNuQixRQUFRLENBQUMsT0FBTyxDQUFDO2lCQUNqQixjQUFjLENBQUMsS0FBSyxDQUFDO2lCQUVyQixTQUFTLENBQUMsU0FBUyxFQUFFLENBQUEsTUFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksMENBQUUsU0FBUyxFQUFFLEtBQUksU0FBUyxDQUFDO2lCQUNuRSxZQUFZLEVBQUUsQ0FBQztZQUVwQixNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDOztLQUN6QztJQUVZLEdBQUcsQ0FBQyxPQUFnQjs7Ozs7O1lBQzdCLE1BQU0sZ0JBQWdCLEdBQUcscUJBQXFCLENBQUM7WUFFL0MsTUFBTSxFQUFFLE1BQU0sRUFB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