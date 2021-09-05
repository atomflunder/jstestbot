module.exports = (Discord, client, message) =>{
    //basic log to the console that the bot logged in
    console.log(`Ready! Connected as jstestbot#6691.`);

    //cycling statuses
    const statuses = [
        "Cycling statuses",
        "Are pretty cool",
        "Just testing them out",
        "What is love?",
    ];

    //the first status that comes up after logging in
    client.user.setActivity(statuses[0], {type:"PLAYING"})

    //after that it cycles, starts with the "second" status cause the first was already set above
    var current = 1;

    setInterval(() =>{
        if(statuses[current]){
            client.user.setActivity(statuses[current], {type:"PLAYING"})
            current++;
        } else {
            //if it reaches the end it cycles back around
            current = 0;
            client.user.setActivity(statuses[current], {type:"PLAYING"})
        }
    //every 300s, 5mins it gets changed. dont want to flood the discord api too much
    }, 300*1000)
}