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
class ClubLeague extends Command_1.Command {
    constructor(client) {
        super(client, {
            name: 'cl',
            description: 'Manipulate club league.',
            category: 'Club League',
            usage: client.settings.prefix.concat('cl <command> [args]'),
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
        return __awaiter(this, void 0, void 0, function* () {
            const REQUIRED_ROLE_ID = '1016550159645151354';
            const { member } = message;
            if (!member)
                return;
            if (!member.roles.cache.has(REQUIRED_ROLE_ID)) {
                yield this.sendErrorEmbed(_super.respond, message, 'You do not have permission to use this command.');
                return;
            }
            const command = message.content.split(' ')[1];
            if (!command) {
                yield this.sendErrorEmbed(_super.respond, message, 'Please provide a command.');
                return;
            }
            const cl = new ClubLeagueManipulatior_1.default();
            const date = { month: new Date().getMonth() + 1, day: new Date().getDate(), year: new Date().getFullYear() };
            let player;
            let trophies;
            let tickets;
            let embed;
            let ssns;
            let season;
            let ssn;
            const last = cl.getLastSeason();
            if (last === null)
                return;
            switch (command) {
                case 'season':
                    try {
                        cl.addSeason(date, []);
                    }
                    catch (err) {
                        yield this.sendErrorEmbed(_super.respond, message, `Error creating new season: ${err}`);
                        return;
                    }
                    yield _super.respond.call(this, message.channel, new discord_js_1.MessageEmbed().setTitle('Success').setDescription('Successfully created new club league season!').setTimestamp().setColor('#000000'));
                    break;
                case 'set':
                    player = message.content.split(' ')[2];
                    trophies = Number(message.content.split(' ')[3]);
                    tickets = Number(message.content.split(' ')[4]);
                    const note = message.content
                        .split(' ')
                        .slice(5)
                        .join(' ');
                    if (!player || trophies === undefined || tickets === undefined) {
                        yield this.sendErrorEmbed(_super.respond, message, 'Usage: $cl set <player> <trophies> <tickets>');
                        return;
                    }
                    yield _super.respond.call(this, message.channel, new discord_js_1.MessageEmbed().setTitle('Working').setDescription(`Setting ${player}'s trophies to ${trophies}, with ${tickets} tickets.`).setTimestamp().setColor('#000000'));
                    try {
                        cl.addPlayer({ name: player, note: note || 'None', trophies: trophies, tickets: tickets });
                    }
                    catch (err) {
                        yield this.sendErrorEmbed(_super.respond, message, `Error setting player: ${err}`);
                        return;
                    }
                    yield _super.respond.call(this, message.channel, new discord_js_1.MessageEmbed().setTitle('Success').setDescription(`Successfully updated ${player}'s club league data.`).addFields([{ name: 'Trophies', value: trophies }, { name: 'Tickets', value: tickets }, { name: 'Note', value: note || 'None' }]).setTimestamp().setColor('#000000'));
                    break;
                case 'get':
                    player = message.content.split(' ')[2];
                    if (!player) {
                        yield this.sendErrorEmbed(_super.respond, message, 'Usage: $cl get <player>');
                        return;
                    }
                    yield _super.respond.call(this, message.channel, new discord_js_1.MessageEmbed().setTitle('Success').setDescription(`Getting player ${player}'s data...`).setTimestamp().setColor('#000000'));
                    const data = cl.getPlayer(player);
                    if (data === null) {
                        yield this.sendErrorEmbed(_super.respond, message, `Player ${player} not found.`);
                        return;
                    }
                    yield _super.respond.call(this, message.channel, new discord_js_1.MessageEmbed()
                        .setTitle('Success')
                        .setDescription(`Player ${player} has ${data.trophies} trophies, with ${data.tickets} tickets. (${data.note}). Season: ${last.month}/${last.day}/${last.year}`)
                        .setTimestamp()
                        .setColor('#000000'));
                    break;
                case 'list':
                    const embeds = [];
                    ssn = message.content.split(' ')[2];
                    if (!ssn) {
                        const seasons = cl.getSeasons();
                        if (seasons.length === 0) {
                            yield this.sendErrorEmbed(_super.respond, message, 'No seasons found.');
                            return;
                        }
                        const fields = [];
                        seasons.forEach((season) => {
                            fields.push({ name: `Season ${season.date.month}/${season.date.day}/${season.date.year}`, value: `${season.players.length} players` });
                        });
                        embed = new discord_js_1.MessageEmbed().setTitle('Success').setDescription('Listing all seasons...').addFields(fields).setTimestamp().setColor('#000000');
                        yield _super.respond.call(this, message.channel, embed);
                        return;
                    }
                    ssns = cl.getSeasons();
                    ssns.forEach(season => {
                        const fields = [];
                        season.players.forEach(player => {
                            fields.push({
                                name: player.name,
                                value: `Trophies: ${player.trophies}, Tickets: ${player.tickets}, Note: ${player.note}`,
                            });
                        });
                        if (season.players.length === 0) {
                            fields.push({
                                name: 'No players',
                                value: 'No players have been added yet.',
                            });
                        }
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle(`Club League Season: ${season.date.month}/${season.date.day}/${season.date.year}`)
                            .setColor('#000000')
                            .setFooter(`Season ${ssns.indexOf(season) + 1} of ${ssns.length}`)
                            .setTimestamp()
                            .addFields(fields);
                        const date = {
                            month: Number(ssn.split('/')[0]),
                            day: Number(ssn.split('/')[1]),
                            year: Number(ssn.split('/')[2]),
                        };
                        if (date.month === season.date.month &&
                            date.day === season.date.day &&
                            date.year === season.date.year)
                            embeds.push(embed);
                    });
                    if (embeds.length === 0) {
                        yield this.sendErrorEmbed(_super.respond, message, `No seasons found with date: ${ssn}`);
                        return;
                    }
                    yield _super.respond.call(this, message.channel, embeds[0]);
                    break;
                case 'reset':
                    season = message.content.split(' ')[2];
                    if (!season) {
                        yield this.sendErrorEmbed(_super.respond, message, 'Usage: $cl reset <season>');
                        return;
                    }
                    ssn = {
                        month: Number(season.split('/')[0]),
                        day: Number(season.split('/')[1]),
                        year: Number(season.split('/')[2]),
                    };
                    ssns = cl.getSeasons();
                    embed = new discord_js_1.MessageEmbed();
                    cl.getSeasons().find((season) => {
                        if (ssn.month === season.date.month &&
                            ssn.day === season.date.day &&
                            ssn.year === season.date.year) {
                            cl.removeSeason(ssn);
                            embed = new discord_js_1.MessageEmbed()
                                .setTitle(`Club League Season: ${ssn.month}/${ssn.day}/${ssn.year}`)
                                .setColor('#000000')
                                .setFooter(`Season ${ssns.indexOf(season) + 2} of ${ssns.length}`)
                                .setTimestamp()
                                .addFields([
                                {
                                    name: 'Reset',
                                    value: 'Successfully reset season.',
                                },
                            ]);
                            return true;
                        }
                        return false;
                    });
                    if (embed === null) {
                        yield this.sendErrorEmbed(_super.respond, message, `No seasons found with date: ${season}`);
                        return;
                    }
                    yield _super.respond.call(this, message.channel, embed);
                    break;
                case 'kicklist':
                    season = message.content.split(' ')[2];
                    if (!season) {
                        yield this.sendErrorEmbed(_super.respond, message, 'Usage: $cl kicklist <season>');
                        return;
                    }
                    ssn = {
                        month: Number(season.split('/')[0]),
                        day: Number(season.split('/')[1]),
                        year: Number(season.split('/')[2]),
                    };
                    ssns = cl.getSeasons();
                    const kicklist = [];
                    cl.getSeasons().forEach((season) => {
                        if (ssn.month === season.date.month &&
                            ssn.day === season.date.day &&
                            ssn.year === season.date.year) {
                            season.players.forEach(player => {
                                if (player.tickets < ClubLeague.MINIMUM_TICKETS)
                                    kicklist.push({ name: player.name, tickets: player.tickets });
                            });
                        }
                    });
                    if (kicklist.length === 0) {
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle(`Congruatulations!`)
                            .setColor('#00ff00')
                            .addField('No players to kick!', 'No players need to be kicked.')
                            .setTimestamp();
                        yield _super.respond.call(this, message.channel, embed);
                        return;
                    }
                    const players = [];
                    kicklist.forEach(player => {
                        players.push({ name: player.name, value: `Tickets: ${player.tickets}` });
                    });
                    embed = new discord_js_1.MessageEmbed()
                        .setTitle(`Club League Season: ${ssn.month}/${ssn.day}/${ssn.year}`)
                        .setColor('#000000')
                        .setFooter(`Season ${ssns.indexOf(season) + 2} of ${ssns.length}`)
                        .setTimestamp()
                        .setDescription('Kicklist')
                        .addFields(players);
                    yield _super.respond.call(this, message.channel, embed);
                    break;
                case 'help':
                    const commands = [
                        {
                            name: '`$cl season`',
                            value: 'Creates a new season with the current date.',
                            inline: true,
                        },
                        {
                            name: '`$cl set <player> <trophies> <tickets> [note]`',
                            value: 'Sets a player\'s trophies and tickets for the current season.',
                            inline: true,
                        },
                        {
                            name: '`$cl get <player>`',
                            value: 'Gets a player\'s trophies and tickets for the current season.\n',
                            inline: true,
                        },
                        {
                            name: '`$cl list [season]`',
                            value: 'Lists all players and their trophies and tickets for a season, or list all seasons.',
                            inline: true,
                        },
                        {
                            name: '`$cl reset <season>`',
                            value: 'Resets all players and their trophies and tickets for a season.',
                            inline: true,
                        },
                        {
                            name: '`$cl kicklist <season>`',
                            value: 'Lists all players who need to be kicked for a season.',
                            inline: true,
                        }
                    ];
                    embed = new discord_js_1.MessageEmbed()
                        .setTitle('Club League Help')
                        .setColor('#000000')
                        .setDescription('Knights Club League Commands - $cl help')
                        .setTimestamp()
                        .addFields(commands)
                        .setFooter('Page 1 of 1');
                    yield _super.respond.call(this, message.channel, embed);
                    break;
                default:
                    yield this.sendErrorEmbed(_super.respond, message, `Invalid command: ${command}. Use $cl help for a list of commands.`);
                    break;
            }
        });
    }
}
exports.default = ClubLeague;
ClubLeague.MINIMUM_TICKETS = 1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2x1YkxlYWd1ZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJzcmMvY29tbWFuZHMvQ2x1YkxlYWd1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLDJDQUFtRDtBQUVuRCx3Q0FBcUM7QUFHckMsNEVBQW9FO0FBRXBFLE1BQXFCLFVBQVcsU0FBUSxpQkFBTztJQUczQyxZQUFZLE1BQWlCO1FBQ3pCLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDVixJQUFJLEVBQUUsSUFBSTtZQUNWLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsUUFBUSxFQUFFLGFBQWE7WUFDdkIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztZQUMzRCxRQUFRLEVBQUUsSUFBSTtZQUNkLG1CQUFtQixFQUFFLENBQUMsZUFBZSxDQUFDO1NBQ3pDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO0lBQzVCLENBQUM7SUFJYSxjQUFjLENBQUMsT0FBWSxFQUFFLE9BQWdCLEVBQUUsS0FBYTs7O1lBQ3RFLE1BQU0sS0FBSyxHQUFHLElBQUkseUJBQVksRUFBRTtpQkFDM0IsUUFBUSxDQUFDLFNBQVMsQ0FBQztpQkFDbkIsUUFBUSxDQUFDLE9BQU8sQ0FBQztpQkFDakIsY0FBYyxDQUFDLEtBQUssQ0FBQztpQkFFckIsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFBLE1BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLDBDQUFFLFNBQVMsRUFBRSxLQUFJLFNBQVMsQ0FBQztpQkFDbkUsWUFBWSxFQUFFLENBQUM7WUFFcEIsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQzs7S0FDekM7SUFFWSxHQUFHLENBQUMsT0FBZ0I7Ozs7O1lBQzdCLE1BQU0sZ0JBQWdCLEdBQUcscUJBQXFCLENBQUM7WUFFL0MsTUFBTSxFQUFF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