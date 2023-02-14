const { Telegraf } = require('telegraf')

const bot = new Telegraf('6203577637:AAGlWoXbu8itP8LGeHKpAmwIvFP9SPDugEA')

bot.start(async (ctx) => ctx.reply('hi'))
bot.command('/getgroupid', ctx => {
    if (ctx.message.chat.type == 'group') {
        ctx.reply(`GROUP ID: ${ctx.message.chat.id}`)
    }
})
bot.on('text', (ctx) => {
    console.log(ctx.message.chat);
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