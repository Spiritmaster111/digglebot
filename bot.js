const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
	console.log("I am ready!");
	var msgID = client.channels.get("398995797753987085").fetchPinnedMessages().then(messages => {
		const fetchedMsg = messages.first();
		list = JSON.parse(fetchedMsg);
	});
});

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
			client.channels.get("398995797753987085").send(JSON.stringify(list)).then(msg => {
				msg.pin();
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
			client.channels.get("398995797753987085").send(JSON.stringify(list)).then(msg => {
				msg.pin();
			});
		} else if (command === 'dump') {
			client.channels.get("398995797753987085").send(JSON.stringify(list)).then(msg => {
				msgToBePinned = msg;
			});
			msgToBePinned.pin();
		} else if (command === 'echo') {
			var msgID = client.channels.get("398995797753987085").fetchPinnedMessages().then(messages => {
				const fetchedMsg = messages.first();
				message.channel.send(fetchedMsg.content);
			});
		}
	}
});

client.login(process.env.BOT_TOKEN);
