"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = require("winston");
const { printf, combine, timestamp, colorize } = winston_1.format;
const colorizer = colorize();
exports.Logger = (0, winston_1.createLogger)({
    transports: new winston_1.transports.Console(),
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), printf(({ message, level, timestamp }) => colorizer.colorize(level, `[${timestamp}]: ${message}`))),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyLmpzIiwic291cmNlUm9vdCI6InNyYy8iLCJzb3VyY2VzIjpbInNyYy91dGlscy9Mb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXlFO0FBRXpFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsR0FBRyxnQkFBTSxDQUFDO0FBQ3hELE1BQU0sU0FBUyxHQUFHLFFBQVEsRUFBRSxDQUFDO0FBRWhCLFFBQUEsTUFBTSxHQUFHLElBQUEsc0JBQVksRUFBQztJQUMvQixVQUFVLEVBQUUsSUFBSSxvQkFBVSxDQUFDLE9BQU8sRUFBRTtJQUNwQyxNQUFNLEVBQUUsT0FBTyxDQUNYLFNBQVMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxxQkFBcUIsRUFBRSxDQUFDLEVBQzVDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxTQUFTLE1BQU0sT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUNyRztDQUNKLENBQUMsQ0FBQyJ9