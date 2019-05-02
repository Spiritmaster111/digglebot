const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
	console.log("I am ready!");
	
	dbChannel = client.channels.get("523655389611556874");
	logChannel = client.channels.get("524499350647341086");
	archivesChannel = client.channels.get("573509532756738065");
	editsChannel = client.channels.get("573515097230540810");
	presenceChannel = client.channels.get("573509727313461254");
	dbChannel.fetchMessages().then(messages => {
		dataList = messages.array();
	});
	
	channelIDs = [];
	channelIDs[0] = "523653674350804992";
	channelIDs[1] = "523653688343003136";
	channelIDs[2] = "523653701727158292";
	channelIDs[3] = "523653712577560581";
	channelIDs[4] = "523653724183199762";
	channelIDs[5] = "523653733922373642";
	channelIDs[6] = "523653744412590083";
	channelIDs[7] = "523653757754408973";
	channelIDs[8] = "523653770505224202";
	channelIDs[9] = "523653781875982347";
	channelIDs[10] = "523653794572271657";
	channelIDs[11] = "523653805829652490";
	channelIDs[12] = "523653819041841164";
	channelIDs[13] = "523653835974115349";
	channelIDs[14] = "523653852927361061";
	
	client.user.setPresence({game: {name: "pretty much alive :) | !help", type: 0}});
	client.user.setStatus("online");
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
	console.log("voiceStateUpdate received");
	let updatedAt = new Date();
	if (oldMember.voiceChannelID != newMember.voiceChannelID) {
		presenceChannel.send(oldMember.guild +" | "+ oldMember.user.tag +" | "+ updatedAt +" | "+ oldMember.voiceChannel.name +" >>> "+ newMember.voiceChannel.name);
	}
	if (oldMember.selfMute != newMember.selfMute) {
		presenceChannel.send(oldMember.guild +" | "+ oldMember.user.tag +" | "+ updatedAt +" | "+ (newMember.selfMute ? "SELF MUTED" : "SELF UNMUTED"));
	}
	if (oldMember.selfDeaf != newMember.selfDeaf) {
		presenceChannel.send(oldMember.guild +" | "+ oldMember.user.tag +" | "+ updatedAt +" | "+ (newMember.selfDeaf ? "SELF DEAFENED" : "SELF UNDEAFENED"));
	}
	if (oldMember.serverMute != newMember.serverMute) {
		presenceChannel.send(oldMember.guild +" | "+ oldMember.user.tag +" | "+ updatedAt +" | "+ (newMember.serverMute ? "SERVER MUTED" : "SERVER UNMUTED"));
	}
	if (oldMember.serverDeaf != newMember.serverDeaf) {
		presenceChannel.send(oldMember.guild +" | "+ oldMember.user.tag +" | "+ updatedAt +" | "+ (newMember.serverDeaf ? "SERVER DEAFENED" : "SERVER UNDEAFENED"));
	}
});

client.on("presenceUpdate", (oldMember, newMember) => {
	let updatedAt = new Date();
	if (oldMember.presence.game != newMember.presence.game) {
		presenceChannel.send(oldMember.user.tag +" | "+ updatedAt +" | "+ oldMember.presence.game +" >>> "+ newMember.presence.game);
	}
	if (oldMember.presence.status != newMember.presence.status) {
		presenceChannel.send(oldMember.user.tag +" | "+ updatedAt +" | "+ oldMember.presence.status +" >>> "+ newMember.presence.status);
	}
});

client.on("messageUpdate", (oldMessage, newMessage) => {
	if (oldMessage.guild.id != "398995797753987083") {
		let editedAt = new Date();
		let logEntry = oldMessage.guild +" | "+ oldMessage.channel +" | "+ oldMessage.author.tag +" | "+ oldMessage.createdAt +" | "+ editedAt +" | "+ oldMessage.content;
		let oldAttachArray = oldMessage.attachments.array();
		oldAttachArray.forEach(function(item, index, array) {
			logEntry += item.url;
		});
		logEntry += " >>> "+ newMessage.content;
		let newAttachArray = oldMessage.attachments.array();
		newAttachArray.forEach(function(item, index, array) {
			logEntry += item.url;
		});
		editsChannel.send(logEntry);
	}
});

client.on("messageDelete", (message) => {
	if (message.guild.id != "398995797753987083") {
		let deletedAt = new Date();
		let logEntry = message.guild +" | "+ message.channel +" | "+ message.author.tag +" | "+ message.createdAt + " | "+ deletedAt +" | "+ message.content;
		let attachArray = message.attachments.array();
		attachArray.forEach(function(item, index, array) {
			logEntry += item.url;
		});
		logEntry += " >>> DELETED";
		editsChanel.send(logEntry);
	}
});

