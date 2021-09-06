module.exports = {
    name: 'ping',
    description: 'The latency of this bot.',
    execute(client, message, args, Discord){
        message.channel.send(`My ping is ${client.ws.ping}ms.`)
    }
}