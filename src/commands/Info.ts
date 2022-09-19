import { Message, MessageEmbed } from 'discord.js';
import { Command } from '../Command';
import { BotClient } from '../types';

import ClubLeagueManipulator from '../utils/ClubLeagueManipulatior';

export default class Info extends Command {
    private botClient: BotClient;

    constructor(client: BotClient) {
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

    public async run(message: Message, args: string[]): Promise<void> {
        const cl = new ClubLeagueManipulator();

        const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Info')
            .setDescription(cl.getAdminInfo())
            // eslint-disable-next-line prettier/prettier
            .setFooter('Knights', this.botClient.user?.avatarURL() || undefined)
            .setTimestamp();

        await super.respond(message.channel, embed);
    }
}
