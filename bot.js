const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
	console.log("I am ready!");
	
	mainChannel = client.channels.get("398995797753987085");
	dbChannel = client.channels.get("399633585193353236");
	
	mainChannel.fetchPinnedMessages().then(messages => {
		dataMsg = messages.last();
		data = JSON.parse(dataMsg);
		
		/*var listMsgs = messages.array();
		list = new Array(data.num);
		for (var i = data.num - 1; i >= 0; i--) {
			var toParse = listMsgs[i];
			list[data.num-1-i] = JSON.parse(toParse);
		}*/
	});
	
	dbChannel.fetchMessages().then(messages => {
		list = messages.array();
	});
	
	client.user.setPresence({game: {name: "Dungeons of Dankmor", type: 0}});
	client.user.setStatus("online");
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
			if (!data[message.author.id]) data[message.author.id] = 0;
			if (data[message.author.id] >= data.len) {
				message.channel.send("Sorry, no addresses left!");
			} else { 
				var stringList = "Your list of " + (list.length - data[message.author.id]) + " unused addresses:";
				for (var i = list.length-1-data[message.author.id]; i >= 0; i--) {
					stringList = stringList + "\n" + list[i];
				}
				message.channel.send(stringList);
			}
		} else if (command === 'left') {
			var subject = message.mentions.users.first();
			if (!subject) subject = message.author;
			if (!data[subject.id]) data[subject.id] = 0;
			const left = list.length - data[subject.id];
			message.channel.send(subject.toString() + " has " + left + " unused addresses left!");
		} else if (command === 'add') {
			for (var i = 0; i < args.length; i++) {
				list.unshift(args[i]);
				dbChannel.send(args[i]);
				list.pop();
				for (var i in data) {
					if (data[i] > 0) data[i]--;
				}
			}
			dataMsg.edit(JSON.stringify(data));
			if (args.length > 1) {
				message.channel.send("Gotcha, added em to the list!");
			} else {
				message.channel.send("Gotcha, added it to the list!");
			}
		} else if (command === 'use') {
			if (!data[message.author.id]) data[message.author.id] = 0;
			if (data[message.author.id] >= list.length) {
				message.channel.send("Sorry, no addresses left!");
			} else {
				message.channel.send("\"" + list[list.length-data[message.author.id]-1] + "\" is all yours!");
				data[message.author.id]++;
				dataMsg.edit(JSON.stringify(data));
			}
		} else if (command === 'dump') {
			dataMsg.edit(JSON.stringify(data));
		/*} else if (command === 'echo') {
			var msgID = client.channels.get("398995797753987085").fetchPinnedMessages().then(messages => {
				const fetchedMsg = messages.first();
				message.channel.send(fetchedMsg.content);
			});*/
		} else if (command === 'parrot') {
			const msg = message.content.slice(8);
			message.channel.send(msg);
		/*} else if (command === 'test') {
			for (var i = 0; i < list.length; i++) {
				message.channel.send(list[i].content);
			}*/
		} else if (command === 'delistify') {
			const delistifyMe = args[0];
			const delistified = delistifyMe.split("\n");
			for (var i = 0; i < delistified.length; i++) {
				dbChannel.send(delistified[i]);
			}
		}
	}
});

client.login(process.env.BOT_TOKEN);
