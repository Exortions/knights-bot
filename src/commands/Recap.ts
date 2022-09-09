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
        const REQUIRED_ROLE_ID = '1016550159645151354';

        const { member } = message;

        if (!member) return;

        if (!member.roles.cache.has(REQUIRED_ROLE_ID)) {
            await this.sendErrorEmbed(super.respond, message, 'You do not have permission to use this command.');
            return;
        }

        let season = message.content.split(' ')[1];

        let embed: MessageEmbed | null = null;

        const cl = new ClubLeagueManipulator();

        if (!season) {
            const lastSeason = cl.getLastSeason();

            if (!lastSeason) {
                await this.sendErrorEmbed(super.respond, message, 'No season found.');
                return;
            }

            season = `${lastSeason.month}/${lastSeason.day}/${lastSeason.year}`;
        }

        if (season) {
            const date = {
                month: Number(season.split('/')[0]),
                day: Number(season.split('/')[1]),
                year: Number(season.split('/')[2]),
            }

            const ssn = cl.getSeasons().find((s) => s.date.month === date.month && s.date.day === date.day && s.date.year === date.year);

            const fields: { name: string; value: string; inline?: boolean }[] = [];

            if (!ssn) {
                await this.sendErrorEmbed(super.respond, message, 'Season not found.');
                return;
            }

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
                value: `${((ticketsUsed / MAX_TICKETS) * 100).toFixed(2)}%\n\n`,
                inline: true,
            });

            fields.push({ name: 'Top Trophies', value: `**1.** ${topThreeTrophies[0].name} - ${topThreeTrophies[0].trophies}     **2.** ${topThreeTrophies[1].name} - ${topThreeTrophies[1].trophies}     **3.** ${topThreeTrophies[2].name} - ${topThreeTrophies[2].trophies}` });

            fields.push({
                name: 'Trophies gained',
                value: `${trophiesUsed.toString()}/${  MAX_TROPHIES.toString()}`,
                inline: true,
            });

            fields.push({
                name: 'Trophies vs max',
                value: `${((trophiesUsed / MAX_TROPHIES) * 100).toFixed(2)}%\n`,
                inline: true,
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
