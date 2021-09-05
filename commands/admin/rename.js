module.exports = {
    name: 'rename',
    aliases: ['name'],
    description: 'Changes the nickname of the given user to your input.',
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
        //can fetch the member object since for a kick you need to be on the server
        let member = await message.guild.members.fetch(user_id).catch(() => null);

        //generic error if the member does not exist
        if(!user || !member){
            message.channel.send("Could not find this user.");
            return;
        }

        //getting the new input nickname
        const new_name = args.slice(1).join(' ');

        //generic error for a missing nickname
        if(!new_name){
            message.channel.send("Please enter a new name for the given user.")
            return;
        }

        //setting the new name and sending confirmation message
        member.setNickname(new_name);
        await message.channel.send(`I changed the display name of ${member.user.tag} to ${new_name}.`)

    }
}