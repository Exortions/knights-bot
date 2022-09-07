import { Message, MessageEmbed } from 'discord.js';
import { Command } from '../Command';
import { BotClient } from '../types';

import ClubLeagueManipulator from '../utils/ClubLeagueManipulatior';

export default class Ping extends Command {
    private botClient: BotClient;

    constructor(client: BotClient) {
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
        message.delete();

        const REQUIRED_ROLE_ID = '1016550159645151354';

        const { member } = message;

        if (!member) return;

        if (!member.roles.cache.has(REQUIRED_ROLE_ID)) {
            await this.sendErrorEmbed(super.respond, message, 'You do not have permission to use this command.');
            return;
        }

        const season = message.content.split(' ')[1];

        let embed: MessageEmbed | null = null;

        const cl = new ClubLeagueManipulator();

        console.log(season);)

        if (season) {
            const date = {
                month: Number(season.split('/')[0]),
                day: Number(season.split('/')[1]),
                year: Number(season.split('/')[2]),
            }

            const ssn = cl.getSeasons().find((s) => s.date.month === date.month && s.date.day === date.day && s.date.year === date.year);

            console.log(ssn);
            
            const fields: { name: string; value: string }[] = [];

            if (!ssn) {
                await this.sendErrorEmbed(super.respond, message, 'Season not found.');
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

            embed = new MessageEmbed()
                .setColor('#000000')
                .setTitle(`Recap of Season ${season}`)
                .setFooter('Knights Season Recap', this.botClient.user?.avatarURL() || undefined)
                .addFields(fields)
                .setTimestamp();
        }

        if (embed !== null) await super.respond(message.channel, embed);
    }
}
