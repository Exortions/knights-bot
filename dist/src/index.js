"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv = require("dotenv");
const typedi_1 = require("typedi");
const Client_1 = require("./Client");
dotenv.config();
typedi_1.Container.get(Client_1.Client);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsic3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNEJBQTBCO0FBQzFCLGlDQUFpQztBQUNqQyxtQ0FBbUM7QUFDbkMscUNBQWtDO0FBRWxDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNoQixrQkFBUyxDQUFDLEdBQUcsQ0FBUyxlQUFNLENBQUMsQ0FBQyJ9