const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
	console.log("I am ready!");
	
	dbChannel = client.channels.get("523655389611556874");
	logChannel = client.channels.get("524499350647341086");
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
	
	client.user.setPresence({game: {name: "semi-functional :|", type: 0}});
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
		logChannel.send(message.author.toString() + ": " + message.content.slice(1));
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
		} else if (command === 'add') {
			var lvl = parseInt(args[0]) - 1;
			var address = args[1];
			var tarChannel = client.channels.get(channelIDs[lvl]);
			tarChannel.send(address);
			message.channel.send("Gotcha, added it to the list!");
		} else if (command === 'unadd') {
			var lvl = parseInt(args[0]) - 1;
			var tarChannel = client.channels.get(channelIDs[lvl]);
			tarChannel.fetchPinnedMessages().then(messages => {
				tarMsg = messages.last();
				logChannel.send("Deleted address ${tarMsg} from level " + (args[0]-1));
				tarMsg.delete();
			});
		/*} else if (command === 'list') {
			if (args.length < 1) {
				message.channel.send("Needs more level!");
			} else {
				var lvl = parseInt(args[0]) - 1;
				var data = JSON.parse(dataList[lvl]);
				var tarChannel = client.channels.get(channelIDs[lvl]);
				if (!data[message.author.id]) data[message.author.id] = {"Used":0,"Score":0};
				var used = data[message.author.id].used;
				
			}*/
		}
	}
});

client.login(process.env.BOT_TOKEN);
