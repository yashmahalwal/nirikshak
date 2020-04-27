"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var figlet_1 = __importDefault(require("figlet"));
var figletPromise = function (message, options) {
    return new Promise(function (resolve, reject) {
        figlet_1.default(message, options, function (error, data) {
            if (error)
                reject(error);
            else
                resolve(data);
        });
    });
};
exports.default = figletPromise;
//# sourceMappingURL=figletWrapper.js.map