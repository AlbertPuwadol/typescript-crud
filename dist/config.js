"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.ConfigUtility = void 0;
const config_yaml_1 = __importDefault(require("config-yaml"));
const rawConfig = (0, config_yaml_1.default)(`${__dirname}/../config/config.yml`);
class ConfigUtility {
    static get() {
        return rawConfig;
    }
}
exports.ConfigUtility = ConfigUtility;
exports.config = ConfigUtility.get();
