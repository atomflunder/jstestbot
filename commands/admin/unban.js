module.exports = {
    name: 'unban',
    description: 'Removes a ban for the mentioned user.',
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

        //re-mentions the member in the confirmation message
        message.channel.send(`<@!${user_id}> has been unbanned.`);

        //finally unbans them
        message.guild.bans.remove(user_id).catch(() => null);

    }
}