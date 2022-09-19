/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-case-declarations */
import { Message, MessageEmbed } from 'discord.js';

import { Command } from '../Command';
import { BotClient, ClubLeagueSeason } from '../types';

import ClubLeagueManipulator from '../utils/ClubLeagueManipulatior';

export default class ClubLeague extends Command {
    private botClient: BotClient;

    constructor(client: BotClient) {
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

    public static MINIMUM_TICKETS = 8;

    private async sendErrorEmbed(respond: any, message: Message, error: string): Promise<void> {
        const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Error')
            .setDescription(error)
            // eslint-disable-next-line prettier/prettier
            .setFooter('Knights', this.botClient.user?.avatarURL() || undefined)
            .setTimestamp();

        await respond(message.channel, embed);
    }

    public async run(message: Message): Promise<void> {
        const REQUIRED_ROLE_ID = '1016550159645151354';

        const { member } = message;

        if (!member) return;

        if (!member.roles.cache.has(REQUIRED_ROLE_ID)) {
            await this.sendErrorEmbed(super.respond, message, 'You do not have permission to use this command.');
            return;
        }

        const command = message.content.split(' ')[1];

        if (!command) {
            await this.sendErrorEmbed(super.respond, message, 'Please provide a command.');
            return;
        }

        const cl = new ClubLeagueManipulator();

        const date = { month: new Date().getMonth() + 1, day: new Date().getDate(), year: new Date().getFullYear() };

        let player;
        let trophies;
        let tickets;

        let embed: MessageEmbed;

        let ssns: ClubLeagueSeason[];
        let season: any;
        let ssn: any;

        const last = cl.getLastSeason(); 

        switch (command) {
            case 'season':
                try {
                    cl.addSeason(date, []);
                } catch (err) {
                    await this.sendErrorEmbed(super.respond, message, `Error creating new season: ${err}`);
                    return;
                }

                await super.respond(message.channel, new MessageEmbed().setTitle('Success').setDescription('Successfully created new club league season!').setTimestamp().setColor('#000000'));

                break;
            case 'set':
                player = message.content.split(' ')[2];
                trophies = Number(message.content.split(' ')[3]);
                tickets = Number(message.content.split(' ')[4]);

                const note = message.content
                    .split(' ')
                    .slice(5)
                    .join(' ');

                player = player.replace(/\s/g, '');

                if (isNaN(trophies) || isNaN(tickets)) {
                    await this.sendErrorEmbed(super.respond, message, 'Please provide a valid number for trophies and tickets.');
                    return;
                }

                if (!player || trophies === undefined || tickets === undefined) {
                    await this.sendErrorEmbed(super.respond, message, 'Usage: $cl set <player> <trophies> <tickets>');
                    return;
                }

                await super.respond(message.channel, new MessageEmbed().setTitle('Working').setDescription(`Setting ${player}'s trophies to ${trophies}, with ${tickets} tickets.`).setTimestamp().setColor('#000000'));

                try {
                    cl.addPlayer({ name: player, note: note || 'None', trophies: trophies, tickets: tickets });
                } catch (err) {
                    await this.sendErrorEmbed(super.respond, message, `Error setting player: ${err}`);
                    return;
                }

                await super.respond(message.channel, new MessageEmbed().setTitle('Success').setDescription(`Successfully updated ${player}'s club league data.`).addFields([{ name: 'Trophies', value: trophies }, { name: 'Tickets', value: tickets }, { name: 'Note', value: note || 'None' }]).setTimestamp().setColor('#000000'));

                break;
            case 'get':
                player = message.content.split(' ')[2];

                if (!player) {
                    await this.sendErrorEmbed(super.respond, message, 'Usage: $cl get <player>');
                    return;
                }

                await super.respond(message.channel, new MessageEmbed().setTitle('Success').setDescription(`Getting player ${player}'s data...`).setTimestamp().setColor('#000000'));

                const data = cl.getPlayer(player);

                if (data === null) {
                    await this.sendErrorEmbed(super.respond, message, `Player ${player} not found.`);
                    return;
                }

                if (last === null) {
                    await this.sendErrorEmbed(super.respond, message, 'No club league seasons found.');
                    return;
                }

                await super.respond(
                    message.channel,
                    new MessageEmbed()
                        .setTitle('Success')
                        .setDescription(`Player ${player} has ${data.trophies} trophies, with ${data.tickets} tickets. (${data.note}). Season: ${last.month}/${last.day}/${last.year}`)
                        .setTimestamp()
                        .setColor('#000000')
                );

                break;
            case 'list':
                const embeds: MessageEmbed[] = [];

                ssn = message.content.split(' ')[2];

                if (!ssn) {
                    const seasons = cl.getSeasons();

                    if (seasons.length === 0) {
                        await this.sendErrorEmbed(super.respond, message, 'No seasons found.');
                        return;
                    }

                    const fields: { name: string; value: string }[] = [];

                    seasons.forEach((season) => {
                        fields.push({ name: `Season ${season.date.month}/${season.date.day}/${season.date.year}`, value: `${season.players.length} players` });
                    });

                    embed = new MessageEmbed().setTitle('Success').setDescription('Listing all seasons...').addFields(fields).setTimestamp().setColor('#000000');

                    await super.respond(message.channel, embed);

                    return;
                }

                ssns = cl.getSeasons();

                ssns.forEach(season => {
                    const fields: { name: string; value: string }[] = [];

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

                    embed = new MessageEmbed()
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

                    if (
                        date.month === season.date.month &&
                        date.day === season.date.day &&
                        date.year === season.date.year
                    )
                        embeds.push(embed);
                });

                if (embeds.length === 0) {
                    await this.sendErrorEmbed(super.respond, message, `No seasons found with date: ${ssn}`);
                    return;
                }

                await super.respond(message.channel, embeds[0]);
                break;
            case 'reset':
                season = message.content.split(' ')[2];

                if (!season) {
                    await this.sendErrorEmbed(super.respond, message, 'Usage: $cl reset <season>');
                    return;
                }

                ssn = {
                    month: Number(season.split('/')[0]),
                    day: Number(season.split('/')[1]),
                    year: Number(season.split('/')[2]),
                }

                ssns = cl.getSeasons();

                embed = new MessageEmbed();

                cl.getSeasons().find((season): boolean => {
                    if (
                        ssn.month === season.date.month &&
                        ssn.day === season.date.day &&
                        ssn.year === season.date.year
                    ) {
                        cl.removeSeason(ssn);

                        embed = new MessageEmbed()
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
                    await this.sendErrorEmbed(super.respond, message, `No seasons found with date: ${season}`);
                    return;
                }

                await super.respond(message.channel, embed);
                break;
            case 'kicklist':
                season = message.content.split(' ')[2];

                if (!season) {
                    await this.sendErrorEmbed(super.respond, message, 'Usage: $cl kicklist <season>');
                    return;
                }

                ssn = {
                    month: Number(season.split('/')[0]),
                    day: Number(season.split('/')[1]),
                    year: Number(season.split('/')[2]),
                }

                ssns = cl.getSeasons();

                const kicklist: { name: string; tickets: number }[] = [];

                cl.getSeasons().forEach((season): void => {
                    if (
                        ssn.month === season.date.month &&
                        ssn.day === season.date.day &&
                        ssn.year === season.date.year
                    ) {
                        season.players.forEach(player => {
                            if (player.tickets < ClubLeague.MINIMUM_TICKETS)
                                kicklist.push({ name: player.name, tickets: player.tickets });
                        });
                    }
                });

                if (kicklist.length === 0) {
                    embed = new MessageEmbed()
                        .setTitle(`Congruatulations!`)
                        .setColor('#00ff00')
                        .addField('No players to kick!', 'No players need to be kicked.' )
                        .setTimestamp();

                    await super.respond(message.channel, embed);
                    return;
                }

                const players: { name: string; value: string }[] = [];

                kicklist.forEach(player => {
                    players.push({ name: player.name, value: `Tickets: ${player.tickets}` });
                });

                embed = new MessageEmbed()
                    .setTitle(`Club League Season: ${ssn.month}/${ssn.day}/${ssn.year}`)
                    .setColor('#000000')
                    .setFooter(`Season ${ssns.indexOf(season) + 2} of ${ssns.length}`)
                    .setTimestamp()
                    .setDescription('Kicklist')
                    .addFields(players);

                await super.respond(message.channel, embed);
                    
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
                ]

                embed = new MessageEmbed()
                    .setTitle('Club League Help')
                    .setColor('#000000')
                    .setDescription('Knights Club League Commands - $cl help')
                    .setTimestamp()
                    .addFields(commands)
                    .setFooter('Page 1 of 1');

                await super.respond(message.channel, embed);
                break;
            default:
                await this.sendErrorEmbed(super.respond, message, `Invalid command: ${command}. Use $cl help for a list of commands.`);
                break;
        }
    }
}
