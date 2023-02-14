const { Telegraf } = require('telegraf')
const fs = require('fs')
const admin = 'id'
const bot = new Telegraf('6203577637:')

bot.start(async (ctx) => {
    ctx.reply(`*GET OWN ID: *send me any message\n*GET CHANNEL ID:* forward me any message from channel\n*GET ANOTHER PERSON ID:* forward me any message from another person\n*GET GROUP ID: *add the bot to the group and send /getgroupid command
`, { parse_mode: 'MarkdownV2' })


    fs.readFile(`./users.txt`, 'utf8', (err, data) => {
        if (!(data.indexOf(ctx.chat.id) + 1) || data.length == 0) {
            fs.writeFile('./users.txt', `${data}\n${ctx.chat.id}`, () => { });
        }
    });
})
bot.command('/getgroupid', ctx => {
    if (ctx.message.chat.type == 'group') {
        ctx.reply(`GROUP ID: ${ctx.message.chat.id}`)
    } else {
        ctx.reply(`this command only works in a group add the bot to the group then send the command there`)
    }
})
bot.on('text', (ctx) => {
    if (ctx.message.text == '/users') {
        if (ctx.chat.id == admin) {
            fs.readFile(`./users.txt`, 'utf8', (err, data) => {
                bot.telegram.sendMessage(ctx.chat.id, `Foydalanuvchilar soni ${data.split('\n').length} ta`)
            });
            return
        }
    }

    if (ctx.message.chat.type == 'group' && ctx.message.text == '') {
        ctx.reply(ctx.message.chat)
    }
    if (ctx.message.forward_from_chat) {
        // if (ctx.message.forward_from_chat)
        bot.telegram.sendMessage(ctx.from.id, ctx.message.forward_from_chat.type + " ID: `" + ctx.message.forward_from_chat.id + "`", { parse_mode: 'MarkdownV2' })
        return
    }
    if (ctx.message.forward_from) {
        // if (ctx.message.forward_from_chat)
        bot.telegram.sendMessage(ctx.from.id, "USER ID: `" + ctx.message.forward_from.id + "`\n\n" + `USER secret link: [${ctx.message.forward_from.first_name}](tg://user?id=${ctx.message.forward_from.id})`, { parse_mode: 'MarkdownV2' })
        return
    }
    ctx.reply("YOUR ID: `" + ctx.from.id + "`", { parse_mode: 'MarkdownV2' })
})

bot.launch()