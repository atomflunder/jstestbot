module.exports = {
    name: 'dice',
    aliases: ['d', 'roll', 'rolldice', 'rol', 'r'],
    description: 'Rolls a NdN dice and tells you the result.',
    execute(client, message, args, Discord){
        //gets the dice first
        var dice = args[0];

        if(!dice){
            message.channel.send("Please input a dice in the NdN format.")
            return;
        }

        //getting the amount and sides of the input and then verifying them
        const amount = dice.split('d')[0];
        const sides = dice.split('d')[1];

        if(!amount || !sides){
            message.channel.send("Please input a dice in the NdN format.")
            return;
        }

        //making sure there are no ridiculous values being put in
        if(amount > 100 || amount < 1){
            message.channel.send("Please input a valid number for the amount of dice.")
            return;
        }

        if(sides > 10000 || sides < 1){
            message.channel.send("Please inpit a valid number for the sides of the dice.")
            return;
        }

        //list for appending the results
        var results = []

        //rolling the dice X times and appending the result
        for(x=0; x<amount; x++){;
            results.push(1 + Math.floor(Math.random()*sides));
        }
        
        //adding up all results
        var sum = results.reduce((a, b) => a + b, 0)

        //sending the message with everything in it
        message.channel.send(`Rolling a ${sides} sided dice ${amount} time(s):\n${results.join(', ')}\n**Sum: ${sum}**`)

    }
}