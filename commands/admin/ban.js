module.exports = {
    name: 'ban',
    description: 'Bans the mentioned user and logs the reason.',
    async execute(client, message, args, Discord){
        //checks your permissions, admin only command
        if(!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)){
            message.channel.send("You do not have the required access to this command!");
            return;
        }

        var user = args[0];

        //fetch the user with the user id
        var user_id = user.replace(/[<, @, !, >]+/g, "");

        //confirm the user exists
        let confirmation_user = await client.users.fetch(user_id).catch(() => null);

        //error handling for when the user is not specified or it does not exist
        if(!user || !confirmation_user){
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
        message.channel.send(`<@!${user_id}> has been banned.`)

        //finally bans them
        message.guild.members.ban(user_id, {reason: reason}).catch(() => null);
        
    }
}