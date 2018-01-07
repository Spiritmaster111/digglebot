const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
	console.log("I am ready!");
	/*client.channels.get("398995797753987085").fetchPinnedMessages().then(messages => {
		var dataMsg = messages.last();
		data = JSON.parse(dataMsg);
		var listMsgs = messages.array();
		list = new Array(data.num);
		for (var i = data.num - 1; i >= 0; i--) {
			var toParse = listMsgs[i];
			list[data.num-1-i] = JSON.parse(toParse);
		} 
	});*/
	
	list = client.channels.get("399616111261253632").messages.array();
	client.channels.get("399616111261253632").send("This one!");
	console.log("List length is " + list.length);
	client.channels.get("399616111261253632").send(list[0]);
	
	client.user.setPresence({game: {name: "dead. Pls be patient.", type: 0}});
	client.user.setStatus("idle");
});

const prefix = "+";
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
		/*} else if (command === 'list') {
			if (!data[message.author.id]) data[message.author.id] = {used: 0};
			if (data[message.author.id].used >= data.len) {
				message.channel.send("Sorry, no addresses left!");
				return;
			} else {
				var stringList = "Your list contains a total of 
				for (var i = data[message.author.id].used / 50; i < data.num; i++) {
					var stringList = list[i].addresses[data[message.author.id].used % 50];
					for (var i = list[i]
					
					
					
				}
				
			
				var stringList = list.addresses[list[message.author.id].used];
				for (var i = list[message.author.id].used + 1; i < list.len; i++) {
					stringList = stringList + "\n" + list.addresses[i];
				}
				message.channel.send(stringList);
				
			}*/
		} else if (command === 'left') {
			var subject = message.mentions.users.first();
			if (!subject) subject = message.author;
			if (!data[subject.id]) data[subject.id] = {used: 0};
			var left = data.len - data[subject.id].used;
			message.channel.send(subject.toString() + " has " + left + " unused addresses left!");
		} else if (command === 'add') {
			for (var i = 0; i < args.length; i++) {
				list.addresses[list.len] = args[i];
				list.len++;
			}
			fetchedMsg.edit(JSON.stringify(list));
			if (args.length > 1) {
				message.channel.send("Gotcha, added em to the list!");
			} else {
				message.channel.send("Gotcha, added it to the list!");
			}
		} else if (command === 'use') {
			if (!list[message.author.id]) list[message.author.id] = {used: 0};
			if (list[message.author.id].used >= list.len) {
				message.channel.send("Sorry, no addresses left!");
				return;
			}
			message.channel.send("\"" + list.addresses[list[message.author.id].used] + "\" is all yours!");
			list[message.author.id].used++;
			fetchedMsg.edit(JSON.stringify(list));
		} else if (command === 'dump') {
			fetchedMsg.edit(JSON.stringify(list));
		} else if (command === 'echo') {
			var msgID = client.channels.get("398995797753987085").fetchPinnedMessages().then(messages => {
				const fetchedMsg = messages.first();
				message.channel.send(fetchedMsg.content);
			});
		} else if (command === 'parrot') {
			const msg = message.content.slice(8);
			message.channel.send(msg);
		} else if (command === 'test') {
			for (var i = 0; i < list.length; i++) {
				message.channel.send(list[i].content);
			}
		}
	}
});

client.login(process.env.BOT_TOKEN);