const prefix = "!";
client.on("message", (message) => {
	if (message.guild.id != "398995797753987083") {
		let logEntry = message.guild +" | "+ message.channel +" | "+ message.author.tag +" | "+ message.createdAt +" | "+ message.content;
		let attachArray = message.attachments.array();
		attachArray.forEach(function(item, index, array) {
			logEntry += item.url;
		});
		archivesChannel.send(logEntry);
	}
	// Exit and stop if it's not there
	if (!message.content.startsWith(prefix)) return;
	else {
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();
		console.log("Got command: " + command);
		logChannel.send(message.author.username + ": " + message.content.slice(1));
		if (command === 'ping') {
			message.channel.send("Pong!\nHow are you?");
		} else if (command === 'foo') {
			message.channel.send("Bar!\nWho goes tharr?");
		} else if (command === 'parrot') {
			const msg = message.content.slice(8);
			message.channel.send(msg);
		} else if (command === 'puppet') {
			tarChannel = client.channels.get(args[0]);
			var msg = "";
			for (var i = 1; i < args.length; i++) {
				msg = msg + " " + args[i]
			}
			tarChannel.send(msg);
		} else if (command === 'help') {
			var msgHelp = "`!help`: Slides into your DMs with all available commands, as you may or may not have figured out by now."
			var msgPing = "`!ping`: Pong?"
			var msgFoo = "`!foo`: Fee Fie Foe Foo."
			var msgParrot = "`!parrot message`: Repeats whatever it is you just said. CAW CAW!"
			var msgAdd = "`!add level address`: Stores the given address in the database of addresses originating from given floor."
			var msgUnadd = "`!unadd level`: Removes the most recently added address from given levels database. Used to erase oopsies and typos."
			var msgUse = "`!use level`: Gives you an unused address from given level so you can go to the Wizardlands and probably die."
			var msgUnuse = "`!unuse level`: Reverts all consequences of commiting to a dangerous venture. Just in the database tho, your character's dead won't be reverted."
			message.author.send(msgHelp + "\n" + msgPing + "\n" + msgFoo + "\n" + msgParrot + "\n" + msgAdd + "\n" + msgUnadd + "\n" + msgUse + "\n" + msgUnuse);
		} else if (command === 'add') {
			if (args.length < 2) {
				message.channel.send("Needs more level!");
				return;
			}
			var lvl = parseInt(args[0]) - 1;
			var dataMsg = dataList[lvl];
			var data = JSON.parse(dataMsg);
			data.len++;
			dataMsg.edit(JSON.stringify(data));
			var address = args[1];
			var tarChannel = client.channels.get(channelIDs[lvl]);
			tarChannel.send(address);
			message.channel.send("Gotcha, added it to the list!");
		} else if (command === 'unadd') {
			if (args.length < 1) {
				message.channel.send("Needs more level!");
				return;
			}
			var lvl = parseInt(args[0]) - 1;
			var dataMsg = dataList[lvl];
			var data = JSON.parse(dataMsg);
			data.len--;
			dataMsg.edit(JSON.stringify(data));
			var tarChannel = client.channels.get(channelIDs[lvl]);
			tarChannel.fetchMessages().then(messages => {
				var tarMsg = messages.first();
				logChannel.send("Deleted address " + tarMsg.toString() + " from level " + args[0]);
				message.channel.send("Deleted \"" + tarMsg.toString() + "\" from level " + args[0] + ". Get it right next time :angry:");
				tarMsg.delete();
			});
		} else if (command === 'use') {
			if (args.length < 1) {
				message.channel.send("Needs more level!");
				return;
			}
			var lvl = parseInt(args[0]) - 1;
			var dataMsg = dataList[lvl];
			var data = JSON.parse(dataMsg);
			if (!data[message.author.id]) data[message.author.id] = {"used":0,"lastLen":0};
			var usedMod = Math.max(50, data.len) - Math.max(50, data[message.author.id].lastLen);
			data[message.author.id].lastLen = data.len;
			data[message.author.id].used -= usedMod;
			if (data[message.author.id].used >= Math.min(50, data.len)) {
				message.channel.send("Sorry, no unused addresses left!");
			} else {
				var tarChannel = client.channels.get(channelIDs[lvl]);
				tarChannel.fetchMessages().then(messages => {
					var list = messages.array();
					var address = list[Math.min(50, data.len) - data[message.author.id].used];
					message.channel.send("\"" + address.content + "\" is all yours!");
				});
				data[message.author.id].used++;
			}
			dataMsg.edit(JSON.stringify(data));
		} else if (command === 'unuse') {
			if (args.length < 1) {
				message.channel.send("Needs more level!");
				return;
			}
			var lvl = parseInt(args[0]) - 1;
			var dataMsg = dataList[lvl];
			var data = JSON.parse(dataMsg);
			if (data[message.author.id].used > 0) data[message.author.id].used--;
			dataMsg.edit(JSON.stringify(data));
			message.channel.send("Time has been rewound. Your address usage in level " + args[0] + " is no more.");
		/*} else if (command === 'list') {
			if (args.length < 1) {
				message.channel.send("Needs more level!");
			} else {
				var lvl = parseInt(args[0]) - 1;
				var dataMsg = dataList[lvl];
				var data = JSON.parse(dataMsg);
				if (!data[message.author.id]) data[message.author.id] = {"used":0,"lastLen":0};
				var usedMod = Math.max(50, data.len) - Math.max(50, data[message.author.id].lastLen);
				data[message.author.id].lastLen = data.len;
				data[message.author.id].used -= usedMod;
				var tarChannel = client.channels.get(channelIDs[lvl]);
				tarChannel.fetchMessages().then(messages => {
					var list = messages.array();
					var msg = "Your list of " + Math.min(50, data.len) - data[message.author.id].used + " unused level " + lvl+1 + " addresses:";
					for (var i = Math.min(50, data.len) - data[message.author.id].used; i > 0; i--) {
						msg += "\n" + list[i].content;
					}
				});
				message.channel.send(msg);
			}*/
		}
	}
});

client.login(process.env.BOT_TOKEN);
