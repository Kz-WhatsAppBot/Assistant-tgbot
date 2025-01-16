const fs = require('fs')
const path = require('path')

let bot

const loadBot = () => {
    if (!bot) {
        bot = require('../index.js')
    }
    return bot
}

const loadPlugins = () => {
    const plugins = []
    const files = fs.readdirSync(path.join(__dirname))
    files.forEach(file => {
        if (file.endsWith('.js') && file !== 'menu.js') {
            const plugin = require(`./${file}`)
            plugins.push(plugin)
        }
    })
    return plugins
}

const loadCases = () => {
    const indexPath = path.join(__dirname, '../index.js')
    const indexContent = fs.readFileSync(indexPath, 'utf-8')
    const caseRegex = /case\s+['"]([^'"]+)['"]:/g
    const cases = []
    let match
    while ((match = caseRegex.exec(indexContent)) !== null) {
        cases.push(match[1])
    }
    return cases
}

module.exports = {
    command: 'menu',
    helps: 'Menampilkan daftar semua perintah yang tersedia.',
    alias: [],
    tags: ['menu'],
    isOwner: false,
    isGroup: false,
    isPrivate: false,
    handler: (chatId) => {
        const plugins = loadPlugins()
        const cases = loadCases()
        let captionnye = '=== Menu Plugins ===\n\n'
        
        plugins.forEach((plugin, index) => {
            const allTags = plugin.tags.length > 0 ? `Tags: ${plugin.tags.join(', ')}` : 'Tags: -'
            const allAlias = plugin.alias.length > 0 ? `Alias: ${plugin.alias.join(', ')}` : 'Alias: -'
            
            captionnye += `${index + 1}. /${plugin.command}\n`
            captionnye += `   - ${allTags}\n`
            captionnye += `   - ${allAlias}\n`
            captionnye += `   - Deskripsi: ${plugin.helps || '-'}\n\n`
        })
        
        captionnye += '=== Menu Case ===\n'
        cases.forEach(caseName => {
            captionnye += `- /${caseName}\n`
        })
        
        captionnye += '\nSilakan pilih perintah yang sesuai atau tinggal klik saja command yang tersedia seperti /start.'
        
        loadBot().sendMessage(chatId, captionnye)
    },
}