module.exports = {
    name: 'ping',
    description: 'The latency of this bot.',
    execute(client, message, args, Discord){
        //just gets the ping
        message.channel.send(`My ping is ${client.ws.ping}ms.`)
    }
}