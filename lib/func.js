const fs = require('fs')
const path = require('path')

function structureFile(dirPath, prefix = '') {
    let result = ''
    const files = fs.readdirSync(dirPath)
    files.forEach((file, index) => {
        const fullPath = path.join(dirPath, file)
        const stats = fs.statSync(fullPath)
        const isLast = index === files.length - 1
        const connector = isLast ? '└── ' : '├── '
        const newPrefix = isLast ? `${prefix}    ` : `${prefix}│   `
        if (stats.isDirectory()) {
            result += `${prefix}${connector}📂 ${file}\n`
            result += structureFile(fullPath, newPrefix)
        } else {
            result += `${prefix}${connector}📄 ${file}\n`
        }
    })
    return result
}


module.exports = { structureFile }