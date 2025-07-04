"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const server_1 = __importDefault(require("react-dom/server"));
const react_1 = __importDefault(require("react"));
const discord_components_react_1 = require("@derockdev/discord-components-react");
const message_1 = __importDefault(require("./renderers/message"));
const content_1 = __importStar(require("./renderers/content"));
const buildProfiles_1 = require("../utils/buildProfiles");
const client_1 = require("../static/client");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const hydrate_1 = require("@derockdev/discord-components-core/hydrate");
// read the package.json file and get the @derockdev/discord-components-core version
let discordComponentsVersion = '^3.6.1';
try {
    const packagePath = path_1.default.join(__dirname, '..', '..', 'package.json');
    const packageJSON = JSON.parse((0, fs_1.readFileSync)(packagePath, 'utf8'));
    discordComponentsVersion = (_a = packageJSON.dependencies['@derockdev/discord-components-core']) !== null && _a !== void 0 ? _a : discordComponentsVersion;
    // eslint-disable-next-line no-empty
}
catch (_b) { } // ignore errors
async function renderMessages(_a) {
    var _b, _c, _d, _e, _f, _g;
    var { messages, channel, callbacks } = _a, options = __rest(_a, ["messages", "channel", "callbacks"]);
    const profiles = (0, buildProfiles_1.buildProfiles)(messages);
    const chatBody = [];
    for (const message of messages) {
        const rendered = await (0, message_1.default)(message, Object.assign({ messages,
            channel,
            callbacks }, options));
        if (rendered)
            chatBody.push(rendered);
    }
    const elements = (react_1.default.createElement(discord_components_react_1.DiscordMessages, { style: { minHeight: '100vh' } },
        react_1.default.createElement(discord_components_react_1.DiscordHeader, { guild: channel.isDMBased() ? 'Direct Messages' : channel.guild.name, channel: channel.isDMBased()
                ? channel.type === discord_js_1.ChannelType.DM
                    ? (_c = (_b = channel.recipient) === null || _b === void 0 ? void 0 : _b.tag) !== null && _c !== void 0 ? _c : 'Unknown Recipient'
                    : 'Unknown Recipient'
                : channel.name, icon: channel.isDMBased() ? undefined : (_d = channel.guild.iconURL({ size: 128 })) !== null && _d !== void 0 ? _d : undefined }, channel.isThread()
            ? `Thread channel in ${(_f = (_e = channel.parent) === null || _e === void 0 ? void 0 : _e.name) !== null && _f !== void 0 ? _f : 'Unknown Channel'}`
            : channel.isDMBased()
                ? `Direct Messages`
                : channel.isVoiceBased()
                    ? `Voice Text Channel for ${channel.name}`
                    : channel.type === discord_js_1.ChannelType.GuildCategory
                        ? `Category Channel`
                        : 'topic' in channel && channel.topic
                            ? await (0, content_1.default)(channel.topic, Object.assign({ messages, channel, callbacks, type: content_1.RenderType.REPLY }, options))
                            : `This is the start of #${channel.name} channel.`),
        chatBody,
        react_1.default.createElement("div", { style: { textAlign: 'center', width: '100%' } },
            options.footerText
                ? options.footerText
                    .replaceAll('{number}', messages.length.toString())
                    .replace('{s}', messages.length > 1 ? 's' : '')
                : `Exported ${messages.length} message${messages.length > 1 ? 's' : ''}.`,
            ' ',
            options.poweredBy ? (react_1.default.createElement("span", { style: { textAlign: 'center' } },
                "Powered by",
                ' ',
                react_1.default.createElement("a", { href: "https://github.com/ItzDerock/discord-html-transcripts", style: { color: 'lightblue' } }, "discord-html-transcripts"),
                ".")) : null)));
    const markup = server_1.default.renderToStaticMarkup(react_1.default.createElement("html", null,
        react_1.default.createElement("head", null,
            react_1.default.createElement("meta", { charSet: "utf-8" }),
            react_1.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
            react_1.default.createElement("link", { rel: "icon", type: "image/png", href: options.favicon === 'guild'
                    ? channel.isDMBased()
                        ? undefined
                        : (_g = channel.guild.iconURL({ size: 16, extension: 'png' })) !== null && _g !== void 0 ? _g : undefined
                    : options.favicon }),
            react_1.default.createElement("title", null, channel.isDMBased() ? 'Direct Messages' : channel.name),
            react_1.default.createElement("script", { dangerouslySetInnerHTML: {
                    __html: client_1.scrollToMessage,
                } }),
            !options.hydrate && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("script", { dangerouslySetInnerHTML: {
                        __html: `window.$discordMessage={profiles:${JSON.stringify(await profiles)}}`,
                    } }),
                react_1.default.createElement("script", { type: "module", src: `https://cdn.jsdelivr.net/npm/@derockdev/discord-components-core@${discordComponentsVersion}/dist/derockdev-discord-components-core/derockdev-discord-components-core.esm.js` })))),
        react_1.default.createElement("body", { style: {
                margin: 0,
                minHeight: '100vh',
            } }, elements),
        options.hydrate && react_1.default.createElement("script", { dangerouslySetInnerHTML: { __html: client_1.revealSpoiler } })));
    if (options.hydrate) {
        const result = await (0, hydrate_1.renderToString)(markup, {
            beforeHydrate: async (document) => {
                document.defaultView.$discordMessage = {
                    profiles: await profiles,
                };
            },
        });
        return result.html;
    }
    return markup;
}
exports.default = renderMessages;
//# sourceMappingURL=index.js.map