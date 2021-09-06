module.exports = {
    name: 'avatar',
    aliases: ['icon', 'ava', 'usericon', 'useravatar'],
    description: 'Gets you the avatar of the mentioned user or yourself.',
    async execute(client, message, args, Discord){
        //gets the user mentioned, if any
        var user = args[0];

        if(!user){
            user_fetched = message.author;
        }else{
            //fetch the user with the user id
            var user_id = user.replace(/[<, @, !, >]+/g, "");

            //confirm the user exists
            var user_fetched = await client.users.fetch(user_id).catch(() => null);
        }

        message.channel.send(user_fetched.displayAvatarURL({dynamic: true}));

    }
}