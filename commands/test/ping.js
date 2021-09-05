module.exports = {
    name: 'ping',
    description: 'Basic ping command. For testing purposes',
    execute(client, message, args, Discord){

        message.channel.send(`Pong!`);
    }
}