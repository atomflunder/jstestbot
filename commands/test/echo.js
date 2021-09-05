module.exports = {
    name: 'echo',
    description: 'Echoes what you\'re saying.',
    execute(client, message, args, Discord){

        message.channel.send(args.join(' '));
    }
}