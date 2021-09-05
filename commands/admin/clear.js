module.exports = {
    name: 'clear',
    description: 'Clears the last X messages.',
    execute(client, message, args, Discord){
        //checks your permissions, admin only command
        if(!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)){
            message.channel.send("You do not have the required access to this command!");
            return;
        }
        //converts the input to an int
        amount = parseInt(args[0]);

        //if the input is not valid, this kicks in
        if(isNaN(amount) || amount < 1){
            message.channel.send("Please specify a valid number");
            return;
        }

        //else the command proceeds as following
        message.channel.bulkDelete(amount + 1)
            .then(messages => console.log(`Deleted ${messages.size} messages.`))
            .catch(console.error);
        
    }
}