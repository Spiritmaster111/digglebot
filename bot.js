const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

const channelId = "398995797753987085";
const fs = require("fs");
let list = JSON.parse(fs.readFileSync("./list.json", "utf8"));

const prefix = "!";
client.on("message", (message) => {
	// Exit and stop if it's not there
	if (!message.content.startsWith(prefix)) return;
	else {
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();
		console.log("Got command: " + command);
		if (command === 'ping') {
			message.channel.send("Pong!\nHow are you?");
		} else if (command === 'foo') {
			message.channel.send("Bar!\nWho goes tharr?");
		} else if (command === 'list') {
			if (!list[message.author.id]) list[message.author.id] = {used: 0};
			if (list[message.author.id].used >= list.len) {
				message.channel.send("Sorry, no addresses left!");
				return;
			} else {
				var stringList = list.addresses[list[message.author.id].used];
				for (var i = list[message.author.id].used + 1; i < list.len; i++) {
					stringList = stringList + "\n" + list.addresses[i];
				}
				message.channel.send(stringList);
			}
		} else if (command === 'add') {
			for (var i = 0; i < args.length; i++) {
				list.addresses[list.len] = args[i];
				list.len++;
			}
			fs.writeFile("./list.json", JSON.stringify(list), (err) => {
				if (err) console.error(err)
			});
		message.channel.send("Gotcha, added em to the list!")
		} else if (command === 'use') {
			if (!list[message.author.id]) list[message.author.id] = {used: 0};
			if (list[message.author.id].used >= list.len) {
				message.channel.send("Sorry, no addresses left!");
				return;
			}
			message.channel.send("\"" + list.addresses[list[message.author.id].used] + "\" is all yours!");
			list[message.author.id].used++;
			fs.writeFile("./list.json", JSON.stringify(list), (err) => {
				if (err) console.error(err)
			});
		} else if (command === 'dump') {
			client.channels.get(channelId).send(JSON.stringify(list));
		}
	}
});

client.login(process.env.BOT_TOKEN);
