const fuzzysort = require('fuzzysort')
module.exports = {
    name: 'removerole',
    description: 'Removes a role from a user. Searches for the closest matching role or uses ID. Mention the user first, then the role.',
    async execute(client, message, args, Discord){
        //checks your permissions, admin only command
        if(!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)){
            message.channel.send("You do not have the required access to this command!");
            return;
        }

        var user = args[0];

        //fetch the user with the user id
        var user_id = user.replace(/[<, @, !, >]+/g, "")

        //confirm the user exists
        //can fetch the member object since for a kick you need to be on the server
        let member = await message.guild.members.fetch(user_id).catch(() => null);

        if(!user || !member){
            message.channel.send("Could not find this user.");
            return;
        }


        //getting the role and checking if it is valid
        const role = args.slice(1).join(' ');

        if(!role){
            message.channel.send("Please enter a role you want to add to the user.")
            return;
        }


        //removing the junk of a role mention
        var role_id = role.replace(/[<, @, &, >]+/g, "");

        //trying to get the role straight up if the role is a role id
        try_role = await message.guild.roles.fetch(`${role_id}`);
        if(try_role){
            //adds the role and sends a confirmation message
            member.roles.remove(`${try_role.id}`);
            message.channel.send(`<@!${member.id}> no longer has the ${try_role.name} role.`);
        }
        //if the role is not a role id, it searches all of the guild roles for a match
        else{
            //makes a list of all the roles in a guild
            var list = [];
            var all_roles = await message.guild.roles.fetch();
            all_roles.forEach(function(r) { list.push(r.name); });
    
            //searches that list with the given raw input, before the role_id thing replaced some chars
            new_role = fuzzysort.go(`${role}`, list);
    
            //finds the according output of fuzzysort, adds the role and sends a confirmation message
            let final_role = message.guild.roles.cache.find(role => role.name === `${new_role[0].target}`);
            member.roles.remove(`${final_role.id}`);
            message.channel.send(`<@!${member.id}> no longer has the ${final_role.name} role.`);
        }
    }
}