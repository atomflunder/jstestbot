const fs = require('fs');

module.exports = (client, Discord) =>{
    const command_files = (subfolder) =>{
        const command_files = fs.readdirSync(`./commands/${subfolder}`).filter(file => file.endsWith('.js'));

        for(const file of command_files){
            const command = require(`../commands/${subfolder}/${file}`);
            if(command.name){
                client.commands.set(command.name, command);
            } else{
                continue;
            }
        }
    }
    ['usercommands', 'admin'].forEach(e => command_files(e))
}