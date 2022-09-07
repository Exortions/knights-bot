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
class Message {
    constructor(client) {
        this.client = client;
    }
    run(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const [message] = args;
            if (message.author.bot || !message.content.startsWith(this.client.settings.prefix))
                return;
            const argus = message.content.split(/\s+/g);
            const command = argus.shift().slice(this.client.settings.prefix.length);
            const cmd = this.client.commands.get(command);
            if (!cmd)
                return;
            if (!cmd.canRun(message.author, message))
                return;
            yield cmd.run(message, argus);
            if (message.guild)
                cmd.setCooldown(message.author, message.guild);
        });
    }
}
exports.default = Message;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJzcmMvZXZlbnRzL01lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFJQSxNQUFxQixPQUFPO0lBQ3hCLFlBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUcsQ0FBQztJQUV6QixHQUFHLENBQUMsSUFBUzs7WUFDdEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQztZQUV2QixJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUFFLE9BQU87WUFFM0YsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekUsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTlDLElBQUksQ0FBQyxHQUFHO2dCQUFFLE9BQU87WUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7Z0JBQUUsT0FBTztZQUVqRCxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRTlCLElBQUksT0FBTyxDQUFDLEtBQUs7Z0JBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RSxDQUFDO0tBQUE7Q0FDSjtBQW5CRCwwQkFtQkMifQ==