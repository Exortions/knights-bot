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
const Command_1 = require("../Command");
class Ping extends Command_1.Command {
    constructor(client) {
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
    run(message) {
        const _super = Object.create(null, {
            respond: { get: () => super.respond }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const { ping } = this.client.ws;
            const lastPing = this.botClient.getPing();
            let percentDifference = Math.abs((ping - lastPing) / ((ping + lastPing) / 2)) * 100;
            if (isNaN(percentDifference))
                percentDifference = 0;
            this.botClient.setPing(ping);
            yield _super.respond.call(this, message.channel, `Ping: ${ping}ms, ${percentDifference.toFixed(2)}% ${ping > lastPing ? 'slower' : 'faster'} than last ping.`);
        });
    }
}
exports.default = Ping;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGluZy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJzcmMvY29tbWFuZHMvUGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUdBLHdDQUFxQztBQUdyQyxNQUFxQixJQUFLLFNBQVEsaUJBQU87SUFHckMsWUFBWSxNQUFpQjtRQUN6QixLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ1YsSUFBSSxFQUFFLE1BQU07WUFDWixXQUFXLEVBQUUsZ0JBQWdCO1lBQzdCLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQzVDLFFBQVEsRUFBRSxJQUFJO1lBQ2QsbUJBQW1CLEVBQUUsQ0FBQyxlQUFlLENBQUM7U0FDekMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7SUFDNUIsQ0FBQztJQUVZLEdBQUcsQ0FBQyxPQUFnQjs7Ozs7WUFDN0IsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBRWhDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFMUMsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFFcEYsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUM7Z0JBQUUsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1lBRXBELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTdCLE1BQU0sT0FBTSxPQUFPLFlBQ2YsT0FBTyxDQUFDLE9BQU8sRUFDZixTQUFTLElBQUksT0FBTyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQzVDLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFDakMsa0JBQWtCLENBQ3JCLENBQUM7UUFDTixDQUFDO0tBQUE7Q0FDSjtBQWxDRCx1QkFrQ0MifQ==