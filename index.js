const Client = require('keybase-bot')
require('dotenv').config()
const readable = require("readable-url");
var generator = new readable();

async function main() {
    const bot = new Client();

    try {
        // init
        const username = process.env.KB_USERNAME
        const paperkey = process.env.KB_PAPERKEY
        await bot.init(username, paperkey)
        console.log(`Your bot is initialized. It is logged in as ${bot.myInfo().username}`)

        await bot.chat.clearCommands()
        await bot.chat.advertiseCommands({
            advertisements: [
                {
                    type: 'public',
                    commands: [
                        {
                            name: 'jitsi meet',
                            description: 'Generates a random URL for a Jitsi meeting.'
                            // usage: ''
                        },
                        {
                            name: 'ping',
                            description: 'Returns the current latency between the bot and the server (returns pong for now because API doesn\'t have a ping property)'
                        }
                    ],
                },
            ],
        })

        const onMessage = async msg => {
            var url = generator.generate();

            if (msg.content.text.body == "!jitsimeet" || msg.content.text.body == "!jitsimeet ") {
                bot.chat.send(msg.conversationId, {
                    body: "https://meet.jit.si/" + url
                })
            }

            if (msg.content.text.body === "!ping" || msg.content.text.body === "!ping " ) {
                bot.chat.send(msg.conversationId, {
                    body: ":table_tennis_paddle_and_ball: Pong"
                })
            }
        }

        const onError = e => console.error(e)
        console.log(`Listening for messages...`)
        await bot.chat.watchAllChannelsForNewMessages(onMessage, onError)


    } catch (err) {
        console.error(err)
    } finally {
        await bot.deinit()
    }
}

main()