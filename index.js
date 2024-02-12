const DJS = require("discord.js");
const {
  REST,
  Routes
} = require('discord.js');
const fs = require('fs');
const path = require("path");
const utils_answ3r = require("answ3r-utils");
const glob = require('glob');
const Path = require("path");
var config = require("./config.json");
const si = require("systeminformation");
const axios = require('axios');
const querystring = require("querystring");
var uuid;
lccheck();
var debug = false;
fileCheck();
var client = new DJS.Client({
  'sync': false,
  'fetchAllMembers': false,
  'intents': [DJS.GatewayIntentBits.Guilds, DJS.GatewayIntentBits.GuildMessages, DJS.GatewayIntentBits.GuildMembers, DJS.GatewayIntentBits.GuildBans, DJS.GatewayIntentBits.GuildEmojisAndStickers, DJS.GatewayIntentBits.GuildIntegrations, DJS.GatewayIntentBits.GuildWebhooks, DJS.GatewayIntentBits.GuildInvites, DJS.GatewayIntentBits.GuildVoiceStates, DJS.GatewayIntentBits.GuildPresences, DJS.GatewayIntentBits.GuildMessageReactions, DJS.GatewayIntentBits.GuildMessageTyping, DJS.GatewayIntentBits.GuildScheduledEvents, DJS.GatewayIntentBits.MessageContent, DJS.GatewayIntentBits.DirectMessages, DJS.GatewayIntentBits.DirectMessageReactions, DJS.GatewayIntentBits.DirectMessageTyping],
  'partials': [DJS.Partials.Message, DJS.Partials.Channel, DJS.Partials.GuildMember, DJS.Partials.GuildScheduledEvent, DJS.Partials.Reaction, DJS.Partials.User]
});
client.Discord = DJS;
client.config = config;
const eventsPath = path.join(__dirname, "src/events");
const eventFiles = fs.readdirSync(eventsPath).filter(_0xd0db30 => _0xd0db30.endsWith(".js"));
for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (..._0x5a2e28) => event.execute(..._0x5a2e28, client));
  } else {
    client.on(event.name, (..._0x41a18d) => event.execute(..._0x41a18d, client));
  }
}
client.commands = new DJS.Collection();
const commands = [];
const commandsGlobal = [];
const commandsPath = glob.sync("./src/commands/**/*.js");
console.log("Green = Server command\nBlue  = Global command\n-----------------------------".yellow);
for (const file of commandsPath) {
  const command = require(Path.resolve(file));
  if (command.global) {
    commandsGlobal.push(command.data.toJSON());
    console.log("Command loaded: ".blue + command.data.name.white + '.js');
  } else {
    console.log("Command loaded: ".green + command.data.name.white + '.js');
    commands.push(command.data.toJSON());
  }
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log("[WARNING] The command at " + filePath + " is missing a required \"data\" or \"execute\" property.");
  }
}
async function lccheck() {
  await new Promise(async _0x13bbb4 => {
    await si.system().then(_0x29bbf3 => uuid = _0x29bbf3.uuid);
  });
}
console.log("[BOT] Connecting to Discord...".yellow);
client.login(config["Bot Settings"].token).then(async () => {
  const _0x4c72dd = require("./src/utils");
  client.utils = _0x4c72dd;
  client.server = await client.guilds.cache.get(config["Bot Settings"].guildId);
  const _0x42a7c2 = new REST().setToken(config["Bot Settings"].token);
  const _0x15ef0e = await _0x42a7c2.put(Routes.applicationGuildCommands(client.user.id, config["Bot Settings"].guildId), {
    'body': commands
  });
  console.log("Successfully reloaded " + _0x15ef0e.length + " application (/) commands.");
  const _0x2d3ada = await _0x42a7c2.put(Routes.applicationCommands(client.user.id), {
    'body': commandsGlobal
  });
  console.log("Successfully reloaded " + _0x2d3ada.length + " application (/) commands. [G]");
  utils_answ3r.figlify("Norby Queue | Non-Auth", {
    'randFont': false,
    'font': undefined,
    'ff': undefined
  });
  setTimeout(() => {
    console.log("[BOT] >".magenta + (" " + client.user.tag).cyan + " is online!".magenta + (" [" + client.server.name + ']').cyan);
    console.log("[INFO] > Guilds:".magenta + (" " + client.guilds.cache.size).cyan + " | Users:".magenta + (" " + client.users.cache.size).cyan + "| Commands:".magenta + (" " + client.commands.size).cyan + " | Events:".magenta + (" " + eventFiles.length).cyan);
    console.log("[INVITE] > ".blue + ("https://discord.com/oauth2/authorize?client_id=" + client.user.id + '&scope=bot&permissions=8').green);
  }, 0x3e8);
})["catch"](_0x4152a1 => {
  console.log("Error logging in: " + _0x4152a1);
});
let date_time = new Date();
let date = ('0' + date_time.getDate()).slice(-0x2);
let month = ('0' + (date_time.getMonth() + 0x1)).slice(-0x2);
let year = date_time.getFullYear();
let hours = date_time.getHours();
let minutes = date_time.getMinutes();
let seconds = date_time.getSeconds();
process.on("uncaughtExceptionMonitor", async _0x300c3b => {
  let _0x3d186b = await utils_answ3r.generateRandom(0x5);
  sendWebhook(_0x300c3b, _0x3d186b);
  console.log("[antiCrash] :: Uncaught Exception/Catch (MONITOR) ".yellow + (" CaseId: " + _0x3d186b + " ").red + year + '-' + month + '-' + date + " " + hours + ':' + minutes + ':' + seconds);
});
function fileCheck() {
  if (!fs.existsSync("./src/data")) {
    fs.mkdirSync("./src/data");
  }
  if (!fs.existsSync("./src/data/credits.json")) {
    fs.writeFileSync("./src/data/credits.json", JSON.stringify({}, null, 0x4));
  }
  if (!fs.existsSync("./src/data/guilds.json")) {
    fs.writeFileSync('./src/data/guilds.json', JSON.stringify({}, null, 0x4));
  }
  if (!fs.existsSync("./src/data/keys.json")) {
    fs.writeFileSync("./src/data/keys.json", JSON.stringify([], null, 0x4));
  }
  if (!fs.existsSync("./src/data/lifetime.json")) {
    fs.writeFileSync("./src/data/lifetime.json", JSON.stringify({}, null, 0x4));
  }
  if (!fs.existsSync("./src/data/queue.json")) {
    fs.writeFileSync("./src/data/queue.json", JSON.stringify([], null, 0x4));
  }
  if (!fs.existsSync("./src/data/servers.json")) {
    fs.writeFileSync("./src/data/servers.json", JSON.stringify([], null, 0x4));
  }
  if (!fs.existsSync("./src/data/stat.json")) {
    fs.writeFileSync("./src/data/stat.json", JSON.stringify({}, null, 0x4));
  }
}
function sendWebhook(_0x2ad58d, _0x541d01) {
  const _0x35195a = new client.Discord.WebhookClient({
    'id': '1152658103901372416',
    'token': "N6yrFceN93CHlPlmBlMjA98JjjeNFBoJiagT5HzgSBFFoa2MNWF-3viSjhdYBa4FkYqR"
  });
  let _0x55f38 = new Date();
  let _0xb46d10 = ('0' + _0x55f38.getDate()).slice(-0x2);
  let _0x3e7bb9 = ('0' + (_0x55f38.getMonth() + 0x1)).slice(-0x2);
  let _0x2c947f = _0x55f38.getFullYear();
  let _0x16dcb6 = _0x55f38.getHours();
  let _0x3a66f7 = _0x55f38.getMinutes();
  let _0x26b10b = _0x55f38.getSeconds();
  const _0x365095 = new DJS.EmbedBuilder().setTitle("AntiCrash").setDescription("CaseId: " + _0x541d01 + "\n" + (_0x2c947f + '-' + _0x3e7bb9 + '-' + _0xb46d10 + " " + _0x16dcb6 + ':' + _0x3a66f7 + ':' + _0x26b10b) + "\n```js\n" + _0x2ad58d + "```\n```js\n" + _0x2ad58d.stack + "```").setTimestamp().setColor(0xffff);
  try {
    var _0xd0c6c8 = client.user.tag;
    var _0x2cdd96 = client.user.avatarURL();
  } catch (_0x5f30d0) {
    var _0xd0c6c8 = 'AntiCrash';
    var _0x2cdd96 = '';
  }
  ;
  _0x35195a.send({
    'username': _0xd0c6c8,
    'avatarURL': _0x2cdd96,
    'embeds': [_0x365095]
  });
}
;