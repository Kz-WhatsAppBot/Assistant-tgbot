let bot

const loadBot = () => {
    if (!bot) {
        bot = require('../index.js')
    }
    return bot
}

module.exports = {
    command: 'ass',
    helps: 'Random image nsfw.',
    alias: [],
    tags: ['nsfw'],
    isOwner: false,
    isGroup: false,
    isPrivate: false,
    handler: async (chatId) => {
        let response = await fetch('https://api.waifu.im/search/?included_tags=ass')
        let data = await response.json()
        loadBot().sendPhoto(chatId, data.images[0].url)
    },
}