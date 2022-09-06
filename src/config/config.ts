import { BotSettings } from '../types/bot/Bot';

export const settings: BotSettings = {
    presence: {
        activity: {
            name: 'Brawl Stars',
            type: 'PLAYING',
        },
    },
    prefix: '$',
    paths: {
        commands: 'src/commands',
        events: 'src/events',
    },
};
