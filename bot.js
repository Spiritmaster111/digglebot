const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
	console.log("I am ready!");
	
	dbChannel = client.channels.get("523655389611556874");
	channelList = [];
	channelList[0] = client.channels.get("523653674350804992");
	channelList[1] = client.channels.get("523653688343003136");
	channelList[2] = client.channels.get("523653701727158292");
	channelList[3] = client.channels.get("523653712577560581");
	channelList[4] = client.channels.get("523653724183199762");
	channelList[5] = client.channels.get("523653733922373642");
	channelList[6] = client.channels.get("523653744412590083");
	channelList[7] = client.channels.get("523653757754408973");
	channelList[8] = client.channels.get("523653770505224202");
	channelList[9] = client.channels.get("523653781875982347");
	channelList[10] = client.channels.get("523653794572271657");
	channelList[11] = client.channels.get("523653805829652490");
	channelList[12] = client.channels.get("523653819041841164");
	channelList[13] = client.channels.get("523653835974115349");
	channelList[14] = client.channels.get("523653852927361061");
	
	dbChannel.fetchMessages().then(messages => {
		dataMsgList = messages.array();
		dataList = [];
		for (var i = 0; i < dataMsgList.length; i++) {
			dataList[i] = JSON.parse(dataMsgList[i]);
		}
		
		/*var listMsgs = messages.array();
		list = new Array(data.num);
		for (var i = data.num - 1; i >= 0; i--) {
			var toParse = listMsgs[i];
			list[data.num-1-i] = JSON.parse(toParse);
		}*/
	});
	
	listList = [];
	for (var i = 0; i < channelList.length; i++) {
		channelList[i].fetchMessages().then(messages => {
			listList[i] = messages.array();
		});
	}
	
	client.user.setPresence({game: {name: "without consumables", type: 0}});
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
			if (args.length < 1) {
				message.channel.send("Needs more level!");
			} else {
				if (!dataList[args[0]][message.author.id]) dataList[args[0]][message.author.id] = {"Used":0,"Score":0};
				
				/*if (dataList[args[0]][message.author.id].used >= data.len) {
					message.channel.send("Sorry, no addresses left!");
				} else { */
				
				var stringList = "Your list of " + (listList[args[0]].length - dataList[args[0]][message.author.id].used) + " unused addresses:";
				for (var i = listList[args[0]].length-1-data[message.author.id].used; i >= 0; i--) {
					stringList = stringList + "\n" + listList[args[0]][i];
				}
				message.channel.send(stringList);
				
				//}
			}
		/*} else if (command === 'score') {
			var subject = message.mentions.users.first();
			if (!subject) subject = message.author;
			if (!data[subject.id]) data[subject.id] = {"Used":0,"Score":0};
			const score = data[subject.id].score;
			message.channel.send(subject.toString() + " has added a grand total of " + score + " addresses to the list!");*/
		} else if (command === 'add') {
			for (var i = 1; i < args.length; i++) {
				listList[args[0]].unshift(args[i]);
				channelList[args[0]].send(args[i]);
				listList[args[0]].pop();
				for (var i in dataList[args[0]]) {
					if (dataList[args[0]][i].used > 0) dataList[args[0]][i].used--;
				}
				//dataList[args[0]][message.author.id].score++;
			}
			dataMsgList[args[0]].edit(JSON.stringify(dataList[args[0]]));
			if (args.length > 2) {
				message.channel.send("Gotcha, added em to the list!");
			} else {
				message.channel.send("Gotcha, added it to the list!");
			}
		} else if (command === 'use') {
			if (!dataList[args[0]][message.author.id]) dataList[args[0]][message.author.id] = {"Used":0,"Score":0};
			if (dataList[args[0]][message.author.id].used >= listList[args[0]].length) {
				message.channel.send("Sorry, no addresses left!");
			} else {
				message.channel.send("\"" + listList[args[0]][listList[args[0]].length-dataList[args[0]][message.author.id].used-1] + "\" is all yours!");
				dataList[args[0]][message.author.id].used++;
				dataMsgList[args[0]].edit(JSON.stringify(dataList[args[0]]));
			}
		} else if (command === 'dump') {
			dataMsgList[args[0]].edit(JSON.stringify(dataList[args[0]]));
		/*} else if (command === 'echo') {
			var msgID = client.channels.get("398995797753987085").fetchPinnedMessages().then(messages => {
				const fetchedMsg = messages.first();
				message.channel.send(fetchedMsg.content);
			});*/
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
		/*} else if (command === 'test') {
			for (var i = 0; i < list.length; i++) {
				message.channel.send(list[i].content);
			}*/
		/*} else if (command === 'delistify') {
			const delistifyMe = args[0];
			const delistified = delistifyMe.split("\n");
			for (var i = 0; i < delistified.length; i++) {
				dbChannel.send(delistified[i]);
			}*/
		}
	}
});

client.login(process.env.BOT_TOKEN);
