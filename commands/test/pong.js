module.exports = {
    name: 'pong',
    description: 'Basic pong command. Equivalent of ping',
    execute(client, message, args, Discord){

        message.channel.send("Ping!");
    }
}