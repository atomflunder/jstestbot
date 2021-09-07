const fuzzysort = require('fuzzysort')
module.exports = {
    name: 'listrole',
    aliases: ['listroles', 'listr', 'lrole'],
    description: 'Gets you the list of people with a certain role. Searches for closest matching role or uses ID.',
    async execute(client, message, args, Discord){
        //gets the role

        const role = args.slice(0).join(' ');

        if(!role){
            message.channel.send("Please enter a role.")
            return;
        }

        //removing the junk of a role mention
        var role_id = role.replace(/[<, @, &, >]+/g, "");

        //trying to get the role straight up if the role is a role id
        new_role = await message.guild.roles.fetch(`${role_id}`);

        //if its not a role id, it searches for a close match
        if(!new_role){
            var list = [];
            var all_roles = await message.guild.roles.fetch();
            all_roles.forEach(function(r) { list.push(r.name); });

            //searches that list with the given raw input, before the role_id thing replaced some chars
            search_role = fuzzysort.go(`${role}`, list);

            new_role = message.guild.roles.cache.find(role => role.name === `${search_role[0].target}`);

        }


        var member_list = [];

        //appends every user tag in the collection to the list above
        new_role.members.forEach(m => {member_list.push(m.user.tag)});

        //sends out a nice message with the name, amount of members and members in general. limited to 60 members to not flood the channel.
        if(member_list.length > 60){
            message.channel.send(`Users with ${new_role.name} Role (${member_list.length}):\nToo many users to list!`)
        }else{
            message.channel.send(`Users with ${new_role.name} Role (${member_list.length}):\n${member_list.join(', ')}`);
        }

    }
}