module.exports = {
    name: 'coin',
    aliases: ['coinflip', 'flip'],
    description: 'Flips a coin and tells you the result.',
    execute(client, message, args, Discord){
        //defines the outcomes
        const coin = ['Heads', 'Tails'];

        //gets a random outcome between 0 and 1
        var number = Math.floor(Math.random() * 2);

        //sends back that outcome
        message.channel.send(`Coin flip: ${coin[number]}!`)

    }
}