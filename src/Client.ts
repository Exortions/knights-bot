/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Collection, Client as DiscordClient } from 'discord.js';
import { Service } from 'typedi';
import { Logger } from './utils/Logger';
import { BotSettings, BotClient } from './types';
import { Command } from './Command';
import { ActionManager } from './managers/ActionManager';
import { settings as configuration } from './config/config';

@Service()
export class Client extends DiscordClient implements BotClient {
    public settings: BotSettings;
    public lastPing: number;

    constructor(private actionManager: ActionManager) {
        super(configuration.clientOptions || {});
        this.settings = configuration;
        // @ts-ignore
        this.settings.token = process.env.BOT_TOKEN || '';
        this.initialize();

        this.lastPing = this.ws.ping;
    }

    private async initialize(): Promise<void> {
        try {
            this.actionManager.initializeCommands(this);
            this.actionManager.initializeEvents(this);
            await this.login(configuration.token);
        } catch (e) {
            Logger.error(`Could not initialize bot: ${e}`);
        }
    }

    public get commands(): Collection<string, Command> {
        return this.actionManager.commands;
    }

    public getPing(): number {
        return this.lastPing;
    }

    public setPing(ping: number): void {
        this.lastPing = ping;
    }
}
