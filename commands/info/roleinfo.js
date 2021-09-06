const fuzzysort = require('fuzzysort')
module.exports = {
    name: 'roleinfo',
    aliases: ['role', 'rinfo'],
    description: 'Gets you an embed with information about a certain role. Searches for closest matching role or uses ID.',
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

        //cool looking embed with neat info
        const role_embed = new Discord.MessageEmbed()
            //colour will always be the role colour
            .setColor(new_role.color)
            .setTitle(`Roleinfo of ${new_role.name}`)
            .addFields(
                //this field mentions the role, wont ping in an embed
                {name: "Role Name:", value:`<@&${new_role.id}>`, inline: true},
                //need to convert the collection to an array to get the total length
                {name: "Users with role:", value:`${Array.from(new_role.members).length}`, inline: true},
                //need to divide that timestamp by 1000 for whatever reason to display the timestamp correctly?
                {name: "Created at:", value:`<t:${Math.floor(new_role.createdTimestamp / 1000)}:F>`, inline:true},
                {name: "Mentionable:", value:`${new_role.mentionable}`, inline:true},
                {name: "Displayed Separately:", value:`${new_role.hoist}`, inline:true},
                //hex colour is what the discord settings use
                {name: "Colour:", value: `${new_role.hexColor}`, inline:true},
            );
        
        message.channel.send({embeds: [role_embed]});


    }
}