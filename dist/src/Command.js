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
exports.Command = void 0;
class Command {
    constructor(client, options) {
        this.client = client;
        this.conf = {
            name: options.name,
            description: options.description || 'No information specified.',
            usage: options.usage || 'No usage specified.',
            category: options.category || 'Information',
            cooldown: options.cooldown || 1000,
            requiredPermissions: options.requiredPermissions || ['READ_MESSAGES'],
        };
        this.cooldowns = new Set();
    }
    canRun(user, message) {
        const onCooldown = [...this.cooldowns].filter(cd => cd.user === user && cd.guild === message.guild).length > 0;
        const hasPermission = message.member
            ? message.member.hasPermission(this.conf.requiredPermissions, {
                checkAdmin: true,
                checkOwner: true,
            })
            : false;
        if (!hasPermission || onCooldown) {
            message.channel.send('You do not have permission for this command or you are on cooldown.');
            return false;
        }
        return true;
    }
    setCooldown(user, guild) {
        this.cooldowns.add({ user, guild });
        setTimeout(() => {
            const cooldown = [...this.cooldowns].filter(cd => cd.user === user && cd.guild === guild)[0];
            if (!cooldown)
                return;
            this.cooldowns.delete(cooldown);
        }, this.conf.cooldown);
    }
    respond(channel, message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield channel.send(message);
            return this;
        });
    }
}
exports.Command = Command;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJzcmMvQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFJQSxNQUFzQixPQUFPO0lBSXpCLFlBQXNCLE1BQWlCLEVBQUUsT0FBdUI7UUFBMUMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNuQyxJQUFJLENBQUMsSUFBSSxHQUFHO1lBQ1IsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQ2xCLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVyxJQUFJLDJCQUEyQjtZQUMvRCxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssSUFBSSxxQkFBcUI7WUFDN0MsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLElBQUksYUFBYTtZQUMzQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJO1lBQ2xDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLGVBQWUsQ0FBQztTQUN4RSxDQUFDO1FBQ0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFRTSxNQUFNLENBQUMsSUFBVSxFQUFFLE9BQWdCO1FBQ3RDLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUMvRyxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsTUFBTTtZQUNoQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDeEQsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLFVBQVUsRUFBRSxJQUFJO2FBQ25CLENBQUM7WUFDSixDQUFDLENBQUMsS0FBSyxDQUFDO1FBRVosSUFBSSxDQUFDLGFBQWEsSUFBSSxVQUFVLEVBQUU7WUFDOUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscUVBQXFFLENBQUMsQ0FBQztZQUM1RixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFPTSxXQUFXLENBQUMsSUFBVSxFQUFFLEtBQVk7UUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUVwQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTdGLElBQUksQ0FBQyxRQUFRO2dCQUFFLE9BQU87WUFFdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQVFZLE9BQU8sQ0FBQyxPQUFtQixFQUFFLE9BQXVCOztZQUM3RCxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFNUIsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0NBU0o7QUEzRUQsMEJBMkVDIn0=