/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Message } from 'discord.js';
import { Command } from '../Command';
import { BotClient } from '../types';

export default class Ping extends Command {
    // botClient is any class that implements BotClient
    private botClient: BotClient;

    constructor(client: BotClient) {
        super(client, {
            name: 'ping',
            description: 'Pings the bot.',
            category: 'Information',
            usage: client.settings.prefix.concat('ping'),
            cooldown: 1000,
            requiredPermissions: ['SEND_MESSAGES'],
        });

        this.botClient = client;
    }

    public async run(message: Message): Promise<void> {
        const { ping } = this.client.ws;
        // @ts-ignore
        const lastPing = this.botClient.getPing();

        let percentDifference = Math.abs((ping - lastPing) / ((ping + lastPing) / 2)) * 100;

        if (isNaN(percentDifference)) percentDifference = 0;

        this.botClient.setPing(ping);

        await super.respond(
            message.channel,
            `Ping: ${ping}ms, ${percentDifference.toFixed(2)}% ${
                ping > lastPing ? 'slower' : 'faster'
            } than last ping.`,
        );
    }
}
