module.exports = {
    name: 'kick',
    description: 'Kicks the mentioned user and logs the reason.',
    async execute(client, message, args, Discord){
        if(!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)){
            message.channel.send("You do not have the required access to this command!");
            return;
        }

        var user = args[0];

        //fetch the user with the user id
        var user_id = user.replace(/[<, @, !, >]+/g, "");

        //confirm the user exists
        //can fetch the member object since for a kick you need to be on the server
        let member = await message.guild.members.fetch(user_id).catch(() => null);

        if(!user || !member){
            message.channel.send("Could not find this user.");
            return;
        }

        //gets the reason
        const reason = args.slice(1).join(' ');

        //error handling for when the reason is not specified
        if (!reason){
            message.channel.send("Please provide a reason for the ban.");
            return;
        }

        //re-mentions the member in the confirmation message
        message.channel.send(`<@!${member.id}> has been kicked.`)

        //finally kicks them
        message.guild.members.kick(member.id, {reason: reason}).catch(() => null);

    }
}