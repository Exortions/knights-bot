"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionManager = void 0;
const discord_js_1 = require("discord.js");
const typedi_1 = require("typedi");
const path_1 = require("path");
const fs_1 = require("fs");
const Logger_1 = require("../utils/Logger");
let ActionManager = class ActionManager {
    constructor() {
        this.commands = new discord_js_1.Collection();
    }
    initializeCommands(client) {
        const { commands } = client.settings.paths;
        (0, fs_1.readdir)(commands, (err, files) => {
            if (err)
                Logger_1.Logger.error(err);
            files.forEach(cmd => {
                if ((0, fs_1.statSync)((0, path_1.join)(commands, cmd)).isDirectory()) {
                    this.initializeCommands(client);
                }
                else {
                    const Command = require((0, path_1.join)(__dirname, '../../', `${commands}/${cmd.replace('ts', 'js')}`))
                        .default;
                    const command = new Command(client);
                    this.commands.set(command.conf.name, command);
                }
            });
        });
    }
    initializeEvents(client) {
        const { events } = client.settings.paths;
        (0, fs_1.readdir)(events, (err, files) => {
            if (err)
                Logger_1.Logger.error(err);
            files.forEach(evt => {
                const Event = require((0, path_1.join)(__dirname, '../../', `${events}/${evt.replace('ts', 'js')}`)).default;
                const event = new Event(client);
                const eventName = evt.split('.')[0];
                client.on(eventName.charAt(0).toLowerCase() + eventName.slice(1), (...args) => event.run(args));
            });
        });
    }
};
ActionManager = __decorate([
    (0, typedi_1.Service)()
], ActionManager);
exports.ActionManager = ActionManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9uTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJzcmMvbWFuYWdlcnMvQWN0aW9uTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyQ0FBd0M7QUFDeEMsbUNBQWlDO0FBQ2pDLCtCQUE0QjtBQUM1QiwyQkFBdUM7QUFHdkMsNENBQXlDO0FBR2xDLElBQU0sYUFBYSxHQUFuQixNQUFNLGFBQWE7SUFBbkI7UUFDSSxhQUFRLEdBQWdDLElBQUksdUJBQVUsRUFBbUIsQ0FBQztJQW1EckYsQ0FBQztJQTVDVSxrQkFBa0IsQ0FBQyxNQUFpQjtRQUN2QyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFFM0MsSUFBQSxZQUFPLEVBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQzdCLElBQUksR0FBRztnQkFBRSxlQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTNCLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hCLElBQUksSUFBQSxhQUFRLEVBQUMsSUFBQSxXQUFJLEVBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7b0JBQzdDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDbkM7cUJBQU07b0JBQ0gsTUFBTSxPQUFPLEdBQVEsT0FBTyxDQUFDLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsR0FBRyxRQUFRLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3lCQUM1RixPQUFPLENBQUM7b0JBQ2IsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBRXBDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2lCQUNqRDtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBTU0sZ0JBQWdCLENBQUMsTUFBaUI7UUFDckMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBRXpDLElBQUEsWUFBTyxFQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUMzQixJQUFJLEdBQUc7Z0JBQUUsZUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUUzQixLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNoQixNQUFNLEtBQUssR0FBUSxPQUFPLENBQUMsSUFBQSxXQUFJLEVBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBRXRHLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNoQyxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUlwQyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBYyxFQUFFLEVBQUUsQ0FDcEYsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FDbEIsQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0osQ0FBQTtBQXBEWSxhQUFhO0lBRHpCLElBQUEsZ0JBQU8sR0FBRTtHQUNHLGFBQWEsQ0FvRHpCO0FBcERZLHNDQUFhIn0=