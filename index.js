const client = require('keybase-bot')
require('dotenv').config()
const readable = require("readable-url");
var generator = new readable();
const bot = new Bot()

async function main() {
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
                    ],
                },
            ],
        })

        const onMessage = async message => {
            var url = generator.generate();

            if (message.content.text.body === "!jitsi meet ") {
                bot.chat.send(message.conversationId, {
                    body: "https://meet.jit.si/" + url
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